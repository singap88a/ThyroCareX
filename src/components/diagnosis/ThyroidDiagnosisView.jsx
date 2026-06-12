import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, Activity, AlertCircle, CircleCheck,
  TrendingUp, TrendingDown, Download, Share2, Printer, Clock,
  Brain, ChevronRight, BarChart3, FileText, Stethoscope,
  Target as TargetIcon, Shield, Smartphone, Zap, MapPin,
  FlaskConical, Microscope, Scan, Info, History, Upload, X, Loader2
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import testService from '../../services/testService';
import patientService from '../../services/patientService';

const DISEASE_LOCATION_MAP = {
  1: { position: { x: -0.40, y: -0.5, z: 0.3 }, label: "Thyroid Center" },
  2: { position: { x: 0.5, y: 0.2, z: 0.25 }, label: "Right Lobe - Superior" },
  3: { position: { x: 0.6, y: 0, z: 0.3 }, label: "Right Lobe - Middle" },
  4: { position: { x: 0.5, y: -0.2, z: 0.25 }, label: "Right Lobe - Inferior" },
  5: { position: { x: -0.5, y: 0.2, z: 0.25 }, label: "Left Lobe - Superior" },
  6: { position: { x: -0.6, y: 0, z: 0.3 }, label: "Left Lobe - Middle" },
  7: { position: { x: -0.5, y: -0.2, z: 0.25 }, label: "Left Lobe - Inferior" },
  8: { position: { x: 0, y: 0.15, z: 0.2 }, label: "Isthmus" },
};

const ThyroidDiagnosisView = ({ patientId: propPatientId, initialData = null, dashboardMode = false, testId = null }) => {
  const { id: paramPatientId } = useParams();
  const patientId = propPatientId || paramPatientId;
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const [rawTestData, setRawTestData] = useState(null);

  // --- Image Upload State ---
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [webGLError, setWebGLError] = useState(false);

  const processDiagnosisData = (data, history, patientData = null) => {
    const latestTest = data;
    const diag = latestTest.diagnosisResult;
    let extra = {};
    if (diag?.rawResponse) {
      try {
        extra = JSON.parse(diag.rawResponse);
      } catch (e) { }
    }

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
      diagnosisSummary: {
        status: (diag?.classificationLabel || diag?.riskLevel || extra.functional_status || extra.classification?.label || 'PENDING').toUpperCase(),
        confidence: extra.model_confidence ? (extra.model_confidence * 100).toFixed(1) : (extra.classification?.confidence_pct || diag?.confidence || 0),
        thyroidCondition: diag?.functionalStatus || extra.functional_status || (extra.classification?.label ? `Ultrasound: ${extra.classification.label}` : 'Thyroid Assessment'),
        severity: diag?.riskLevel || extra.risk_level || extra.classification?.risk_level || 'TBD',
        riskLevel: diag?.riskLevel || extra.risk_level || extra.classification?.risk_level || 'TBD',
        clinicalRecommendation: diag?.clinicalRecommendation || extra.clinical_recommendation || extra.classification?.clinical_recommendation || 'Standard clinical follow-up recommended.',
        aiRecommendation: extra.ai_recommendation || diag?.fnacRecommendation || null,
        urgency: (diag?.riskLevel || extra.risk_level || extra.classification?.risk_level || '').toLowerCase().includes('high') ? 'HIGH' : 'NORMAL',
        nextStep: diag?.nextStep || extra.next_step || 'Consult with endocrinologist',
        needsManualReview: extra.needs_manual_review || (extra.classification?.confidence_pct < 60) || false,
        tirads: diag?.tiradsStage || extra.classification?.acr_tirads_level || 'TBD'
      },
      images: {
        original: (latestTest.imagePath || latestTest.ImagePath)?.split(',').filter(i => i) || [],
        overlay: (diag?.overlayImageUrl || extra.images?.overlay_url)?.split(/,(?=[Ii]mages|http|\/|data:image)/).filter(i => i) || [],
        mask: (diag?.maskImageUrl || extra.images?.mask_url)?.split(/,(?=[Ii]mages|http|\/|data:image)/).filter(i => i) || [],
        roi: (diag?.roiImageUrl || extra.images?.roi_url)?.split(/,(?=[Ii]mages|http|\/|data:image)/).filter(i => i) || []
      },
      labs: {
        tsh: latestTest.tsh || latestTest.TSH,
        t3: latestTest.t3 || latestTest.T3,
        tt4: latestTest.tt4 || latestTest.TT4 || latestTest.tT4,
        fti: latestTest.fti || latestTest.FTI,
        t4u: latestTest.t4u || latestTest.T4U || latestTest.t4U
      },
      probabilities: extra.probabilities || extra.Probabilities || {},
      fnac: {
        category: diag?.bethesdaCategory,
        label: diag?.bethesdaLabel,
        risk: diag?.malignancyRisk
      },
      aiMetrics: extra.metrics || {
        accuracy: 96.3,
        sensitivity: 94.8,
        specificity: 97.1,
        processingTime: extra.processing_time || "2.4s"
      },
      diseaseLocation: extra.disease_location || extra.location_index || 1,
      noduleAnalysis: extra.nodules || [
        {
          id: 1,
          size: extra.nodule_size || "1.8cm",
          location: "Detected Nodule",
          tirads: diag?.tiradsStage || extra.classification?.acr_tirads_level || "TBD",
          risk: extra.classification?.confidence_pct || diag?.confidence || 0
        }
      ],
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

  // --- Image Handling Logic ---
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
          // Remove any previous results with the same names to avoid duplicates
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
        // Optional fallback: assume valid if backend validation fails unexpectedly
        // setValidationResults(prev => [...prev, ...acceptedFiles.map(f => ({fileName: f.name, valid: true}))]);
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
    noClick: selectedImages && selectedImages.length > 0, // Disable root click if images are already selected so users can click remove icons
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
      const imgRes = await testService.processImage(diagnosisResult.testId, validImages);
      
      if (imgRes.succeeded) {
        toast.success('AI Image Diagnosis Complete');
        setSelectedImages([]);
        setValidationResults([]);
        fetchDiagnosis(); // Refresh data to show results
      } else {
        toast.error(`Error processing images: ${imgRes.message}`);
      }
    } catch (imgErr) {
      toast.error('Connection error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // 3D Model logic removed to separate view

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

  const needsUltrasound = diagnosisResult.diagnosisSummary.nextStep === 'upload_ultrasound';

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
          <div className="flex flex-wrap gap-4 md:gap-8 justify-between xl:justify-end">
            {[
              { l: 'TSH', v: diagnosisResult.labs.tsh, u: 'mIU/L' },
              { l: 'T3', v: diagnosisResult.labs.t3, u: 'ng/dL' },
              { l: 'TT4', v: diagnosisResult.labs.tt4, u: 'μg/dL' },
              { l: 'FTI', v: diagnosisResult.labs.fti, u: '' },
              { l: 'T4U', v: diagnosisResult.labs.t4u, u: '' }
            ].map((lab, i) => (
              <div key={i} className="text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{lab.l}</p>
                <p className="text-xl font-black text-gray-900">
                  {lab.v || '—'} <span className="text-[9px] text-gray-400 ml-1">{lab.u}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Professional AI Diagnosis Result */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border-l-[12px] border-primary border-t border-b border-r border-gray-200 relative">
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          <Brain size={250} className="-mr-10 -mt-10" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-100">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 flex items-center gap-2">
                <Brain size={14} className="text-primary"/> Clinical AI Assessment
              </p>
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-black text-gray-900 capitalize tracking-tight">{diagnosisResult.diagnosisSummary.status.toLowerCase()}</h2>
                {diagnosisResult.diagnosisSummary.needsManualReview && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-red-200">
                    <AlertCircle size={12} /> Review Req
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-8 mt-6 md:mt-0 text-right">
              <div>
                <p className="text-3xl font-black text-primary">{diagnosisResult.diagnosisSummary.confidence}%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Confidence</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl font-black text-gray-900 capitalize">{diagnosisResult.diagnosisSummary.riskLevel.toLowerCase()}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Risk Level</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-100">
              <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Stethoscope size={16}/> Primary Recommendation
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
                "{diagnosisResult.diagnosisSummary.clinicalRecommendation}"
              </p>
            </div>

            {diagnosisResult.diagnosisSummary.aiRecommendation && (
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FileText size={16}/> Detailed AI Insight
                </p>
                <div className="text-[14px] font-medium leading-relaxed text-gray-600 prose max-w-none">
                  {diagnosisResult.diagnosisSummary.aiRecommendation.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('**') ? 'font-black mt-3 text-gray-900' : ''}>{line.replace(/\*\*/g, '')}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="inline-flex flex-wrap items-center gap-3 text-gray-700 font-bold text-sm bg-gray-50 px-6 py-4 rounded-xl border border-gray-200">
              <Clock size={18} className="text-gray-400" /> 
              <span><span className="text-gray-400 uppercase text-[10px] tracking-widest mr-2">Suggested Action:</span> {diagnosisResult.diagnosisSummary.nextStep}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Analysis (Nodule Analysis & Probabilities) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Probabilities */}
          {diagnosisResult.probabilities && Object.keys(diagnosisResult.probabilities).length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-md font-black text-gray-900 mb-6 flex items-center gap-3">
                 <Activity className="text-primary" size={18} /> Probability Distribution
              </h3>
              <div className="space-y-4">
                {Object.entries(diagnosisResult.probabilities).map(([key, val], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 mb-2">
                      <span>{key}</span>
                      <span className={val > 0.5 ? 'text-primary' : 'text-gray-400'}>{Math.round(val * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${val > 0.5 ? 'bg-primary' : 'bg-gray-300'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nodule Analysis */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 h-full">
            <h3 className="text-md font-black text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="text-primary" size={18} /> Nodule Analysis
            </h3>
            <div className="space-y-4">
              {diagnosisResult.noduleAnalysis.map((nodule, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-primary font-black shadow-sm border border-gray-100">
                      {nodule.id}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">{nodule.size}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{nodule.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-red-600">{nodule.tirads}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">TI-RADS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* 5. Ultrasound Scans (Full Width) */}
      {diagnosisResult.images && diagnosisResult.images.original?.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <Scan className="text-blue-500" size={24} /> AI Vision Diagnostics
            </h2>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Risk Level:</span>
                <span className="text-xs font-black text-blue-600">{diagnosisResult.diagnosisSummary.riskLevel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {diagnosisResult.images.original.map((origImage, idx) => (
              <div key={idx} className="pt-6 first:pt-0">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Ultrasound View {idx + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(!diagnosisResult.images.overlay || !diagnosisResult.images.overlay[idx]) && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Original Scan</span>
                      </div>
                      <img src={origImage.startsWith('http') || origImage.startsWith('data:') ? origImage : `http://localhost:5153${origImage.startsWith('/') ? '' : '/'}${origImage}`} alt="Original Ultrasound" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    </div>
                  )}
                  {diagnosisResult.images.overlay && diagnosisResult.images.overlay[idx] && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Detection</span>
                        <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-black">{diagnosisResult.diagnosisSummary.confidence}% Conf</div>
                      </div>
                      <img src={diagnosisResult.images.overlay[idx]} alt="Overlay" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    </div>
                  )}
                  {diagnosisResult.images.mask && diagnosisResult.images.mask[idx] && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Segmentation</span>
                      </div>
                      <img src={diagnosisResult.images.mask[idx]} alt="Mask" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    </div>
                  )}
                  {diagnosisResult.images.roi && diagnosisResult.images.roi[idx] && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">ROI Area</span>
                      </div>
                      <img src={diagnosisResult.images.roi[idx]} alt="ROI" className="w-full h-56 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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

      {/* 6. Upload Additional Ultrasound */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5"><Microscope size={250} className="-mb-10 -mr-10"/></div>
        <div className="relative z-10 flex flex-col xl:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-black flex items-center gap-3"><Scan size={24}/> Upload New Ultrasound</h3>
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
                      <div className="flex items-center gap-3">
                        {isValidating ? <Loader2 className="animate-spin w-4 h-4 text-slate-400" /> : (validStatus ? <CircleCheck className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-red-400" />)}
                        <span className="text-xs font-bold truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button onClick={() => removeImage(idx)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><X size={14} /></button>
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

    </div>
  );
};

export default ThyroidDiagnosisView;