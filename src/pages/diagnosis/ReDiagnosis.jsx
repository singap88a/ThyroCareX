import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Calendar,
  Activity,
  Clock,
  AlertCircle,
  CircleCheck,
  ChevronRight,
  Upload,
  RefreshCcw,
  History,
  FileText,
  Stethoscope,
  Brain,
  Zap,
  TrendingUp,
  Heart,
  Thermometer
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ReDiagnosis = ({ dashboardMode = false, onComplete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState({
    symptoms: {},
    biomarkers: {},
    scans: []
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Mock patient data (in real app, fetch from API)
  const patientData = {
    id: id,
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@example.com",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bloodType: "O+",
    lastDiagnosis: {
      date: "2024-03-10",
      status: "MALIGNANT",
      condition: "Papillary Thyroid Carcinoma",
      confidence: 94.7,
      severity: "Moderate"
    },
    totalDiagnoses: 3
  };

  const symptoms = [
    { id: 'neck_swelling', label: 'Neck Swelling', icon: '🔴' },
    { id: 'difficulty_swallowing', label: 'Difficulty Swallowing', icon: '😣' },
    { id: 'voice_changes', label: 'Voice Changes', icon: '🗣️' },
    { id: 'fatigue', label: 'Fatigue', icon: '😴' },
    { id: 'weight_changes', label: 'Weight Changes', icon: '⚖️' },
    { id: 'heart_palpitations', label: 'Heart Palpitations', icon: '💓' },
    { id: 'temperature_sensitivity', label: 'Temperature Sensitivity', icon: '🌡️' },
    { id: 'anxiety', label: 'Anxiety/Nervousness', icon: '😰' }
  ];

  const handleSymptomChange = (symptomId, severity) => {
    setDiagnosisData(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptomId]: severity }
    }));
  };

  const handleBiomarkerChange = (marker, value) => {
    setDiagnosisData(prev => ({
      ...prev,
      biomarkers: { ...prev.biomarkers, [marker]: value }
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    if (onComplete) {
      onComplete();
    } else {
      // Navigate to comparison page
      navigate(`/patients/${id}/compare`);
    }
  };

  const steps = [
    { number: 1, title: 'Review Patient', icon: User },
    { number: 2, title: 'Update Symptoms', icon: Activity },
    { number: 3, title: 'Biomarkers', icon: Thermometer },
    { number: 4, title: 'AI Analysis', icon: Brain }
  ];

  return (
    <div className={`min-h-screen ${dashboardMode ? '' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      {!dashboardMode && (
        <>
          {/* Decorative Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </>
      )}

      <div className={`relative mx-auto sm:px-6 lg:px-8 ${dashboardMode ? 'max-w-full px-0 py-0' : 'max-w-6xl px-4 py-8'}`}>
        {/* Header */}
        {!dashboardMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center mb-4 text-gray-600 transition-colors hover:text-gray-900 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Patients
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                  <RefreshCcw className="w-8 h-8" />
                  Re-Diagnosis
                </h1>
                <p className="mt-2 text-gray-600">
                  Initiate a new diagnosis for comparison with previous results
                </p>
              </div>
              
              <Link
                to={`/patients/${id}/history`}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <History className="w-4 h-4" />
                View History ({patientData.totalDiagnoses})
              </Link>
            </div>
          </motion.div>
        )}

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all ${
                      isActive ? 'scale-105' : ''
                    }`}
                    onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CircleCheck className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                        Step {step.number}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Patient Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Patient Card */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={patientData.img}
                  alt={patientData.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{patientData.name}</h2>
                  <p className="text-gray-500">{patientData.age} years • {patientData.gender}</p>
                  <p className="text-sm text-gray-400">ID: {patientData.id}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Blood Type</span>
                  <span className="font-semibold text-gray-800">{patientData.bloodType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Total Diagnoses</span>
                  <span className="font-semibold text-gray-800">{patientData.totalDiagnoses}</span>
                </div>
              </div>
            </div>

            {/* Last Diagnosis Summary */}
            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-semibold">Previous Diagnosis</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-white/70 text-sm">Condition</p>
                  <p className="font-bold text-lg">{patientData.lastDiagnosis.condition}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Status</p>
                    <p className="font-semibold">{patientData.lastDiagnosis.status}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Confidence</p>
                    <p className="font-semibold">{patientData.lastDiagnosis.confidence}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-white/20">
                  <Calendar className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white/70">{patientData.lastDiagnosis.date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Review Patient */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <User className="w-7 h-7 text-primary" />
                    Confirm Patient Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">Before starting re-diagnosis</p>
                          <p className="text-sm text-primary/70 mt-1">
                            Please verify that the patient information is correct and that they have completed 
                            any recommended treatments since the last diagnosis on {patientData.lastDiagnosis.date}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="text-sm text-gray-500">Full Name</label>
                        <p className="font-semibold text-gray-800">{patientData.name}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="text-sm text-gray-500">Age</label>
                        <p className="font-semibold text-gray-800">{patientData.age} years</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="text-sm text-gray-500">Gender</label>
                        <p className="font-semibold text-gray-800">{patientData.gender}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="text-sm text-gray-500">Blood Type</label>
                        <p className="font-semibold text-gray-800">{patientData.bloodType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <input 
                        type="checkbox" 
                        id="confirm" 
                        className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="confirm" className="text-green-800">
                        I confirm that the patient information is correct and consent has been obtained
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2 px-6 py-3 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Update Symptoms */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Activity className="w-7 h-7 text-primary" />
                    Current Symptoms Assessment
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Rate the severity of each symptom (0 = None, 5 = Severe)
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {symptoms.map((symptom) => (
                      <div 
                        key={symptom.id}
                        className="p-4 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{symptom.icon}</span>
                          <span className="font-medium text-gray-800">{symptom.label}</span>
                        </div>
                        <div className="flex gap-2">
                          {[0, 1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleSymptomChange(symptom.id, level)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                diagnosisData.symptoms[symptom.id] === level
                                  ? level === 0 ? 'bg-green-500 text-white' :
                                    level <= 2 ? 'bg-yellow-500 text-white' :
                                    'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-2 px-6 py-3 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Biomarkers */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Thermometer className="w-7 h-7 text-primary" />
                    Current Biomarkers
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Enter the latest lab results for thyroid function tests
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'tsh', label: 'TSH', unit: 'mIU/L', normal: '0.4 - 4.0', placeholder: 'e.g., 2.5' },
                      { id: 't4', label: 'T4 (Thyroxine)', unit: 'μg/dL', normal: '4.5 - 12.0', placeholder: 'e.g., 8.0' },
                      { id: 't3', label: 'T3 (Triiodothyronine)', unit: 'ng/dL', normal: '80 - 200', placeholder: 'e.g., 120' },
                      { id: 'calcitonin', label: 'Calcitonin', unit: 'pg/mL', normal: '0 - 10', placeholder: 'e.g., 5' },
                      { id: 'thyroglobulin', label: 'Thyroglobulin', unit: 'ng/mL', normal: '0 - 40', placeholder: 'e.g., 20' },
                      { id: 'tpo', label: 'TPO Antibodies', unit: 'IU/mL', normal: '< 35', placeholder: 'e.g., 15' }
                    ].map((marker) => (
                      <div key={marker.id} className="p-4 border border-gray-200 rounded-xl">
                        <label className="block mb-2">
                          <span className="font-medium text-gray-800">{marker.label}</span>
                          <span className="text-sm text-gray-500 ml-2">({marker.unit})</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder={marker.placeholder}
                          value={diagnosisData.biomarkers[marker.id] || ''}
                          onChange={(e) => handleBiomarkerChange(marker.id, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2">Normal: {marker.normal}</p>
                      </div>
                    ))}
                  </div>

                  {/* Upload Scans */}
                  <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-700">Upload New Scan Images</p>
                    <p className="text-sm text-gray-500 mt-1">Drag & drop or click to upload ultrasound images</p>
                    <button className="mt-4 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                      Select Files
                    </button>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="flex items-center gap-2 px-6 py-3 text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: AI Analysis */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Brain className="w-7 h-7 text-primary" />
                    AI Analysis
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Summary Card */}
                    <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Data Summary
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-primary">
                            {Object.keys(diagnosisData.symptoms).filter(k => diagnosisData.symptoms[k] > 0).length}
                          </p>
                          <p className="text-sm text-gray-500">Active Symptoms</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-primary">
                            {Object.keys(diagnosisData.biomarkers).filter(k => diagnosisData.biomarkers[k]).length}
                          </p>
                          <p className="text-sm text-gray-500">Biomarkers</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            {diagnosisData.scans.length}
                          </p>
                          <p className="text-sm text-gray-500">Scans Uploaded</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">v3.2.1</p>
                          <p className="text-sm text-gray-500">AI Model</p>
                        </div>
                      </div>
                    </div>

                    {/* What will happen */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800">What happens next:</h3>
                      {[
                        { icon: Zap, text: 'AI will analyze all provided data in seconds' },
                        { icon: TrendingUp, text: 'Compare results with previous diagnosis' },
                        { icon: Stethoscope, text: 'Generate progress report and recommendations' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <input 
                        type="checkbox" 
                        id="aiConsent" 
                        className="w-5 h-5 mt-0.5 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="aiConsent" className="text-yellow-800 text-sm">
                        I understand that AI-assisted diagnosis is meant to support clinical decision-making 
                        and should not replace professional medical judgment. The results will be reviewed 
                        by a qualified healthcare provider.
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-8 py-3 text-white bg-gradient-to-r from-primary to-primaryHover rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5" />
                          Start AI Analysis
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReDiagnosis;
