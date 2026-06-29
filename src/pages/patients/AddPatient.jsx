import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, User, Calendar, Weight, Ruler,
  Phone, MapPin, FileText, Upload, Send, X,
  CircleCheck, AlertCircle, Loader2, Brain,
  Activity, FlaskConical, Microscope, Info, CheckCircle2, AlertTriangle, Fingerprint,
  Pill, HeartPulse, ClipboardList, RotateCcw, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import patientService from '../../services/patientService';
import testService from '../../services/testService';
import api from '../../services/api';

// --- Sub-components (Moved outside to fix focus issue) ---

const InputField = ({ label, field, icon: Icon, type = "text", placeholder, step, value, onChange, autoComplete = "on", inputClassName = "py-2.5", inputMode, pattern }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        name={field}
        id={field}
        autoComplete={autoComplete}
        type={type}
        step={step}
        inputMode={inputMode}
        pattern={pattern}
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange(field, e.target.value)}
        className={`w-full pl-10 pr-4 ${inputClassName} bg-white border-2 border-slate-300 shadow-sm rounded-xl outline-none transition-all duration-200 font-bold text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 text-sm`}
      />
    </div>
  </div>
);

const Toggle = ({ label, field, icon: Icon, active, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(field, !active)}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 font-bold text-xs ${active
      ? 'bg-primary border-primary text-white shadow-md shadow-primary/30'
      : 'bg-white border-slate-300 text-slate-700 shadow-sm hover:border-primary/50 hover:shadow-md'
      }`}
  >
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
    </div>
    <span className="flex-1 text-left">{label}</span>
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-white bg-white' : 'border-slate-300'}`}>
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
    ultrasoundImages: [],
  });

  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

  // --- Auth & Subscription Check ---
  useEffect(() => {
    const checkAuthAndSub = async () => {
      const userStr = localStorage.getItem('thyrax_user');
      if (!userStr) {
        setIsAuth(false);
        return;
      }
      try {
        const u = JSON.parse(userStr);
        const historyRes = await api.get('/Payment/history');
        if (historyRes.data?.succeeded) {
          const myTxs = historyRes.data.data.filter(tx => tx.doctorEmail === u.email);
          const active = myTxs.find(tx => {
            const statusStr = String(tx.status).toLowerCase();
            if (statusStr !== 'paid' && statusStr !== '2') return false;
            if (!tx.startDate) return false;
            const end = new Date(tx.startDate);
            end.setDate(end.getDate() + (tx.durationInDays || 30));
            return end > new Date();
          });
          if (!active) {
            setIsSubscribed(false);
          }
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setIsSubscribed(false);
        } else if (err.response?.status === 401) {
          setIsAuth(false);
        }
      }
    };
    checkAuthAndSub();
  }, []);

  // --- Persistence Logic ---
  useEffect(() => {
    const saved = localStorage.getItem('thyrocare_active_diagnosis');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPatientData(parsed.patientData || patientData);
        setCurrentStep(parsed.currentStep || 1);
        setPatientIdStr(parsed.patientIdStr || null);
        setTestId(parsed.testId || null);
        setClinicalResult(parsed.clinicalResult || null);
        if (parsed.currentStep > 1) {
          toast('Resuming active diagnosis session', { icon: '🔄' });
        }
      } catch (e) {
        console.error("Failed to load persistence", e);
      }
    }
  }, []);

  useEffect(() => {
    const state = {
      patientData: { ...patientData, ultrasoundImages: [] }, // Don't save binary files
      currentStep,
      patientIdStr,
      testId,
      clinicalResult
    };
    localStorage.setItem('thyrocare_active_diagnosis', JSON.stringify(state));
  }, [patientData, currentStep, patientIdStr, testId, clinicalResult]);

  const clearProgress = () => {
    localStorage.removeItem('thyrocare_active_diagnosis');
    window.location.reload();
  };

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
      if (!patientData.fullName?.trim()) { toast.error('Full name is required / الاسم بالكامل مطلوب'); return false; }
      if (!getAgeNumber()) { toast.error('Age is required / العمر مطلوب'); return false; }
      if (!patientData.gender) { toast.error('Gender is required / النوع مطلوب'); return false; }
      if (!patientData.height) { toast.error('Height is required / الطول مطلوب'); return false; }
      if (!patientData.weight) { toast.error('Weight is required / الوزن مطلوب'); return false; }
      if (!patientData.phone?.trim()) { toast.error('Phone number is required / رقم الهاتف مطلوب'); return false; }
      if (!patientData.address?.trim()) { toast.error('Address is required / العنوان مطلوب'); return false; }
    }
    if (currentStep === 2) {
      if (!patientData.medicalHistory?.trim()) { toast.error('Medical History is required / التاريخ المرضي مطلوب'); return false; }
      if (!patientData.currentMedications?.trim()) { toast.error('Current Medications are required / الأدوية الحالية مطلوبة'); return false; }
      if (!patientData.allergies?.trim()) { toast.error('Allergies are required / الحساسية مطلوبة'); return false; }
    }
    if (currentStep === 3) {
      const requiredLabs = ['tsh', 't3', 'tt4', 'fti', 't4u'];
      for (let lab of requiredLabs) {
         if (!patientData[lab]) { toast.error(`${lab.toUpperCase()} is required / مطلوب`); return false; }
      }
    }
    return true;
  };

  const next = () => { if (validateStep()) setCurrentStep(s => Math.min(4, s + 1)); };
  const prev = () => setCurrentStep(s => Math.max(1, s - 1));

  const imageModelCaption = 'Image validation model / موديل التحقق من الصورة';

  const removeImage = (indexToRemove) => {
    const updated = patientData.ultrasoundImages.filter((_, i) => i !== indexToRemove);
    set('ultrasoundImages', updated);

    if (updated.length === 0) {
      setValidationResult(null);
      return;
    }

    if (validationResult?.results) {
      const newResults = validationResult.results.filter((_, i) => i !== indexToRemove);
      const allValid = newResults.every(r => r.is_ultrasound);

      if (allValid) {
        setValidationResult({
          valid: true,
          message: 'Verified',
          userMessageAr: 'جميع الصور مقبولة كصور طبية (موجات فوق صوتية).',
          userMessageEn: 'All images accepted as medical ultrasound images.',
          results: newResults
        });
      } else {
        setValidationResult({
          valid: false,
          message: 'Invalid',
          userMessageAr: 'تنبيه: يوجد صور غير صالحة. يرجى حذف الصور التي بجانبها علامة ✖.',
          userMessageEn: 'Warning: Invalid images detected. Please remove the ones marked with ✖.',
          backendMessage: 'Invalid images detected',
          results: newResults
        });
      }
    }
  };

  const handleImageChange = async (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    const allFiles = [...(patientData.ultrasoundImages || []), ...newFiles];
    set('ultrasoundImages', allFiles);
    setValidationResult(null);
    setIsValidating(true);

    try {
      const res = await testService.validateImage(allFiles);
      if (res.succeeded && Array.isArray(res.data)) {
        const allValid = res.data.every(r => r.is_ultrasound);

        if (allValid && res.data.length > 0) {
          setValidationResult({
            valid: true,
            message: 'Verified',
            userMessageAr: 'جميع الصور مقبولة كصور طبية (موجات فوق صوتية).',
            userMessageEn: 'All images accepted as medical ultrasound images.',
            results: res.data
          });
          toast.success('Images verified / تم التحقق من الصور');
        } else {
          setValidationResult({
            valid: false,
            message: 'Invalid',
            userMessageAr: 'تنبيه: يوجد صور غير صالحة ولا تعتبر صور موجات فوق صوتية طبية. يرجى حذف الصور التي بجانبها علامة ✖.',
            userMessageEn: 'Warning: Some images are not valid medical ultrasound scans. Please remove the ones marked with ✖.',
            backendMessage: 'Invalid images detected',
            results: res.data
          });
          toast.error('Invalid image(s) / يوجد صور غير طبية');
        }
      } else {
        setValidationResult({
          valid: false,
          message: 'Error',
          userMessageAr: 'الرد من السيرفر غير متوقع.',
          userMessageEn: 'Unexpected server response.',
        });
        toast.error('Validation request failed');
      }
    } catch (err) {
      setValidationResult({
        valid: false,
        message: 'Error',
        userMessageAr: 'تعذر تشغيل موديل التحقق من الصورة. حاول مرة أخرى. ' + (err.response?.status || err.message),
        userMessageEn: 'Could not run the image validation model. Please try again. ' + (err.response?.status || err.message),
        backendMessage: typeof err.response?.data === 'object' ? JSON.stringify(err.response?.data) : String(err.response?.data || err.message)
      });
      toast.error('Validation request failed');
    } finally {
      setIsValidating(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
        patient_id: String(pId),
        Age: getAgeNumber(),
        on_thyroxine: patientData.onThyroxine ? 1 : 0,
        thyroid_surgery: patientData.thyroidSurgery ? 1 : 0,
        query_hyperthyroid: patientData.queryHyperthyroid ? 1 : 0,
        TSH: patientData.tsh ? parseFloat(patientData.tsh) : 0,
        T3: patientData.t3 ? parseFloat(patientData.t3) : 0,
        TT4: patientData.tt4 ? parseFloat(patientData.tt4) : 0,
        FTI: patientData.fti ? parseFloat(patientData.fti) : 0,
        T4U: patientData.t4u ? parseFloat(patientData.t4u) : 0,
        nodule_present: patientData.nodulePresent || false,
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
    if (!validationResult?.valid || !patientData.ultrasoundImages?.length) {
      toast.error('Valid ultrasound image required / مطلوب صورة موجات فوق صوتية صالحة');
      return;
    }

    setIsProcessingImage(true);
    try {
      const imgRes = await testService.processImage(testId, patientData.ultrasoundImages);
      if (imgRes.succeeded) {
        toast.success('Diagnosis complete / اكتمل التشخيص');
        localStorage.removeItem('thyrocare_active_diagnosis'); // Clear upon completion
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

      {/* Unauthenticated Overlay */}
      {!isAuth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-primary/20 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-[6px] border-red-50/50">
              <User className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-3">Login Required</h2>
            <p className="text-slate-600 mb-8 font-medium">
              You must be logged in to add a new patient and run AI diagnostics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="w-full px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Locked Overlay */}
      {isAuth && !isSubscribed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-primary/20 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 relative border-[6px] border-amber-50/50">
              <Brain className="w-10 h-10 text-amber-500" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-3">Subscription Required</h2>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
              You need an active subscription to add new patients and access the AI medical diagnostic features.
            </p>
            <div className="flex flex-col gap-4 justify-center">
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full px-8 py-4 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                View Subscription Plans
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/patients')} className="p-2 rounded-xl hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Add Patient</h1>
          </div>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={clearProgress}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black text-red-500 hover:bg-red-50 uppercase transition-colors"
                title="Discard progress and start fresh"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
            <div className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">Step {currentStep}/4</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Professional Stepper */}
        <div className="flex items-start justify-between mb-16 px-2 md:px-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = currentStep > step.id;
            const active = currentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                {/* Step Node */}
                <div className="flex flex-col items-center gap-4 relative z-10 w-20 shrink-0">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ease-out ${
                    done ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' :
                    active ? 'bg-white border-primary text-primary shadow-xl shadow-primary/20 ring-4 ring-primary/20 scale-110' : 
                    'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {done ? <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    active ? 'text-primary' : done ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>

                {/* Connector with Directional Arrow */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 mt-2.5 md:mt-3 flex items-center px-1 md:px-4">
                    <div className="w-full relative flex items-center justify-center">
                      {/* Track Background */}
                      <div className="absolute inset-x-0 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        {/* Track Fill */}
                        <div className={`absolute inset-y-0 left-0 bg-primary transition-all duration-700 ease-out rounded-full ${currentStep > step.id ? 'w-full' : 'w-0'}`} />
                      </div>
                      {/* Center Arrow Indicator */}
                      <div className={`relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-white border-2 ${
                        currentStep > step.id ? 'border-primary text-primary shadow-md shadow-primary/20 scale-110' : 'border-slate-200 text-slate-300'
                      }`}>
                        <ArrowRight className="w-4 h-4 md:w-4 md:h-4" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.form
              key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onSubmit={e => { e.preventDefault(); next(); }}
              className="bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl shadow-slate-300/40 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" field="fullName" autoComplete="name" icon={User} placeholder="e.g. John Doe" value={patientData.fullName} onChange={set} />
                <InputField label="Age" field="age" autoComplete="off" type="number" icon={Calendar} placeholder="1-120" value={patientData.age} onChange={set} inputClassName="py-2.5 hide-arrows" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider ml-1">Gender</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><User className="w-4 h-4" /></div>
                    <select name="gender" value={patientData.gender} onChange={e => set('gender', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 shadow-sm rounded-xl outline-none font-bold text-slate-900 text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <InputField label="Height (cm)" field="height" type="number" icon={Ruler} placeholder="175" value={patientData.height} onChange={set} inputClassName="py-2.5 hide-arrows" />
                <InputField label="Weight (kg)" field="weight" type="number" icon={Weight} placeholder="70" value={patientData.weight} onChange={set} inputClassName="py-2.5 hide-arrows" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Phone" field="phone" autoComplete="tel" icon={Phone} placeholder="01XXXXXXXXX" value={patientData.phone} onChange={set} />
                <InputField label="Address" field="address" autoComplete="address-line1" icon={MapPin} placeholder="City, Street..." value={patientData.address} onChange={set} />
              </div>
              {/* Hidden submit button to allow Enter key submission */}
              <button type="submit" className="hidden">Submit</button>
            </motion.form>
          )}

          {currentStep === 2 && (
            <motion.div
              key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl shadow-slate-300/40 space-y-4"
            >
              <InputField
                label="Medical History"
                field="medicalHistory"
                autoComplete="on"
                icon={ClipboardList}
                placeholder="Medical History..."
                value={patientData.medicalHistory}
                onChange={set}
                inputClassName="py-4"
              />
              <InputField
                label="Current Medications"
                field="currentMedications"
                autoComplete="on"
                icon={Pill}
                placeholder="Current Medications..."
                value={patientData.currentMedications}
                onChange={set}
                inputClassName="py-4"
              />
              <InputField
                label="Known Allergies"
                field="allergies"
                autoComplete="on"
                icon={AlertTriangle}
                placeholder="Known Allergies..."
                value={patientData.allergies}
                onChange={set}
                inputClassName="py-4"
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl shadow-slate-300/40">
                <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2"><FlaskConical className="w-4 h-4 text-primary" /> Lab Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { id: 'tsh', name: 'TSH', hint: '0.4-4.0' },
                    { id: 't3', name: 'T3', hint: '80-200' },
                    { id: 'tt4', name: 'TT4', hint: '4.5-12' },
                    { id: 'fti', name: 'FTI', hint: '8-18' },
                    { id: 't4u', name: 'T4U', hint: '0.7-1.2' }
                  ].map(f => (
                    <div key={f.id} className="space-y-1.5">
                      <label className="text-xs font-black text-slate-900 uppercase tracking-widest">{f.name}</label>
                      <input type="number" step="0.001" placeholder={f.hint} value={patientData[f.id]} onChange={e => set(f.id, e.target.value)}
                        className="w-full px-2 py-3 bg-white border-2 border-slate-300 shadow-sm rounded-xl outline-none font-bold text-slate-900 text-center text-sm placeholder:text-slate-300 placeholder:font-normal focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl shadow-slate-300/40">
                <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2"><Activity className="w-4 h-4 text-orange-500" /> Clinical Checks</h3>
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

                  {validationResult && (
                    <div
                      className={`mb-4 rounded-2xl p-4 border text-sm ${validationResult.valid
                        ? 'bg-emerald-500/20 border-emerald-300/40 text-emerald-50'
                        : 'bg-red-600/25 border-red-300/40 text-white'
                        }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-90 mb-2">{imageModelCaption}</p>
                      <p className="font-bold leading-relaxed">{validationResult.userMessageAr}</p>
                      <p className="mt-2 text-xs opacity-90 leading-relaxed">{validationResult.userMessageEn}</p>
                      {!validationResult.valid && validationResult.backendMessage && (
                        <p className="mt-2 text-[11px] font-mono opacity-80 border-t border-white/20 pt-2">{validationResult.backendMessage}</p>
                      )}
                    </div>
                  )}

                  <div className="bg-white/10 rounded-2xl p-2 border border-white/20">
                    {patientData.ultrasoundImages?.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {patientData.ultrasoundImages.map((img, i) => {
                          const isImgValid = validationResult?.results ? validationResult.results[i]?.is_ultrasound : true;
                          return (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${isValidating ? 'bg-white/10' : (isImgValid) ? 'bg-green-500/20' : 'bg-red-500/40'}`}>
                              <div className="flex items-center gap-3">
                                {isValidating ? <Loader2 className="animate-spin w-5 h-5" /> : (isImgValid) ? <CheckCircle2 className="w-6 h-6 text-green-300" /> : <X className="w-6 h-6 text-red-300" />}
                                <span className="text-xs font-bold truncate max-w-[150px]">{img.name}</span>
                              </div>
                              <button type="button" onClick={() => removeImage(i)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X size={16} /></button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/5 transition-all">
                      <Upload size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{patientData.ultrasoundImages?.length > 0 ? 'Add more images / إضافة صور أخرى' : 'Select Scans'}</span>
                    </button>
                    <input ref={fileInputRef} type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
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