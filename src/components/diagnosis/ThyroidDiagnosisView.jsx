import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, Activity, AlertCircle, CircleCheck,
  TrendingUp, TrendingDown, Download, Share2, Printer, Clock,
  Brain, ChevronRight, BarChart3, FileText, Stethoscope,
  Target as TargetIcon, Shield, Smartphone, Zap, MapPin,
  FlaskConical, Microscope, Scan, Info, History, Upload, X, Loader2, Image as ImageIcon
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import testService from '../../services/testService';
import patientService from '../../services/patientService';
import { BASE_URL } from '../../config';

const ThyroidDiagnosisView = ({ patientId: propPatientId, initialData = null, dashboardMode = false, testId = null }) => {
  const { id: paramPatientId } = useParams();
  const patientId = propPatientId || paramPatientId;
  const navigate = useNavigate();

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [rawTestData, setRawTestData] = useState(null);

  // --- Image Upload State ---
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [expandedImageDetails, setExpandedImageDetails] = useState({});

  // --- FNAC Image Upload State ---
  const [isProcessingFnac, setIsProcessingFnac] = useState(false);
  const [selectedFnacImages, setSelectedFnacImages] = useState([]);

  const toggleImageDetails = (idx) => {
    setExpandedImageDetails(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const processDiagnosisData = (data, history, patientData = null) => {
    const latestTest = data;
    const diag = latestTest.diagnosisResult;
    let extra = null;
    let imagePredictions = [];
    let clinicalExtra = null;

    if (diag?.rawResponse) {
      try {
        extra = JSON.parse(diag.rawResponse);

        // If it's an array, it's definitely ImagePredictions
        if (Array.isArray(extra)) {
          imagePredictions = extra;
        }
        // If it's an object with 'model_confidence' or 'functionalStatus', it's Clinical
        else if (extra && (extra.model_confidence !== undefined || extra.modelConfidence !== undefined || extra.FunctionalStatus)) {
          clinicalExtra = extra;
        }
        // Otherwise, if it has 'filename' or 'classification', it's a single Image Prediction
        else if (extra && typeof extra === 'object') {
          imagePredictions = [extra];
        }
      } catch (e) { }
    }

    const originalImageUrls = (latestTest.imagePath || latestTest.ImagePath)?.split(',').filter(i => i) || [];

    // Ensure imagePredictions map correctly to their original URLs if possible
    imagePredictions = imagePredictions.map((pred, idx) => {
      return {
        ...pred,
        original_url: originalImageUrls[idx] || null
      };
    });

    return {
      testId: latestTest.id,
      patientInfo: {
        id: patientId,
        registrationDate: latestTest.testDate || latestTest.createdAt,
        name: patientData?.fullName || latestTest.patient?.fullName || 'Patient',
        age: patientData?.age ?? latestTest.patient?.age ?? '—',
        gender:
          patientData?.gender === 1 || patientData?.gender === 'Male'
            ? 'Male'
            : (patientData?.gender === 2 || patientData?.gender === 'Female'
              ? 'Female'
              : (latestTest.patient?.gender === 1 ? 'Male' : 'Female'))
      },
      imagePredictions, // New array for multi-image logic
      clinicalAssessment: {
        functionalStatus: diag?.functionalStatus || 'N/A',
        riskLevel: diag?.riskLevel || 'N/A',
        clinicalRecommendation: diag?.clinicalRecommendation || 'N/A',
        nextStep: diag?.nextStep || 'N/A',
        label: diag?.classificationLabel || 'Pending Imaging',
        confidence: clinicalExtra?.model_confidence || clinicalExtra?.modelConfidence || diag?.confidence || 0,
        probabilities: clinicalExtra?.probabilities || null,
        aiRecommendation: clinicalExtra?.ai_recommendation || clinicalExtra?.aiRecommendation || null,
        needsManualReview: clinicalExtra?.needs_manual_review !== undefined ? clinicalExtra?.needs_manual_review : null,
        nextStepDetails: clinicalExtra?.next_step_details || clinicalExtra?.nextStepDetails || null
      },
      labs: {
        tsh: latestTest.tsh || latestTest.TSH,
        t3: latestTest.t3 || latestTest.T3,
        tt4: latestTest.tt4 || latestTest.TT4 || latestTest.tT4,
        fti: latestTest.fti || latestTest.FTI,
        t4u: latestTest.t4u || latestTest.T4U || latestTest.t4U
      },
      fnac: (() => {
        let fnacExtra = null;
        if (diag?.fnacRawResponse) {
          try {
            const parsed = JSON.parse(diag.fnacRawResponse);
            fnacExtra = Array.isArray(parsed) ? parsed[0] : parsed;
          } catch (e) { }
        }
        return {
          category: diag?.bethesdaCategory || null,
          label: diag?.bethesdaLabel || null,
          malignancyRisk: diag?.malignancyRisk || null,
          recommendation: diag?.fnacRecommendation || null,
          confidence: fnacExtra?.classification?.confidence_pct || null,
          needsManualReview: fnacExtra?.classification?.needs_manual_review || false,
          disclaimer: fnacExtra?.medical_disclaimer || null,
          aiRecommendation: fnacExtra?.ai_recommendation || null,
        };
      })(),
      timeline: history ? history.map(t => ({
        date: new Date(t.testDate || t.createdAt).toLocaleDateString(),
        status: t.diagnosisResult?.classificationLabel || t.diagnosisResult?.functionalStatus || 'ASSESSED'
      })) : []
    };
  };

  const fetchDiagnosis = async () => {
    setLoading(true);
    try {
      const [historyRes, patientRes] = await Promise.all([
        testService.getPatientTestHistory(patientId),
        patientService.getPatientById(patientId),
      ]);

      if (historyRes.succeeded && historyRes.data && historyRes.data.length > 0) {
        let testToShow;
        if (testId) {
          testToShow = historyRes.data.find(t => t.id === parseInt(testId));
        }

        if (!testToShow) {
          testToShow = historyRes.data[0];
        }

        setRawTestData(testToShow);
        setDiagnosisResult(processDiagnosisData(testToShow, historyRes.data, patientRes?.data));
      }
    } catch (err) {
      console.error('Failed to load diagnosis', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setDiagnosisResult(processDiagnosisData(initialData, []));
      setLoading(false);
      return;
    }
    fetchDiagnosis();
  }, [patientId, initialData, testId]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    const newFiles = [...selectedImages, ...acceptedFiles];
    setSelectedImages(newFiles);
    setIsValidating(true);

    try {
      const res = await testService.validateImage(acceptedFiles);
      if (res.succeeded && Array.isArray(res.data)) {
        const results = res.data.map((r, i) => ({ fileName: acceptedFiles[i].name, valid: r.is_ultrasound }));
        const allValid = results.every(r => r.valid);
        setValidationResults(prev => {
          const filtered = prev.filter(p => !results.find(nr => nr.fileName === p.fileName));
          return [...filtered, ...results];
        });

        if (allValid) {
          toast.success(`Images verified successfully`);
        } else {
          toast.error('Some images are not valid ultrasounds');
        }
      } else {
        toast.error('Validation process failed: Invalid response');
      }
    } catch (err) {
      toast.error('Validation process failed');
    } finally {
      setIsValidating(false);
    }
  };

  const removeImage = (indexToRemove) => {
    const fileToRemove = selectedImages[indexToRemove];
    setSelectedImages(selectedImages.filter((_, i) => i !== indexToRemove));
    setValidationResults(prev => prev.filter(r => r.fileName !== fileToRemove.name));
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    noClick: selectedImages && selectedImages.length > 0,
  });

  const handleImageSubmit = async () => {
    const validImages = selectedImages.filter(file => {
      const v = validationResults.find(r => r.fileName === file.name);
      return v && v.valid;
    });

    if (validImages.length === 0) {
      toast.error('Please upload at least one valid ultrasound image');
      return;
    }

    setIsProcessingImage(true);

    try {
      // Use testId as session id for subsequent uploads to tie them to the same session
      const imgRes = await testService.processImage(diagnosisResult.testId, validImages, String(diagnosisResult.testId));

      if (imgRes.succeeded) {
        toast.success('AI Image Diagnosis Complete');
        setSelectedImages([]);
        setValidationResults([]);
        fetchDiagnosis();
      } else {
        toast.error(`Error processing images: ${imgRes.message}`);
      }
    } catch (imgErr) {
      toast.error('Connection error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // --- FNAC Handlers ---
  const onFnacDrop = async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const newFiles = [...selectedFnacImages, ...acceptedFiles];
    setSelectedFnacImages(newFiles);
  };

  const removeFnacImage = (indexToRemove) => {
    setSelectedFnacImages(selectedFnacImages.filter((_, i) => i !== indexToRemove));
  };

  const {
    getRootProps: getFnacRootProps,
    getInputProps: getFnacInputProps,
    isDragActive: isFnacDragActive,
    open: openFnac
  } = useDropzone({
    onDrop: onFnacDrop,
    accept: { 'image/*': [] },
    noClick: selectedFnacImages && selectedFnacImages.length > 0,
  });

  const handleFnacSubmit = async () => {
    if (selectedFnacImages.length === 0) {
      toast.error('Please upload at least one FNAC image');
      return;
    }

    setIsProcessingFnac(true);

    try {
      const fnacRes = await testService.processFnac(diagnosisResult.testId, selectedFnacImages, String(diagnosisResult.testId));

      if (fnacRes.succeeded) {
        toast.success('FNAC Cytopathology Analysis Complete');
        setSelectedFnacImages([]);
        fetchDiagnosis();
      } else {
        toast.error(`Error processing FNAC: ${fnacRes.message}`);
      }
    } catch (err) {
      toast.error('Connection error');
    } finally {
      setIsProcessingFnac(false);
    }
  };

  if (loading) return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[40px] shadow-sm">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Neural processing in progress...</p>
    </div>
  );

  if (!diagnosisResult) return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 p-6 rounded-[40px] border border-gray-100">
      <Activity className="w-12 h-12 text-gray-200 mb-4" />
      <h2 className="text-xl font-bold text-gray-800">No Diagnosis Found</h2>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 1. Patient Profile & Laboratory Biomarkers (Top) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
        {/* Patient Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-3xl shrink-0">
            {diagnosisResult.patientInfo.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{diagnosisResult.patientInfo.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 font-bold text-sm">
              <span className="flex items-center gap-1"><Smartphone size={14} /> ID: #{diagnosisResult.patientInfo.id}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {diagnosisResult.patientInfo.age || '—'} Yrs</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest">{diagnosisResult.patientInfo.gender}</span>
            </div>
          </div>
        </div>

        {/* Labs */}
        <div className="w-full xl:w-auto flex-1 bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FlaskConical size={14} className="text-teal-500" /> Laboratory Biomarkers
          </h3>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-between xl:justify-end">
            {[
              { l: 'TSH', v: diagnosisResult.labs.tsh, u: 'mIU/L' },
              { l: 'T3', v: diagnosisResult.labs.t3, u: 'ng/dL' },
              { l: 'TT4', v: diagnosisResult.labs.tt4, u: 'μg/dL' },
              { l: 'FTI', v: diagnosisResult.labs.fti, u: '' },
              { l: 'T4U', v: diagnosisResult.labs.t4u, u: '' }
            ].map((lab, i) => (
              <div key={i} className="text-center bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 min-w-[80px]">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{lab.l}</p>
                <p className="text-lg md:text-xl font-black text-gray-900">
                  {lab.v || '—'}
                </p>
                <p className="text-[9px] text-gray-400">{lab.u || '\u00A0'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.5 Overall Clinical Assessment */}
      {diagnosisResult.clinicalAssessment && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border-l-[8px] border-teal-500 border-t border-b border-r border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <Stethoscope size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 flex-wrap">
                Overall Clinical Assessment
                {diagnosisResult.clinicalAssessment.needsManualReview && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                    <AlertCircle size={12} /> Manual Review Needed
                  </span>
                )}
              </h2>
              <p className="text-sm font-bold text-gray-500 mt-1">{diagnosisResult.clinicalAssessment.functionalStatus}</p>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0 text-left md:text-right flex flex-wrap items-center gap-4">
              {diagnosisResult.clinicalAssessment.probabilities && (
                <div className="flex gap-2 mr-4">
                  {Object.entries(diagnosisResult.clinicalAssessment.probabilities).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-center">
                      <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">{key}</p>
                      <p className="text-xs font-black text-slate-700">{(val * 100).toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              )}
              {diagnosisResult.clinicalAssessment.confidence ? (
                <div className="bg-teal-50/50 border border-teal-100 px-4 py-2 rounded-xl shadow-sm text-center">
                  <p className="text-xl font-black text-teal-600">
                    {diagnosisResult.clinicalAssessment.confidence <= 1
                      ? (diagnosisResult.clinicalAssessment.confidence * 100).toFixed(1)
                      : Number(diagnosisResult.clinicalAssessment.confidence).toFixed(1)}%
                  </p>
                  <p className="text-[9px] font-bold text-teal-600/70 uppercase tracking-widest">AI Confidence</p>
                </div>
              ) : null}
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-sm text-center">
                <p className="text-xl font-black text-slate-800 capitalize">{diagnosisResult.clinicalAssessment.riskLevel.toLowerCase()}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText size={16} /> Clinical Recommendation
              </p>
              <p className="text-gray-800 font-bold leading-relaxed">{diagnosisResult.clinicalAssessment.clinicalRecommendation}</p>
            </div>

            {diagnosisResult.clinicalAssessment.aiRecommendation && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Brain size={16} /> AI Detailed Insight
                </p>
                <div className="text-[13px] text-gray-600 font-medium leading-relaxed prose max-w-none">
                  {diagnosisResult.clinicalAssessment.aiRecommendation.split('\n').map((line, idx) => (
                    <p key={idx} className={line.trim() ? "mb-2" : "hidden"}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {diagnosisResult.clinicalAssessment.nextStepDetails ? (
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-[11px] font-black text-teal-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TargetIcon size={16} /> Next Step Action Plan
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Action</p>
                    <p className="text-sm font-bold text-gray-800">{diagnosisResult.clinicalAssessment.nextStepDetails.action || diagnosisResult.clinicalAssessment.nextStep}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rationale</p>
                    <p className="text-sm font-bold text-gray-800">{diagnosisResult.clinicalAssessment.nextStepDetails.rationale || '—'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center gap-2">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Urgency</p>
                      <p className="text-sm font-bold text-gray-800 capitalize">{diagnosisResult.clinicalAssessment.nextStepDetails.urgency || 'Normal'}</p>
                    </div>
                    {diagnosisResult.clinicalAssessment.nextStepDetails.cancer_pipeline_triggered && (
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100 inline-block w-fit">
                        Cancer Pipeline Triggered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="inline-flex flex-wrap items-center gap-3 text-gray-700 font-bold text-sm bg-slate-50 px-5 py-3 rounded-xl border border-gray-100">
                <TargetIcon size={16} className="text-gray-400" />
                <span><span className="text-gray-400 uppercase text-[10px] tracking-widest mr-2">Next Step:</span> {diagnosisResult.clinicalAssessment.nextStep}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Loop over Image Predictions */}
      {diagnosisResult.imagePredictions && diagnosisResult.imagePredictions.length > 0 ? (
        <div className="space-y-8">
          {diagnosisResult.imagePredictions.map((pred, idx) => {
            const label = pred?.classification?.label || pred?.Classification?.Label || pred?.classificationLabel || 'Unknown';
            const confidence = pred?.classification?.confidence_pct || pred?.Classification?.confidence_pct || pred?.confidence || 0;
            const riskLevel = pred?.classification?.risk_level || pred?.Classification?.risk_level || pred?.riskLevel || 'TBD';
            const clinicalRec = pred?.classification?.clinical_recommendation || pred?.Classification?.clinical_recommendation || pred?.clinicalRecommendation || 'Follow up required.';
            const aiRec = pred?.ai_recommendation || null;
            const nextStep = pred?.classification?.next_step || pred?.Classification?.next_step || pred?.nextStep || 'Consult endocrinologist';
            const needsReview = pred?.classification?.needs_manual_review || pred?.Classification?.needs_manual_review || pred?.classification?.NeedsManualReview || pred?.Classification?.NeedsManualReview || confidence < 60;
            const tirads = pred?.classification?.acr_tirads_level || pred?.Classification?.acr_tirads_level || pred?.classification?.Tirads_Stage || pred?.Classification?.Tirads_Stage || 'N/A';
            const radiomicFeatures = pred?.classification?.radiomic_features || pred?.Classification?.radiomic_features || pred?.classification?.RadiomicFeatures || pred?.Classification?.RadiomicFeatures || null;
            const segmentation = pred?.segmentation || pred?.Segmentation || null;
            const medicalDisclaimer = pred?.medical_disclaimer || pred?.MedicalDisclaimer || null;
            const filename = pred?.filename || pred?.Filename || `Image ${idx + 1}`;

            // Extract images object (could be uppercase or lowercase depending on source)
            const aiImages = pred?.images || pred?.Images;

            // Construct original image URL properly
            const origImgUrl = pred.original_url
              ? (pred.original_url.startsWith('http') || pred.original_url.startsWith('data:')
                ? pred.original_url
                : `${BASE_URL}${pred.original_url.startsWith('/') ? '' : '/'}${pred.original_url}`)
              : null;

            return (
              <div key={idx} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border-l-[12px] border-primary border-t border-b border-r border-gray-200 relative">
                <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
                  <Brain size={250} className="-mr-10 -mt-10" />
                </div>

                <div className="relative z-10">
                  {/* Simple Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {needsReview && (
                          <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">
                            Review Req
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 capitalize">{label}</h2>
                    </div>
                    <div className="mt-6 md:mt-0 flex flex-wrap gap-4 text-center justify-end">
                      <div className="bg-white border-2 border-primary/10 rounded-2xl px-6 py-4 shadow-sm flex-1 md:flex-none min-w-[140px] flex flex-col justify-center">
                        <p className="text-2xl font-black text-primary mb-1">{Number(confidence).toFixed(1)}%</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confidence</p>
                      </div>
                      <div className="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 shadow-sm flex-1 md:flex-none min-w-[140px] flex flex-col justify-center">
                        <p className="text-2xl font-black text-slate-800 capitalize mb-1">{riskLevel.toLowerCase()}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</p>
                      </div>
                      <div className="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 shadow-sm flex-1 md:flex-none min-w-[140px] flex flex-col justify-center">
                        <p className="text-2xl font-black text-slate-800 uppercase mb-1">{tirads}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACR TI-RADS</p>
                      </div>
                    </div>
                  </div>

                  {/* Images Grid */}
                  <div className="mt-6">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Scan size={18} className="text-primary" /> AI Vision Scans</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Removed Original Scan per user request, but restored as Original Scan with new AI pipeline */}
                      {(aiImages?.annotated_url || aiImages?.overlay_url) && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Detection</span>
                          </div>
                          <img src={(aiImages.annotated_url || aiImages.overlay_url).startsWith('/') ? `${BASE_URL}${aiImages.annotated_url || aiImages.overlay_url}` : (aiImages.annotated_url || aiImages.overlay_url)} alt="Detection" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                        </div>
                      )}
                      {(aiImages?.mask_overlay_url || aiImages?.mask_url) && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Segmentation</span>
                          </div>
                          <img src={(aiImages.mask_overlay_url || aiImages.mask_url).startsWith('/') ? `${BASE_URL}${aiImages.mask_overlay_url || aiImages.mask_url}` : (aiImages.mask_overlay_url || aiImages.mask_url)} alt="Mask" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                        </div>
                      )}
                      {(aiImages?.original_url || aiImages?.roi_url) && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Original Scan</span>
                          </div>
                          <img src={(aiImages.original_url || aiImages.roi_url).startsWith('/') ? `${BASE_URL}${aiImages.original_url || aiImages.roi_url}` : (aiImages.original_url || aiImages.roi_url)} alt="Original" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Show Details Button */}
                  <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <button
                      onClick={() => toggleImageDetails(idx)}
                      className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white transition-all bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md px-6 py-3 rounded-full"
                    >
                      <Info size={14} /> {expandedImageDetails[idx] ? "Hide Details" : "Show Details"}
                    </button>
                  </div>

                  {/* Details Expanded Section */}
                  <AnimatePresence>
                    {expandedImageDetails[idx] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="space-y-6 bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Stethoscope size={16} /> Primary Recommendation
                            </p>
                            <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed">
                              "{clinicalRec}"
                            </p>
                          </div>

                          {aiRec && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <FileText size={16} /> Detailed AI Insight
                              </p>
                              <div className="text-[13px] font-medium leading-relaxed text-gray-600 prose max-w-none">
                                {aiRec.split('\n').map((line, lineIdx) => (
                                  <p key={lineIdx} className={line.startsWith('**') ? 'font-black mt-2 text-gray-900' : ''}>{line.replace(/\*\*/g, '')}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="inline-flex flex-wrap items-center gap-3 text-gray-700 font-bold text-sm bg-white px-5 py-4 rounded-xl border border-gray-100 shadow-sm w-full">
                            <Clock size={16} className="text-gray-400" />
                            <span><span className="text-gray-400 uppercase text-[10px] tracking-widest mr-2">Suggested Action:</span> {nextStep}</span>
                          </div>

                          {radiomicFeatures && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity size={16} /> Radiomic Features
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(radiomicFeatures).map(([key, value], rIdx) => {
                                  const displayKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                                  const isBool = typeof value === 'boolean';
                                  const displayValue = isBool ? (value ? 'Yes' : 'No') : Number(value).toFixed(2);
                                  const highlight = isBool && value ? 'text-amber-600' : 'text-gray-700';

                                  return (
                                    <div key={rIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 truncate" title={displayKey}>{displayKey}</p>
                                      <p className={`text-sm font-bold ${highlight}`}>{displayValue}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {segmentation && (
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                              <div className="text-xs">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Method:</span>
                                <span className="font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-100">{segmentation.method || segmentation.Method || 'N/A'}</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">ROI Extraction:</span>
                                <span className="font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-100">{segmentation.roi_extraction || segmentation.RoiExtraction || 'N/A'}</span>
                              </div>
                            </div>
                          )}

                          {medicalDisclaimer && (
                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 mt-4">
                              <p className="text-xs font-bold text-amber-800/80 leading-relaxed">
                                {medicalDisclaimer}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500 font-bold">No image analysis results found for this session.</p>
        </div>
      )}

      {/* Timeline (Full Width) */}
      {diagnosisResult.timeline && diagnosisResult.timeline.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-gray-900">
            <History className="text-primary" size={20} /> Patient Timeline
          </h3>
          <div className="flex overflow-x-auto pb-4 gap-4 snap-x">
            {diagnosisResult.timeline.map((step, i) => (
              <div key={i} className="flex-shrink-0 w-64 bg-gray-50 p-5 rounded-2xl border border-gray-100 snap-center relative">
                {i > 0 && <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-200"></div>}
                <div className="w-3 h-3 rounded-full bg-primary mb-3"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{step.date}</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{step.status.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Upload Additional Ultrasound */}
      <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 text-white shadow-sm border border-slate-800 relative overflow-hidden mb-6">
        <div className="absolute right-0 bottom-0 opacity-5"><Scan size={250} className="-mb-10 -mr-10" /></div>
        <div className="relative z-10 flex flex-col xl:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-black flex items-center gap-3"><Scan size={24} /> Upload New Ultrasound</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xl text-sm">
              Run a new neural cancer-detection analysis by uploading recent ultrasound images for this patient.
            </p>
          </div>

          <div className="w-full xl:w-1/2 bg-white/5 rounded-2xl p-2 border border-white/10">
            {selectedImages && selectedImages.length > 0 ? (
              <div className={`flex flex-col gap-2 p-4 rounded-xl w-full ${isValidating ? 'bg-white/5' : 'bg-transparent'}`}>
                {selectedImages.map((file, idx) => {
                  const validStatus = validationResults.find(r => r.fileName === file.name)?.valid;
                  return (
                    <div key={idx} className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-black/40 flex-shrink-0 relative">
                          <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            {isValidating ? <Loader2 className="animate-spin w-5 h-5 text-white" /> : (validStatus ? <CircleCheck className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5 text-red-400" />)}
                          </div>
                        </div>
                        <span className="text-xs font-bold truncate max-w-[180px]">{file.name}</span>
                      </div>
                      <button onClick={() => removeImage(idx)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors group/btn">
                        <X size={16} className="text-slate-400 group-hover/btn:text-white" />
                      </button>
                    </div>
                  );
                })}
                <button onClick={open} className="text-[11px] font-black uppercase tracking-widest mt-2 hover:text-white text-slate-400 text-left px-2 transition-colors">
                  + Add more images
                </button>
              </div>
            ) : (
              <div {...getRootProps()} className="w-full py-10 border border-dashed border-white/20 rounded-xl flex flex-col items-center gap-3 hover:bg-white/5 transition-all cursor-pointer">
                <Upload size={24} className="opacity-50" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isDragActive ? "Drop images here" : "Drag & Drop Ultrasound Files"}</span>
              </div>
            )}
            <input {...getInputProps()} className="hidden" />
          </div>
        </div>

        {selectedImages && selectedImages.length > 0 && validationResults.every(r => r.valid) && (
          <div className="mt-6 border-t border-slate-800 pt-6 flex justify-end relative z-10">
            <button
              onClick={handleImageSubmit}
              disabled={isProcessingImage}
              className="px-8 py-4 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-3"
            >
              {isProcessingImage ? <Loader2 className="animate-spin w-4 h-4" /> : <Zap size={16} />} Run Analysis
            </button>
          </div>
        )}
      </div>

      {/* --- FNAC COMBINED SECTION --- */}
      <div className="bg-[#E6F0FA] rounded-[40px] p-6 md:p-8 shadow-md border-2 border-blue-200 relative overflow-hidden mb-8 group transition-all duration-300">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform group-hover:scale-105 transition-transform duration-700">
          <FlaskConical size={320} className="-mb-10 -mr-10 text-blue-900"/>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-blue-400 relative group-hover:shadow-xl transition-all duration-300">
              <Microscope className="text-white relative z-10" size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-blue-950 tracking-tight">
                FNAC Cytopathology
              </h2>
              <p className="text-blue-800/80 font-bold tracking-wide mt-1 text-sm md:text-base">
                Upload, analyze, and review Fine-Needle Aspiration biopsy images.
              </p>
            </div>
          </div>

          {/* Upload FNAC Image */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 text-gray-900 shadow-sm border border-white/50">
            <div className="flex flex-col xl:flex-row items-center gap-10">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-black text-blue-900">1. Run New Analysis</h3>
                <p className="text-blue-800/70 font-medium leading-relaxed max-w-xl text-sm">
                  Upload cytology cell images from a Fine-Needle Aspiration (FNA) biopsy. The AI will classify it using The Bethesda System to determine final malignancy risk.
                </p>
              </div>

              {/* The Upload Box - distinct color */}
              <div className="w-full xl:w-1/2 bg-blue-50 rounded-2xl p-3 border-2 border-blue-200 shadow-inner">
                {selectedFnacImages && selectedFnacImages.length > 0 ? (
                  <div className="flex flex-col gap-3 p-2 rounded-xl w-full">
                    {selectedFnacImages.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          {/* Image Preview */}
                          <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-bold truncate max-w-[180px] text-slate-700">{file.name}</span>
                        </div>
                        <button onClick={() => removeFnacImage(idx)} className="p-2 hover:bg-red-50 rounded-lg transition-colors group/btn">
                          <X size={16} className="text-slate-400 group-hover/btn:text-red-500" />
                        </button>
                      </div>
                    ))}
                    <button onClick={openFnac} className="text-xs font-black uppercase tracking-widest mt-2 hover:text-blue-700 text-blue-500 text-left px-2 transition-colors flex items-center gap-2">
                      <span>+</span> Add more images
                    </button>
                  </div>
                ) : (
                  <div {...getFnacRootProps()} className="w-full py-10 bg-white/50 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center gap-3 hover:bg-blue-100/50 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                      <Upload size={20} className="text-blue-600" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">{isFnacDragActive ? "Drop images here" : "Drag & Drop FNAC Images"}</span>
                  </div>
                )}
                <input {...getFnacInputProps()} className="hidden" />
              </div>
            </div>

            {selectedFnacImages && selectedFnacImages.length > 0 && (
              <div className="mt-6 border-t border-blue-100/50 pt-6 flex justify-end">
                <button
                  onClick={handleFnacSubmit}
                  disabled={isProcessingFnac}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
                >
                  {isProcessingFnac ? <Loader2 className="animate-spin w-4 h-4" /> : <Microscope size={16} />} Assess Cytopathology
                </button>
              </div>
            )}
          </div>

          {/* FNAC Cytopathology Results (if available) */}
          {diagnosisResult.fnac && diagnosisResult.fnac.category && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-black text-slate-800 mb-6">2. Analysis Results</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
                  <p className="text-3xl font-black text-slate-800 mb-1">{diagnosisResult.fnac.category}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bethesda Category</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm md:col-span-2">
                  <p className="text-lg font-black text-slate-800 mb-1">{diagnosisResult.fnac.label}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Diagnostic Label</p>
                </div>
                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
                  <p className="text-2xl font-black text-rose-600 mb-1">{diagnosisResult.fnac.malignancyRisk}</p>
                  <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Malignancy Risk</p>
                </div>
              </div>

              {diagnosisResult.fnac.confidence && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: `${diagnosisResult.fnac.confidence}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{Number(diagnosisResult.fnac.confidence).toFixed(1)}% Confidence</span>
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertCircle size={16} /> Official System Recommendation
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-medium text-sm">
                    {diagnosisResult.fnac.recommendation}
                  </p>
                </div>
                {diagnosisResult.fnac.aiRecommendation && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Brain size={16} /> AI Executive Summary
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-medium text-sm">
                      {diagnosisResult.fnac.aiRecommendation}
                    </p>
                  </div>
                )}
              </div>

              {diagnosisResult.fnac.needsManualReview && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-bold text-amber-800">Manual Review Required</p>
                    <p className="text-xs text-amber-700/80 mt-1">This result requires secondary verification by a senior cytopathologist.</p>
                  </div>
                </div>
              )}

              {diagnosisResult.fnac.disclaimer && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-[11px] font-bold text-gray-500 leading-relaxed">
                    {diagnosisResult.fnac.disclaimer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ThyroidDiagnosisView;