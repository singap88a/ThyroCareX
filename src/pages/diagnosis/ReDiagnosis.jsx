import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, Weight, Ruler,
  Phone, MapPin, FileText, Upload, X,
  CircleCheck, Loader2, Brain,
  Activity, FlaskConical, Microscope, CheckCircle2,
  Pill
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import patientService from '../../services/patientService';
import testService from '../../services/testService';

const InputField = ({ label, field, icon: Icon, type = 'text', placeholder, step, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 dark:text-gray-500">{label}</label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type}
        step={step}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none transition-all duration-200 font-bold text-gray-700 placeholder:text-gray-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200"
      />
    </div>
  </div>
);

const Toggle = ({ label, field, icon: Icon, active, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(field, !active)}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 font-bold text-xs ${active
      ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
      : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30 dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-300'
      }`}
  >
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-gray-50 dark:bg-admin-dark-bg'}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
    </div>
    <span className="flex-1 text-left">{label}</span>
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-white bg-white' : 'border-gray-200 dark:border-gray-600'}`}>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
    </div>
  </button>
);

function resolveClinicalTestId(data) {
  if (!data) return null;
  return data.test_id ?? data.testId ?? null;
}

function normalizeGenderFromApi(g) {
  if (g === 1 || g === '1' || g === 'Male' || g === 'male') return 'male';
  if (g === 2 || g === '2' || g === 'Female' || g === 'female') return 'female';
  if (g === 0 || g === '0') return 'male';
  return '';
}

/**
 * Re-diagnosis uses the same 4-step flow and payloads as Add Patient:
 * identity → history → labs → clinical AI (+ optional ultrasound with ValidateImage + ProcessImage).
 */
const ReDiagnosis = ({ dashboardMode = false, onComplete, onPatientSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [patientRecord, setPatientRecord] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [testId, setTestId] = useState(null);
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

  const set = (field, value) => setPatientData((p) => ({ ...p, [field]: value }));

  const getAgeNumber = () => {
    const n = Number(patientData.age);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(120, Math.floor(n)));
  };

  useEffect(() => {
    const load = async () => {
      setLoadingPatient(true);
      try {
        const res = await patientService.getPatientById(id);
        if (res.succeeded && res.data) {
          const d = res.data;
          setPatientRecord(d);
          setPatientData((prev) => ({
            ...prev,
            fullName: d.fullName || '',
            age: d.age != null ? String(d.age) : '',
            gender: normalizeGenderFromApi(d.gender),
            height: d.height != null ? String(d.height) : '',
            weight: d.weight != null ? String(d.weight) : '',
            phone: d.phoneNumber || '',
            address: d.address || '',
            medicalHistory: d.medicalHistory || '',
            currentMedications: d.currentMedications || '',
            allergies: d.knownAllergies || '',
          }));
        }
      } catch (e) {
        console.error(e);
        toast.error('Failed to load patient');
      } finally {
        setLoadingPatient(false);
      }
    };
    load();
  }, [id]);

  const steps = [
    { id: 1, title: 'Identity', icon: User },
    { id: 2, title: 'History', icon: FileText },
    { id: 3, title: 'Labs', icon: FlaskConical },
    { id: 4, title: 'Report', icon: Brain },
  ];

  const validateStep = () => {
    if (currentStep === 1) {
      if (!patientData.fullName?.trim()) { toast.error('Full name is required'); return false; }
      if (!getAgeNumber()) { toast.error('Age is required'); return false; }
      if (!patientData.gender) { toast.error('Gender is required'); return false; }
      if (!patientData.phone?.trim()) { toast.error('Phone number is required'); return false; }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setCurrentStep((s) => Math.min(4, s + 1));
  };
  const prev = () => setCurrentStep((s) => Math.max(1, s - 1));

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

  const buildUpdateBody = () => ({
    patientID: parseInt(id, 10),
    fullName: patientData.fullName,
    email: patientRecord?.email || '',
    password: '',
    gender: patientData.gender === 'male' ? 1 : 2,
    age: getAgeNumber(),
    phoneNumber: patientData.phone,
    address: patientData.address || '',
    doctorID: patientRecord?.doctorID ?? 0,
    height: Number(patientData.height) || 0,
    weight: Number(patientData.weight) || 0,
    medicalHistory: patientData.medicalHistory || '',
    currentMedications: patientData.currentMedications || '',
    knownAllergies: patientData.allergies || '',
  });

  const handleClinicalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const upd = await patientService.updatePatient(id, buildUpdateBody());
      if (!upd.succeeded) {
        toast.error(upd.message || 'Failed to update patient');
        return;
      }
      if (onPatientSave) onPatientSave();

      const clinicalPayload = {
        patient_id: parseInt(id, 10),
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
        toast.error(clinicalRes.message || 'AI Error');
        return;
      }

      const tid = resolveClinicalTestId(clinicalRes.data);
      if (tid == null) {
        toast.error('Missing test ID from server / لم يُرجع الخادم رقم الفحص');
        return;
      }
      const clinical = clinicalRes.data?.clinical ?? clinicalRes.data;
      setTestId(tid);
      setClinicalResult(clinical);
      setCurrentStep(4);
      toast.success('Clinical analysis complete');
    } catch (err) {
      console.error(err);
      toast.error('Failed to run diagnosis');
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishFlow = (finalTestId) => {
    if (onComplete && finalTestId != null) {
      onComplete(finalTestId);
      return;
    }
    navigate(`/patients/${id}/dashboard?view=results&testId=${finalTestId}`);
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
        finishFlow(testId);
      } else {
        toast.error(imgRes.message || 'Image processing failed');
      }
    } catch (imgErr) {
      toast.error('Image processing error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  if (loadingPatient) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium dark:text-gray-400">Loading patient record...</p>
      </div>
    );
  }

  const shellClass = dashboardMode
    ? 'pb-10 pt-4 px-4 md:px-6'
    : 'min-h-screen bg-[#F9FAFB]';

  return (
    <div className={shellClass}>
      {!dashboardMode && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => navigate(`/patients/${id}/dashboard`)} className="p-2 rounded-xl hover:bg-gray-50">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">Re-Diagnosis</h1>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">Step {currentStep}/4</div>
          </div>
        </div>
      )}

      {dashboardMode && (
        <div className="mb-6 flex items-center justify-between px-1">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Re-diagnosis · same flow as new patient</p>
          <span className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">Step {currentStep}/4</span>
        </div>
      )}

      <div className={`${dashboardMode ? '' : 'max-w-4xl mx-auto px-6 py-10'}`}>
        <div className="flex items-start gap-2 mb-12 px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = currentStep > step.id;
            const active = currentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${done ? 'bg-primary border-primary text-white' :
                    active ? 'bg-white border-primary text-primary shadow-lg shadow-primary/10 dark:bg-admin-dark-card dark:border-primary' : 'bg-white border-gray-100 text-gray-300 dark:bg-admin-dark-hover dark:border-admin-dark-border'
                    }`}>
                    {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-gray-300 dark:text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 mt-5 h-[1px] bg-gray-100 dark:bg-admin-dark-border relative overflow-hidden">
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
              key="s1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 dark:bg-admin-dark-card dark:border-admin-dark-border"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" field="fullName" icon={User} placeholder="e.g. John Doe" value={patientData.fullName} onChange={set} />
                <InputField label="Age" field="age" type="number" icon={Calendar} placeholder="1-120" value={patientData.age} onChange={set} />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 dark:text-gray-500">Gender</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"><User className="w-4 h-4" /></div>
                    <select
                      value={patientData.gender}
                      onChange={(e) => set('gender', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200"
                    >
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
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4 dark:bg-admin-dark-card dark:border-admin-dark-border"
            >
              <textarea rows={4} placeholder="Medical History..." value={patientData.medicalHistory} onChange={(e) => set('medicalHistory', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200" />
              <textarea rows={3} placeholder="Current Medications..." value={patientData.currentMedications} onChange={(e) => set('currentMedications', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200" />
              <textarea rows={2} placeholder="Known Allergies..." value={patientData.allergies} onChange={(e) => set('allergies', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white focus:border-primary resize-none dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200" />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm dark:bg-admin-dark-card dark:border-admin-dark-border">
                <h3 className="text-xs font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2 dark:text-white"><FlaskConical className="w-4 h-4 text-teal-600" /> Lab Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { id: 'tsh', name: 'TSH', hint: '0.4-4.0' },
                    { id: 't3', name: 'T3', hint: '80-200' },
                    { id: 'tt4', name: 'TT4', hint: '4.5-12' },
                    { id: 'fti', name: 'FTI', hint: '8-18' },
                    { id: 't4u', name: 'T4U', hint: '0.7-1.2' },
                  ].map((f) => (
                    <div key={f.id} className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase">{f.name}</label>
                      <input
                        type="number"
                        step="0.001"
                        placeholder={f.hint}
                        value={patientData[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        className="w-full px-2 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700 text-center text-sm focus:bg-white focus:border-primary dark:bg-admin-dark-hover dark:border-admin-dark-border dark:text-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm dark:bg-admin-dark-card dark:border-admin-dark-border">
                <h3 className="text-xs font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2 dark:text-white"><Activity className="w-4 h-4 text-orange-600" /> Clinical Checks</h3>
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
              key="s4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={`p-8 rounded-[2rem] border shadow-sm bg-white dark:bg-admin-dark-card ${clinicalResult.risk_level === 'low' ? 'border-green-100 dark:border-green-900/40' : 'border-red-100 dark:border-red-900/40'}`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${clinicalResult.risk_level === 'low' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest dark:text-gray-500">AI Prediction</p>
                      <h2 className="text-2xl font-black text-gray-900 capitalize dark:text-white">{clinicalResult.functional_status}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest dark:text-gray-500">Confidence</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{((clinicalResult.model_confidence ?? 0) * 100).toFixed(1)}%</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {clinicalResult.probabilities && Object.entries(clinicalResult.probabilities).map(([key, val]) => (
                    <div key={key} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 dark:bg-admin-dark-hover dark:border-admin-dark-border">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[9px] font-black text-gray-400 uppercase">{key}</p>
                        <p className="text-[10px] font-black dark:text-gray-200">{((val) * 100).toFixed(1)}%</p>
                      </div>
                      <div className="h-1.5 bg-white rounded-full overflow-hidden border border-gray-100 dark:bg-admin-dark-bg dark:border-admin-dark-border">
                        <div className="h-full bg-primary" style={{ width: `${val * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 dark:bg-admin-dark-hover dark:border-admin-dark-border">
                  <p className="text-sm font-bold text-gray-700 italic dark:text-gray-200">&quot;{clinicalResult.clinical_recommendation}&quot;</p>
                </div>
              </div>

              {(clinicalResult.next_step === 'upload_ultrasound' || clinicalResult.next_step_details?.cancer_pipeline_triggered) ? (
                <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-lg animate-slide-up">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Microscope className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-lg font-black">Ultrasound Required</h3>
                      <p className="text-xs opacity-80">Same rule as new patient: validate scan, then process.</p>
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
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 1 || currentStep === 4}
            className={`px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${currentStep === 1 || currentStep === 4 ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-100 text-gray-400 hover:text-primary dark:bg-admin-dark-card dark:border-admin-dark-border'}`}
          >
            Back
          </button>

          {currentStep < 3 ? (
            <button type="button" onClick={next} className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest bg-gray-900 text-white shadow-md transition-all active:scale-95 dark:bg-primary">
              Next Step
            </button>
          ) : currentStep === 3 ? (
            <button type="button" onClick={handleClinicalSubmit} disabled={isSubmitting} className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest bg-primary text-white shadow-md shadow-primary/20 transition-all active:scale-95">
              {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Run AI'}
            </button>
          ) : (
            clinicalResult && (clinicalResult.next_step === 'upload_ultrasound' || clinicalResult.next_step_details?.cancer_pipeline_triggered) ? (
              <button type="button" onClick={handleImageSubmit} disabled={!validationResult?.valid || isProcessingImage} className="px-12 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] bg-indigo-600 text-white shadow-lg active:scale-95">
                {isProcessingImage ? <Loader2 className="animate-spin w-5 h-5" /> : 'Process Image'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (testId == null) {
                    toast.error('Missing test ID');
                    return;
                  }
                  finishFlow(testId);
                }}
                className="px-12 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] bg-green-500 text-white shadow-lg active:scale-95"
              >
                Finish
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReDiagnosis;
