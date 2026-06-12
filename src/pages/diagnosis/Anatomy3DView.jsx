import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Target as TargetIcon, Activity, Shield, Zap, Microscope, Loader2 } from 'lucide-react';
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

const Anatomy3DView = ({ patientId: propPatientId, testId = null }) => {
  const { id: paramPatientId } = useParams();
  const patientId = propPatientId || paramPatientId;
  const canvasRef = useRef(null);

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  const processDiagnosisData = (data) => {
    const diag = data.diagnosisResult;
    let extra = {};
    if (diag?.rawResponse) {
      try { extra = JSON.parse(diag.rawResponse); } catch (e) {}
    }
    return {
      testId: data.id,
      diseaseLocation: extra.disease_location || extra.location_index || 1,
      summary: {
        status: (diag?.classificationLabel || diag?.riskLevel || extra.functional_status || extra.classification?.label || 'PENDING').toUpperCase(),
        confidence: extra.model_confidence ? (extra.model_confidence * 100).toFixed(1) : (extra.classification?.confidence_pct || diag?.confidence || 0),
        thyroidCondition: diag?.functionalStatus || extra.functional_status || (extra.classification?.label ? `Ultrasound: ${extra.classification.label}` : 'Thyroid Assessment'),
        riskLevel: diag?.riskLevel || extra.risk_level || extra.classification?.risk_level || 'TBD',
        tirads: diag?.tiradsStage || extra.classification?.acr_tirads_level || 'TBD'
      },
      nodules: extra.nodules || [
        {
          id: 1,
          size: extra.nodule_size || "1.8cm",
          location: "Detected Nodule",
          tirads: diag?.tiradsStage || extra.classification?.acr_tirads_level || "TBD"
        }
      ]
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyRes = await testService.getPatientTestHistory(patientId);
        if (historyRes.succeeded && historyRes.data && historyRes.data.length > 0) {
          let testToShow = testId ? historyRes.data.find(t => t.id === parseInt(testId)) : historyRes.data[0];
          if (!testToShow) testToShow = historyRes.data[0];
          setDiagnosisResult(processDiagnosisData(testToShow));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patientId, testId]);

  useEffect(() => {
    if (!canvasRef.current || !diagnosisResult) return;

    const scene = new THREE.Scene();
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    } catch (error) {
      console.error("WebGL context could not be created:", error);
      setWebGLError(true);
      return;
    }

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

      const loc = DISEASE_LOCATION_MAP[diagnosisResult.diseaseLocation || 1];
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
    <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Loading 3D Anatomy...</p>
    </div>
  );

  if (!diagnosisResult) return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-3xl border border-gray-200">
      <Activity className="w-12 h-12 text-gray-300 mb-4" />
      <p className="text-gray-500 font-bold">No Diagnosis Data Found</p>
    </div>
  );

  return (
    <div className="space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <TargetIcon className="text-primary" /> Interactive 3D Anatomy
          </h2>
          <div className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-black uppercase tracking-tighter flex items-center gap-2 border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Rendering
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-3 h-[400px] xl:h-[480px] relative rounded-2xl bg-[#0f172a] overflow-hidden border border-gray-200 shadow-inner flex items-center justify-center">
            {webGLError ? (
              <div className="text-center text-slate-400 p-8 z-10">
                <Activity size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-bold">3D Visualization Unavailable</p>
                <p className="text-sm mt-2 max-w-[250px] mx-auto">Your browser or device does not support WebGL.</p>
              </div>
            ) : (
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0" />
            )}
            <div className="absolute top-6 left-6 space-y-4 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm p-5 rounded-2xl border border-white/10 text-white shadow-xl">
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Detected Region</p>
                <p className="text-xl font-black text-primary capitalize">{diagnosisResult.summary.thyroidCondition}</p>
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Anatomical Details</h3>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400"><Shield size={16} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Risk Level</p>
                <p className="text-sm font-black text-red-600 capitalize">{diagnosisResult.summary.riskLevel}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400"><Zap size={16} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence</p>
                <p className="text-sm font-black text-amber-600">{diagnosisResult.summary.confidence}%</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400"><Microscope size={16} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TI-RADS Stage</p>
                <p className="text-sm font-black text-purple-600">{diagnosisResult.summary.tirads}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Detected Nodules</h3>
               <div className="space-y-3">
                 {diagnosisResult.nodules.map((n, i) => (
                   <div key={i} className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                     <p className="text-xs font-black text-primary mb-1">Nodule {n.id} ({n.size})</p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{n.location}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Anatomy3DView;
