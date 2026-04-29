import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Calendar, Activity, Clock,
  AlertCircle, CircleCheck, ChevronRight, Upload,
  RefreshCcw, History, FileText, Stethoscope,
  Brain, Zap, TrendingUp, Heart, Thermometer,
  Loader2, Scan, FlaskConical, Target, Shield, Save
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import patientService from '../../services/patientService';
import testService from '../../services/testService';
import ThyroidDiagnosisView from '../../components/diagnosis/ThyroidDiagnosisView';

const ReDiagnosis = ({ dashboardMode = false, onComplete, onPatientSave }) => {
  const { id } = useParams(); // patientID
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  
  // Patient form data (Step 1)
  const [patientFormData, setPatientFormData] = useState({
    fullName: '',
    age: '',
    gender: 1, // 1 for Male, 2 for Female
    phoneNumber: '',
    address: '',
    email: ''
  });

  // Clinical form data (Step 2 & 3)
  const [formData, setFormData] = useState({
    tsh: '', t3: '', tt4: '', fti: '', t4u: '',
    on_thyroxine: 0,
    thyroid_surgery: 0,
    query_hyperthyroid: 0,
    nodule_present: false,
    image: null
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const fetchPatient = async () => {
      try {
        const res = await patientService.getPatientById(id);
        if (res.succeeded) {
          setPatient(res.data);
          setPatientFormData({
            fullName: res.data.fullName || '',
            age: res.data.age || '',
            gender: res.data.gender || 1,
            phoneNumber: res.data.phoneNumber || '',
            address: res.data.address || '',
            email: res.data.email || ''
          });
        }
      } catch (err) {
        console.error('Failed to fetch patient', err);
      } finally {
        setLoadingPatient(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setPatientFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSavePatient = async () => {
    setIsLoading(true);
    try {
      const res = await patientService.updatePatient(id, {
        ...patientFormData,
        patientID: parseInt(id),
        age: parseInt(patientFormData.age),
        gender: parseInt(patientFormData.gender)
      });
      if (res.succeeded) {
        if (onPatientSave) onPatientSave();
        setCurrentStep(2);
      } else {
        alert(res.message || "Failed to update patient info");
      }
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 1. Process Clinical Data
      const clinicalReq = {
        patient_id: parseInt(id),
        tsh: parseFloat(formData.tsh) || 0,
        t3: parseFloat(formData.t3) || 0,
        tt4: parseFloat(formData.tt4) || 0,
        fti: parseFloat(formData.fti) || 0,
        t4u: parseFloat(formData.t4u) || 0,
        on_thyroxine: parseInt(formData.on_thyroxine),
        thyroid_surgery: parseInt(formData.thyroid_surgery),
        query_hyperthyroid: parseInt(formData.query_hyperthyroid)
      };

      const clinicalRes = await testService.processClinical(clinicalReq);
      
      if (clinicalRes.succeeded) {
        const testId = clinicalRes.data.testId;
        let finalData = clinicalRes.data;

        // 2. Process Image (if provided)
        if (formData.image) {
          const imageRes = await testService.processImage(testId, formData.image);
          if (imageRes.succeeded) {
            finalData = imageRes.data;
          }
        }

        // 3. Show Result
        if (onComplete) {
          onComplete(testId);
        } else {
          setDiagnosisResult(finalData);
          setCurrentStep(4);
        }
      }
    } catch (err) {
      console.error('Diagnosis failed', err);
      alert('An error occurred during diagnosis. Please check console.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingPatient) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading patient record...</p>
      </div>
    );
  }

  if (currentStep === 4 && diagnosisResult) {
    return (
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <CircleCheck className="text-green-500" /> Re-Diagnosis Successful
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate(`/patients/${id}/compare`)}
              className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
            >
              <History size={18} /> Compare History
            </button>
            <button 
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 bg-gray-100 dark:bg-admin-dark-hover text-gray-600 dark:text-gray-300 font-bold rounded-2xl transition-all"
            >
              Run New Diagnosis
            </button>
          </div>
        </div>
        <ThyroidDiagnosisView initialData={diagnosisResult} patientId={id} />
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Edit Patient', icon: User },
    { number: 2, title: 'Clinical Data', icon: Stethoscope },
    { number: 3, title: 'AI Analysis', icon: Brain }
  ];

  return (
    <div className={`min-h-screen ${dashboardMode ? '' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      <div className={`relative mx-auto sm:px-6 lg:px-8 ${dashboardMode ? 'max-w-full px-0 py-0' : 'max-w-6xl px-4 py-8'}`}>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-2xl shadow-sm">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <React.Fragment key={step.number}>
                  <div className={`flex items-center gap-3 transition-all ${isActive ? 'scale-105' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-admin-dark-hover text-gray-400'
                    }`}>
                      {isCompleted ? <CircleCheck className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-gray-400'}`}>Step {step.number}</p>
                      <p className={`text-sm font-bold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.title}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 rounded-full ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-100 dark:bg-admin-dark-border'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Patient Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {patientFormData.fullName?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">{patientFormData.fullName || 'Patient Name'}</h2>
                  <p className="text-sm text-gray-500">Patient ID: #{id}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl">
                  <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Activity size={12} /> Diagnostics Mode
                  </p>
                  <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Full Re-Diagnosis Cycle</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl text-gray-500">
                  <Clock size={16} />
                  <span className="text-xs font-bold">Session started: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Step Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-3xl shadow-sm space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                      <User className="text-primary" /> Update Patient Profile
                    </h3>
                    <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full">Editing Record</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                      <input 
                        type="text" name="fullName" value={patientFormData.fullName} onChange={handlePatientInputChange}
                        className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">Age</label>
                      <input 
                        type="number" name="age" value={patientFormData.age} onChange={handlePatientInputChange}
                        className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">Gender</label>
                      <select 
                        name="gender" value={patientFormData.gender} onChange={handlePatientInputChange}
                        className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold"
                      >
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">Phone Number</label>
                      <input 
                        type="text" name="phoneNumber" value={patientFormData.phoneNumber} onChange={handlePatientInputChange}
                        className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-4 text-gray-400 font-bold hover:text-primary transition-all"
                    >
                      Skip Updates
                    </button>
                    <button 
                      onClick={handleSavePatient} disabled={isLoading}
                      className="flex items-center gap-2 px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primaryHover transition-all disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                      Save & Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-3xl shadow-sm space-y-8"
                >
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <FlaskConical className="text-primary" /> Laboratory Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">TSH Level (mIU/L)</label>
                      <input type="number" name="tsh" value={formData.tsh} onChange={handleInputChange} className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold" placeholder="0.4 - 4.0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">T3 Level (ng/dL)</label>
                      <input type="number" name="t3" value={formData.t3} onChange={handleInputChange} className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold" placeholder="80 - 200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">TT4 Level (μg/dL)</label>
                      <input type="number" name="tt4" value={formData.tt4} onChange={handleInputChange} className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold" placeholder="5.1 - 14.1" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase ml-1">FTI Index</label>
                      <input type="number" name="fti" value={formData.fti} onChange={handleInputChange} className="w-full p-4 bg-gray-50 dark:bg-admin-dark-hover border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold" placeholder="Relative Index" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50 dark:border-admin-dark-border">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl cursor-pointer" onClick={() => setFormData(p => ({...p, on_thyroxine: p.on_thyroxine ? 0 : 1}))}>
                      <input type="checkbox" checked={formData.on_thyroxine === 1} readOnly className="w-5 h-5 accent-primary" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">On Thyroxine</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl cursor-pointer" onClick={() => setFormData(p => ({...p, thyroid_surgery: p.thyroid_surgery ? 0 : 1}))}>
                      <input type="checkbox" checked={formData.thyroid_surgery === 1} readOnly className="w-5 h-5 accent-primary" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Previous Surgery</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-admin-dark-hover rounded-2xl cursor-pointer" onClick={() => setFormData(p => ({...p, query_hyperthyroid: p.query_hyperthyroid ? 0 : 1}))}>
                      <input type="checkbox" checked={formData.query_hyperthyroid === 1} readOnly className="w-5 h-5 accent-primary" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Hyperthyroid?</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setCurrentStep(1)} className="px-6 py-3 text-gray-400 font-bold hover:text-primary transition-all">Back to Profile</button>
                    <button onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primaryHover transition-all">
                      Next: Image Upload <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white dark:bg-admin-dark-card border border-gray-200 dark:border-admin-dark-border rounded-3xl shadow-sm space-y-8"
                >
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <Brain className="text-primary" /> Ultrasound Image Analysis
                  </h3>
                  
                  <div className={`relative p-12 border-2 border-dashed rounded-[40px] text-center transition-all ${formData.image ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-admin-dark-border'}`}>
                    <input type="file" id="scan-upload" className="hidden" onChange={handleFileChange} accept="image/*" />
                    <label htmlFor="scan-upload" className="cursor-pointer block space-y-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
                        {formData.image ? <CircleCheck size={40} /> : <Upload size={40} />}
                      </div>
                      <div>
                        <p className="text-xl font-black text-gray-900 dark:text-white">{formData.image ? formData.image.name : 'Upload Ultrasound Scan'}</p>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto">Click to browse or drag and drop your ultrasound DICOM/JPG file here</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between pt-8">
                    <button onClick={() => setCurrentStep(2)} className="px-6 py-3 text-gray-400 font-bold hover:text-primary transition-all">Back to Metrics</button>
                    <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-primaryHover text-white font-black rounded-[24px] shadow-2xl shadow-primary/40 hover:scale-105 transition-all disabled:opacity-50">
                      {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : <Zap size={24} />}
                      {isLoading ? 'Processing Diagnosis...' : 'EXECUTE AI RE-DIAGNOSIS'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReDiagnosis;
