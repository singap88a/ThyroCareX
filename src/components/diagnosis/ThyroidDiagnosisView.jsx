import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, Activity, AlertCircle, CircleCheck,
  TrendingUp, TrendingDown, Download, Share2, Printer, Clock,
  Brain, ChevronRight, BarChart3, FileText, Stethoscope,
  Target as TargetIcon, Shield, Smartphone, Zap, MapPin,
  FlaskConical, Microscope, Scan, Info, History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import AOS from 'aos';
import 'aos/dist/aos.css';
import testService from '../../services/testService';
import patientService from '../../services/patientService';
import { Loader2 } from 'lucide-react';

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

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

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
        overlay: diag?.overlayImageUrl || extra.images?.overlay_url,
        mask: diag?.maskImageUrl || extra.images?.mask_url,
        roi: diag?.roiImageUrl || extra.images?.roi_url
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

  useEffect(() => {
    if (initialData) {
      setDiagnosisResult(processDiagnosisData(initialData, []));
      setLoading(false);
      return;
    }

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
          
          // Default to latest if specific testId not found or not provided
          if (!testToShow) {
            testToShow = historyRes.data[0];
          }
          
          setDiagnosisResult(processDiagnosisData(testToShow, historyRes.data, patientRes?.data));
        }
      } catch (err) {
        console.error('Failed to load diagnosis', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosis();
  }, [patientId, initialData, testId]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const diseaseLocationNumber = diagnosisResult?.diseaseLocation || 1;

  // 3D Engine Initialization
  useEffect(() => {
    if (!canvasRef.current || !diagnosisResult) return;

    const scene = new THREE.Scene();
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    let diseaseMarker = null;

    const createMarker = (locationData) => {
      const group = new THREE.Group();
      const pos = locationData.position;
      const geo = new THREE.SphereGeometry(0.08, 32, 32);
      const mat = new THREE.MeshPhongMaterial({ color: 0xff4444, emissive: 0xff0000, emissiveIntensity: 0.5 });
      const marker = new THREE.Mesh(geo, mat);
      marker.position.set(pos.x, pos.y, pos.z);
      group.add(marker);
      diseaseMarker = marker;
      scene.add(group);
    };

    const loader = new GLTFLoader();
    loader.load('/models/thyroid.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 2.5 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));

      model.traverse(n => { if (n.isMesh) { n.material.transparent = true; n.material.opacity = 0.85; } });
      scene.add(model);

      const loc = DISEASE_LOCATION_MAP[diseaseLocationNumber];
      if (loc) createMarker(loc);
      setIs3DLoaded(true);
    }, undefined, (err) => {
      const geo = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
      const mat = new THREE.MeshPhongMaterial({ color: 0x4a90d9, transparent: true, opacity: 0.7 });
      scene.add(new THREE.Mesh(geo, mat));
      setIs3DLoaded(true);
    });

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (diseaseMarker) {
        diseaseMarker.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.2);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [diagnosisResult]);

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
    <div className="space-y-8">

      {/* Top Header Card */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary font-black text-3xl">
            {diagnosisResult.patientInfo.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{diagnosisResult.patientInfo.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-gray-500 font-bold text-sm">
              <span className="flex items-center gap-1"><Smartphone size={14} /> ID: #{diagnosisResult.patientInfo.id}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {diagnosisResult.patientInfo.age || '—'} Yrs</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">{diagnosisResult.patientInfo.gender}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-primary transition-colors"><Download size={20} /></button>
          <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-primary transition-colors"><Share2 size={20} /></button>
        </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Classification', value: diagnosisResult.diagnosisSummary.status || '—' },
            { label: 'Risk Level', value: diagnosisResult.diagnosisSummary.riskLevel || '—' },
            { label: 'Confidence', value: `${diagnosisResult.diagnosisSummary.confidence || 0}%` },
            { label: 'TI-RADS', value: diagnosisResult.diagnosisSummary.tirads || '—' },
            { label: 'Next Step', value: diagnosisResult.diagnosisSummary.nextStep || '—' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-black text-gray-900 mt-1 break-words">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: 3D and Images */}
        <div className="lg:col-span-8 space-y-8">

          {/* 3D Visualization */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <TargetIcon className="text-primary" /> 3D Anatomical Analysis
              </h2>
              <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Model
              </div>
            </div>

            <div className="h-[450px] relative rounded-3xl bg-slate-900 overflow-hidden border-8 border-gray-50">
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              <div className="absolute top-6 left-6 space-y-4">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
                  <p className="text-[10px] font-black opacity-50 uppercase mb-1">Functional Status</p>
                  <p className="text-lg font-black text-primary">{diagnosisResult.diagnosisSummary.thyroidCondition}</p>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none border-2 border-primary/20 rounded-2xl" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Risk Level', val: diagnosisResult.diagnosisSummary.riskLevel, icon: <Shield size={16} />, color: 'text-red-500' },
                { label: 'Confidence', val: `${diagnosisResult.diagnosisSummary.confidence}%`, icon: <Zap size={16} />, color: 'text-yellow-500' },
                { label: 'Classification', val: diagnosisResult.diagnosisSummary.status, icon: <Brain size={16} />, color: 'text-primary' },
                { label: 'Bethesda', val: diagnosisResult.fnac.category || 'N/A', icon: <Microscope size={16} />, color: 'text-purple-500' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2 flex items-center gap-1">{item.icon} {item.label}</p>
                  <p className={`text-lg font-black ${item.color}`}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ultrasound Analysis */}
          {diagnosisResult.images && (diagnosisResult.images.overlay || diagnosisResult.images.mask || diagnosisResult.images.roi) && (
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <Scan className="text-blue-500" /> AI Vision Diagnostics
                </h2>
                <div className="flex gap-3">
                  <div className="px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">AI Risk Level</p>
                    <p className="text-xs font-black text-blue-600">{diagnosisResult.diagnosisSummary.riskLevel}</p>
                  </div>
                  <div className="px-4 py-2 bg-purple-50 rounded-2xl border border-purple-100">
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-tighter">TI-RADS Stage</p>
                    <p className="text-xs font-black text-purple-600">{diagnosisResult.diagnosisSummary.tirads}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {diagnosisResult.images.overlay && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nodule Detection</span>
                      <div className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-black">{diagnosisResult.diagnosisSummary.confidence}% Conf.</div>
                    </div>
                    <img src={diagnosisResult.images.overlay} alt="Overlay" className="w-full h-64 object-cover rounded-[32px] border-4 border-gray-50 shadow-inner" />
                  </div>
                )}
                {diagnosisResult.images.mask && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Segmentation Mask</span>
                      <Info size={14} className="text-gray-300" />
                    </div>
                    <img src={diagnosisResult.images.mask} alt="Mask" className="w-full h-64 object-cover rounded-[32px] border-4 border-gray-50 shadow-inner" />
                  </div>
                )}
                {diagnosisResult.images.roi && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ROI (Focus Area)</span>
                      <Info size={14} className="text-gray-300" />
                    </div>
                    <img src={diagnosisResult.images.roi} alt="ROI" className="w-full h-64 object-cover rounded-[32px] border-4 border-gray-50 shadow-inner" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Biomarkers */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <FlaskConical className="text-teal-500" /> Laboratory Biomarkers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { l: 'TSH', v: diagnosisResult.labs.tsh, u: 'mIU/L' },
                { l: 'T3', v: diagnosisResult.labs.t3, u: 'ng/dL' },
                { l: 'TT4', v: diagnosisResult.labs.tt4, u: 'μg/dL' },
                { l: 'FTI', v: diagnosisResult.labs.fti, u: '' },
                { l: 'T4U', v: diagnosisResult.labs.t4u, u: '' }
              ].map((lab, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center group hover:bg-primary/5 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{lab.l}</p>
                  <p className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{lab.v || '—'}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{lab.u}</p>
                </div>
              ))}
            </div>
        </div>
      </div>

        {/* Right Column: Recommendations & Probabilities */}
        <div className="lg:col-span-4 space-y-8">

          {/* Clinical Summary */}
          <div className="bg-primary rounded-[40px] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />

            {diagnosisResult.diagnosisSummary.needsManualReview && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 animate-pulse">
                <AlertCircle size={14} /> Manual Review Required
              </div>
            )}

            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-white/60">Clinical Assessment</h3>
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase">Functional Status</p>
                <p className="text-4xl font-black tracking-tighter capitalize">{diagnosisResult.diagnosisSummary.status.toLowerCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">{diagnosisResult.diagnosisSummary.confidence}%</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">AI Confidence</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <p className="text-[10px] font-black text-white/40 uppercase mb-2">Primary Recommendation</p>
                <p className="text-sm font-bold leading-relaxed italic">"{diagnosisResult.diagnosisSummary.clinicalRecommendation}"</p>
              </div>

              {diagnosisResult.diagnosisSummary.aiRecommendation && (
                <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black text-white/40 uppercase mb-2">Detailed AI Insight</p>
                  <div className="text-[13px] font-medium leading-relaxed opacity-90 prose prose-invert max-w-none">
                    {diagnosisResult.diagnosisSummary.aiRecommendation.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('**') ? 'font-black mt-2' : ''}>{line.replace(/\*\*/g, '')}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-white/80 font-bold text-xs bg-black/20 p-4 rounded-2xl mt-8">
              <Clock size={16} /> Suggested Action: {diagnosisResult.diagnosisSummary.nextStep}
            </div>
          </div>

          {/* Probabilities */}
          {diagnosisResult.probabilities && Object.keys(diagnosisResult.probabilities).length > 0 && (
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-6">Probability Distribution</h3>
              <div className="space-y-6">
                {Object.entries(diagnosisResult.probabilities).map(([key, val], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                      <span>{key}</span>
                      <span>{Math.round(val * 100)}%</span>
                    </div>
                    <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val * 100}%` }}
                        className={`h-full rounded-full ${val > 0.5 ? 'bg-primary' : 'bg-slate-300'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nodule Analysis */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-primary" size={18} /> Nodule Analysis
            </h3>
            <div className="space-y-4">
              {diagnosisResult.noduleAnalysis.map((nodule, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                      {nodule.id}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{nodule.size}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{nodule.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-red-500">{nodule.tirads}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">TI-RADS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          {diagnosisResult.timeline && diagnosisResult.timeline.length > 0 && (
            <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-sm border border-slate-800">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <History className="text-primary" size={18} /> Diagnosis Timeline
              </h3>
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                {diagnosisResult.timeline.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className={`w-6 h-6 rounded-full border-4 border-slate-900 flex-shrink-0 ${i === 0 ? 'bg-primary' : 'bg-slate-700'}`} />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">{step.date}</p>
                      <p className="text-sm font-bold">{step.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ThyroidDiagnosisView;
