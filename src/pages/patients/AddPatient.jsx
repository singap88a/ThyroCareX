import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, User, Calendar, Weight, Ruler,
  Phone, MapPin, FileText, Upload, Send, X,
  CircleCheck, AlertCircle, Loader2, Brain,
  Activity, FlaskConical, Microscope, Info, CheckCircle2, AlertTriangle, Fingerprint,
  Pill, HeartPulse, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import patientService from '../../services/patientService';
import testService from '../../services/testService';

// --- Sub-components (Moved outside to fix focus issue) ---

const InputField = ({ label, field, icon: Icon, type = "text", placeholder, step, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(field, e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none transition-all duration-200 font-bold text-gray-700 placeholder:text-gray-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm"
      />
    </div>
  </div>
);

const Toggle = ({ label, field, icon: Icon, active, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(field, !active)}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 font-bold text-xs ${
      active 
        ? 'bg-primary border-primary text-white shadow-md shadow-primary/10' 
        : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
    }`}
  >
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-gray-50'}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
    </div>
    <span className="flex-1 text-left">{label}</span>
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-white bg-white' : 'border-gray-200'}`}>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
    </div>
  </button>
);

// --- Main Page ---

const AddPatient = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null); 
  const [testId, setTestId] = useState(null);
  const [patientIdStr, setPatientIdStr] = useState(null);
  const [clinicalResult, setClinicalResult] = useState(null);

  const [patientData, setPatientData] = useState({
    fullName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    phone: '',
    address: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    tsh: '',
    t3: '',
    tt4: '',
    fti: '',
    t4u: '',
    onThyroxine: false,
    thyroidSurgery: false,
    queryHyperthyroid: false,
    nodulePresent: false,
    ultrasoundImage: null,
  });

  const steps = [
    { id: 1, title: 'Identity', icon: User },
    { id: 2, title: 'History', icon: FileText },
    { id: 3, title: 'Labs', icon: FlaskConical },
    { id: 4, title: 'Report', icon: Brain },
  ];

  const set = (field, value) => setPatientData(p => ({ ...p, [field]: value }));

  const getAgeNumber = () => {
    const n = Number(patientData.age);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(120, Math.floor(n)));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!patientData.fullName.trim()) { toast.error('Full name is required'); return false; }
      if (!getAgeNumber()) { toast.error('Age is required'); return false; }
      if (!patientData.gender) { toast.error('Gender is required'); return false; }
      if (!patientData.phone.trim()) { toast.error('Phone number is required'); return false; }
    }
    return true;
  };

  const next = () => { if (validateStep()) setCurrentStep(s => Math.min(4, s + 1)); };
  const prev = () => setCurrentStep(s => Math.max(1, s - 1));

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    set('ultrasoundImage', file);
    setValidationResult(null);
    setIsValidating(true);

    try {
      const res = await testService.validateImage(file);
      if (res.succeeded && res.data === true) {
        setValidationResult({ valid: true, message: 'Verified' });
        toast.success('Image verified');
      } else {
        setValidationResult({ valid: false, message: res.message || 'Invalid' });
        toast.error('Not an ultrasound');
      }
    } catch (err) {
      setValidationResult({ valid: false, message: 'Error' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClinicalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('FullName', patientData.fullName);
      fd.append('Age', String(getAgeNumber()));
      fd.append('Gender', patientData.gender === 'male' ? '1' : '2');
      fd.append('Height', patientData.height || '0');
      fd.append('Weight', patientData.weight || '0');
      fd.append('PhoneNumber', patientData.phone);
      if (patientData.address) fd.append('Address', patientData.address);
      fd.append('MedicalHistory', patientData.medicalHistory);
      fd.append('CurrentMedications', patientData.currentMedications);
      fd.append('KnownAllergies', patientData.allergies);

      const patientRes = await patientService.addPatient(fd);
      if (!patientRes.succeeded) {
        toast.error(patientRes.message || 'Error');
        return;
      }
      const pId = patientRes.data;
      setPatientIdStr(pId);

      const clinicalPayload = {
        patient_id: pId,
        Age: getAgeNumber(),
        on_thyroxine: patientData.onThyroxine ? 1 : 0,
        thyroid_surgery: patientData.thyroidSurgery ? 1 : 0,
        query_hyperthyroid: patientData.queryHyperthyroid ? 1 : 0,
        TSH: patientData.tsh ? parseFloat(patientData.tsh) : null,
        T3: patientData.t3 ? parseFloat(patientData.t3) : null,
        TT4: patientData.tt4 ? parseFloat(patientData.tt4) : null,
        FTI: patientData.fti ? parseFloat(patientData.fti) : null,
        T4U: patientData.t4u ? parseFloat(patientData.t4u) : null,
        nodule_present: patientData.nodulePresent,
      };

      const clinicalRes = await testService.processClinical(clinicalPayload);
      if (!clinicalRes.succeeded) {
        toast.error('AI Error');
        return;
      }

      setTestId(clinicalRes.data.test_id);
      setClinicalResult(clinicalRes.data.clinical);
      setCurrentStep(4);
      toast.success('Clinical complete');
    } catch (err) {
      toast.error('Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSubmit = async () => {
    if (!validationResult?.valid || !patientData.ultrasoundImage) {
      toast.error('Valid image required');
      return;
    }

    setIsProcessingImage(true);
    try {
      const imgRes = await testService.processImage(testId, patientData.ultrasoundImage);
      if (imgRes.succeeded) {
        toast.success('Diagnosis complete');
        navigate(`/patients/${patientIdStr}/dashboard?view=results`);
      } else {
        toast.error(imgRes.message || 'Error');
      }
    } catch (imgErr) {
      toast.error('Error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/patients')} className="p-2 rounded-xl hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Add Patient</h1>
          </div>
          <div className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">Step {currentStep}/4</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Simple Stepper */}
        <div className="flex items-start gap-2 mb-12 px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = currentStep > step.id;
            const active = currentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${done ? 'bg-primary border-primary text-white' :
                      active ? 'bg-white border-primary text-primary shadow-lg shadow-primary/10' : 'bg-white border-gray-100 text-gray-300'
                    }`}>
                    {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-gray-300'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 mt-5 h-[1px] bg-gray-100 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-primary transition-all duration-500 ${currentStep > step.id ? 'translate-x-0' : '-translate-x-full'}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" field="fullName" icon={User} placeholder="e.g. John Doe" value={patientData.fullName} onChange={set} />
                <InputField label="Age" field="age" type="number" icon={Calendar} placeholder="1-120" value={patientData.age} onChange={set} />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Gender</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"><User className="w-4 h-4"/></div>
                    <select value={patientData.gender} onChange={e => set('gender', e.target.value)} 
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <InputField label="Height (cm)" field="height" type="number" icon={Ruler} placeholder="175" value={patientData.height} onChange={set} />
                <InputField label="Weight (kg)" field="weight" type="number" icon={Weight} placeholder="70" value={patientData.weight} onChange={set} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <InputField label="Phone" field="phone" icon={Phone} placeholder="01XXXXXXXXX" value={patientData.phone} onChange={set} />
                 <InputField label="Address" field="address" icon={MapPin} placeholder="City, Street..." value={patientData.address} onChange={set} />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4"
            >
              <textarea rows={4} placeholder="Medical History..." value={patientData.medicalHistory} onChange={e => set('medicalHistory', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none" />
              <textarea rows={3} placeholder="Current Medications..." value={patientData.currentMedications} onChange={e => set('currentMedications', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none" />
              <textarea rows={2} placeholder="Known Allergies..." value={patientData.allergies} onChange={e => set('allergies', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none" />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2"><FlaskConical className="w-4 h-4 text-teal-600"/> Lab Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { id: 'tsh', name: 'TSH', hint: '0.4-4.0' },
                    { id: 't3', name: 'T3', hint: '80-200' },
                    { id: 'tt4', name: 'TT4', hint: '4.5-12' },
                    { id: 'fti', name: 'FTI', hint: '8-18' },
                    { id: 't4u', name: 'T4U', hint: '0.7-1.2' }
                  ].map(f => (
                    <div key={f.id} className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase">{f.name}</label>
                      <input type="number" step="0.001" placeholder={f.hint} value={patientData[f.id]} onChange={e => set(f.id, e.target.value)} 
                        className="w-full px-2 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-center text-sm focus:bg-white focus:border-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2"><Activity className="w-4 h-4 text-orange-600"/> Clinical Checks</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Toggle label="On Thyroxine" field="onThyroxine" icon={Pill} active={patientData.onThyroxine} onClick={set} />
                  <Toggle label="Thyroid Surgery" field="thyroidSurgery" icon={Microscope} active={patientData.thyroidSurgery} onClick={set} />
                  <Toggle label="Suspect Hyper" field="queryHyperthyroid" icon={Activity} active={patientData.queryHyperthyroid} onClick={set} />
                  <Toggle label="Nodule Present" field="nodulePresent" icon={CircleCheck} active={patientData.nodulePresent} onClick={set} />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && clinicalResult && (
            <motion.div 
              key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={`p-8 rounded-[2rem] border shadow-sm bg-white ${clinicalResult.risk_level === 'low' ? 'border-green-100' : 'border-red-100'}`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${clinicalResult.risk_level === 'low' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">AI Prediction</p>
                      <h2 className="text-2xl font-black text-gray-900 capitalize">{clinicalResult.functional_status}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Confidence</p>
                     <p className="text-3xl font-black text-gray-900">{(clinicalResult.model_confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {clinicalResult.probabilities && Object.entries(clinicalResult.probabilities).map(([key, val]) => (
                    <div key={key} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[9px] font-black text-gray-400 uppercase">{key}</p>
                        <p className="text-[10px] font-black">{(val * 100).toFixed(1)}%</p>
                      </div>
                      <div className="h-1.5 bg-white rounded-full overflow-hidden border border-gray-100">
                         <div className="h-full bg-primary" style={{ width: `${val * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                   <p className="text-sm font-bold text-gray-700 italic">"{clinicalResult.clinical_recommendation}"</p>
                </div>
              </div>

              {(clinicalResult.next_step === 'upload_ultrasound' || clinicalResult.next_step_details?.cancer_pipeline_triggered) ? (
                <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-lg animate-slide-up">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Microscope className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-lg font-black">Ultrasound Required</h3>
                      <p className="text-xs opacity-80">High risk detected. Upload scan to continue.</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-2 border border-white/20">
                    {patientData.ultrasoundImage ? (
                      <div className={`flex items-center justify-between p-4 rounded-xl ${isValidating ? 'bg-white/10' : validationResult?.valid ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        <div className="flex items-center gap-3">
                          {isValidating ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle2 className="w-6 h-6" />}
                          <span className="text-xs font-bold truncate max-w-[150px]">{patientData.ultrasoundImage.name}</span>
                        </div>
                        <button onClick={() => {set('ultrasoundImage', null); setValidationResult(null);}}><X size={16}/></button>
                      </div>
                    ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="w-full py-10 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/5 transition-all">
                        <Upload size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Select Scan</span>
                      </button>
                    )}
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageChange} />
                  </div>
                </div>
              ) : (
                <div className={`${clinicalResult.functional_status === 'normal' ? 'bg-green-500' : 'bg-amber-500'} rounded-[2rem] p-10 text-white shadow-lg text-center`}>
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-black mb-2">Diagnosis Complete</h3>
                  <p className="text-sm opacity-80 max-w-xs mx-auto">Status: {clinicalResult.functional_status}. No ultrasound required.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 px-4">
          <button onClick={prev} disabled={currentStep === 1 || currentStep === 4} className={`px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${currentStep === 1 || currentStep === 4 ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-100 text-gray-400 hover:text-primary'}`}>
            Back
          </button>

          {currentStep < 3 ? (
            <button onClick={next} className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest bg-gray-900 text-white shadow-md transition-all active:scale-95">
              Next Step
            </button>
          ) : currentStep === 3 ? (
            <button onClick={handleClinicalSubmit} disabled={isSubmitting} className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest bg-primary text-white shadow-md shadow-primary/20 transition-all active:scale-95">
              {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Run AI'}
            </button>
          ) : (
            clinicalResult && (clinicalResult.next_step === 'upload_ultrasound' || clinicalResult.next_step_details?.cancer_pipeline_triggered) ? (
              <button onClick={handleImageSubmit} disabled={!validationResult?.valid || isProcessingImage} className="px-12 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] bg-indigo-600 text-white shadow-lg active:scale-95">
                {isProcessingImage ? <Loader2 className="animate-spin w-5 h-5" /> : 'Process Image'}
              </button>
            ) : (
              <button onClick={() => navigate(`/patients/${patientIdStr}/dashboard?view=results`)} className="px-12 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] bg-green-500 text-white shadow-lg active:scale-95">
                Finish
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPatient;