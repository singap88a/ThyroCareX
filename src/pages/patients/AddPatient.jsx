import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Calendar,
  Weight,
  Ruler,
  Phone,
  MapPin,
  FileText,
  Activity,
  Upload,
  Save,
  Send,
  X,
  CircleCheck,
  AlertCircle
} from 'lucide-react';

const AddPatient = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [toasts, setToasts] = useState([]);
  const [patientData, setPatientData] = useState({
    // Basic Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    phone: "",
    address: "",
    
    // Medical History
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    
    // Symptoms
    symptoms: {},
    
    // Lab Results
    tsh: "",
    t3: "",
    t4: "",
    otherTests: "",
    
    // Imaging
    imagingResults: "",
    uploadedFiles: []
  });

  const symptoms = [
    { id: "fatigue", name: "Fatigue", category: "General" },
    { id: "weightGain", name: "Weight Gain", category: "Weight" },
    { id: "weightLoss", name: "Weight Loss", category: "Weight" },
    { id: "coldIntolerance", name: "Cold Intolerance", category: "Thermal" },
    { id: "heatIntolerance", name: "Heat Intolerance", category: "Thermal" },
    { id: "hairLoss", name: "Hair Loss", category: "Dermatological" },
    { id: "dryMain", name: "Dry Skin", category: "Dermatological" },
    { id: "constipation", name: "Constipation", category: "Digestive" },
    { id: "diarrhea", name: "Diarrhea", category: "Digestive" },
    { id: "heartPalpitations", name: "Heart Palpitations", category: "Cardiac" },
    { id: "anxiety", name: "Anxiety", category: "Psychological" },
    { id: "depression", name: "Depression", category: "Psychological" },
    { id: "musclePain", name: "Muscle Pain", category: "Muscular" },
    { id: "tremor", name: "Tremor", category: "Neurological" },
    { id: "sleepProblems", name: "Sleep Problems", category: "Sleep" }
  ];

  const showToast = (title, description, type = 'success') => {
    const id = Date.now();
    const newToast = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleSymptomChange = (symptomId, severity) => {
    setPatientData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptomId]: severity
      }
    }));
  };

  const calculateBMI = () => {
    const height = parseFloat(patientData.height);
    const weight = parseFloat(patientData.weight);
    if (height && weight) {
      return (weight / ((height / 100) ** 2)).toFixed(1);
    }
    return "";
  };

  const calculateAge = () => {
    if (patientData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(patientData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return "";
  };

  const handleSubmit = () => {
    showToast("Patient data saved successfully", "Data will be analyzed and results displayed soon");
    setTimeout(() => {
      navigate("/diagnosis-results", { state: { patientData } });
    }, 1500);
  };

  const saveDraft = () => {
    showToast("Draft saved", "You can return to complete the data later");
  };

  const steps = [
    { id: 1, title: "Basic Information", icon: User },
    { id: 2, title: "Medical History", icon: FileText },
    { id: 3, title: "Symptoms", icon: Activity },
    { id: 4, title: "Tests & Scans", icon: Upload }
  ];

  const getBMIStatus = (bmi) => {
    if (!bmi) return '';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { status: 'Underweight', color: 'text-yellow-600' };
    if (bmiValue < 25) return { status: 'Normal weight', color: 'text-green-600' };
    if (bmiValue < 30) return { status: 'Overweight', color: 'text-orange-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  const bmi = calculateBMI();
  const bmiStatus = getBMIStatus(bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Toast Notifications */}
      <div className="fixed space-y-2 z-[600] top-4 right-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === 'error' 
                ? 'bg-red-50 border-r-4 border-red-500 text-red-800' 
                : 'bg-green-50 border-r-4 border-green-500 text-green-800'
            }`}
            style={{ minWidth: '300px' }}
          >
            <div className="flex-shrink-0">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CircleCheck className="w-5 h-5 text-green-500" />
              )}
            </div>
            <div className="ml-3">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-sm">{toast.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
                <p className="text-gray-600">Enter patient data for diagnosis</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={saveDraft}
                className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 shadow-sm rounded-xl hover:bg-gray-50"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500 text-white shadow-lg scale-110"
                        : "border-gray-300 text-gray-400 bg-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <div className={`font-medium transition-colors duration-300 ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight
                      className={`w-12 h-6 mx-4 transition-all duration-500 ${
                        currentStep > step.id
                          ? "text-primary"
                          : "text-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="overflow-hidden border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>
              <p className="mt-1 text-gray-600">Enter patient's basic personal information</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Patient full name"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) => setPatientData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {calculateAge() && (
                    <div className="inline-block px-3 py-1 mt-2 text-sm text-blue-700 rounded-lg bg-blue-50">
                      Age: {calculateAge()} years
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
                  <select 
                    value={patientData.gender}
                    onChange={(e) => setPatientData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="170"
                    value={patientData.height}
                    onChange={(e) => setPatientData(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="70"
                    value={patientData.weight}
                    onChange={(e) => setPatientData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {bmi && (
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="px-3 py-1 text-sm text-gray-700 rounded-lg bg-gray-50">
                        BMI: {bmi}
                      </div>
                      <div className={`text-sm font-medium ${bmiStatus.color}`}>
                        {bmiStatus.status}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="01234567890"
                    value={patientData.phone}
                    onChange={(e) => setPatientData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Address (Optional)</label>
                  <input
                    type="text"
                    placeholder="Patient address"
                    value={patientData.address}
                    onChange={(e) => setPatientData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medical History */}
        {currentStep === 2 && (
          <div className="overflow-hidden border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Medical History</h2>
              </div>
              <p className="mt-1 text-gray-600">Important medical information about the patient</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Medical History</label>
                <textarea
                  placeholder="Mention previous diseases, surgeries, or any medical conditions in family history..."
                  value={patientData.medicalHistory}
                  onChange={(e) => setPatientData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Current Medications</label>
                <textarea
                  placeholder="List all medications the patient is currently taking with doses..."
                  value={patientData.currentMedications}
                  onChange={(e) => setPatientData(prev => ({ ...prev, currentMedications: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Known Allergies</label>
                <textarea
                  placeholder="List any known allergies to medications, food, or other substances..."
                  value={patientData.allergies}
                  onChange={(e) => setPatientData(prev => ({ ...prev, allergies: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Symptoms */}
        {currentStep === 3 && (
          <div className="overflow-hidden border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Activity className="w-6 h-6 mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Symptoms</h2>
              </div>
              <p className="mt-1 text-gray-600">Select existing symptoms and their severity (1-10)</p>
            </div>
            <div className="p-6">
              <div className="pl-2 space-y-4 overflow-y-auto max-h-96">
                {symptoms.map((symptom) => (
                  <div 
                    key={symptom.id} 
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      patientData.symptoms[symptom.id] > 0 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={patientData.symptoms[symptom.id] > 0}
                          onChange={(e) => {
                            handleSymptomChange(symptom.id, e.target.checked ? 5 : 0);
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">{symptom.name}</span>
                          <span className="px-2 py-1 ml-2 text-xs text-gray-700 bg-gray-200 rounded-full">
                            {symptom.category}
                          </span>
                        </div>
                      </div>
                      {patientData.symptoms[symptom.id] > 0 && (
                        <div className="text-sm font-medium text-blue-600">
                          {patientData.symptoms[symptom.id]}/10
                        </div>
                      )}
                    </div>
                    {patientData.symptoms[symptom.id] > 0 && (
                      <div className="mt-3 ml-6">
                        <input
                          type="range"
                          value={patientData.symptoms[symptom.id] || 0}
                          onChange={(e) => handleSymptomChange(symptom.id, parseInt(e.target.value))}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Mild</span>
                          <span>Moderate</span>
                          <span>Severe</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Lab Results and Imaging */}
        {currentStep === 4 && (
          <div className="overflow-hidden border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Upload className="w-6 h-6 mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Tests & Scans</h2>
              </div>
              <p className="mt-1 text-gray-600">Enter laboratory test results and imaging scans</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Thyroid Tests</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TSH (mIU/L)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.5 - 4.5"
                      value={patientData.tsh}
                      onChange={(e) => setPatientData(prev => ({ ...prev, tsh: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">T3 (ng/dL)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="80 - 200"
                      value={patientData.t3}
                      onChange={(e) => setPatientData(prev => ({ ...prev, t3: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">T4 (μg/dL)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="4.5 - 12"
                      value={patientData.t4}
                      onChange={(e) => setPatientData(prev => ({ ...prev, t4: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Other Tests</label>
                    <textarea
                      placeholder="Any other tests like antibodies, calcium, etc..."
                      value={patientData.otherTests}
                      onChange={(e) => setPatientData(prev => ({ ...prev, otherTests: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Imaging Scans</label>
                    <textarea
                      placeholder="Ultrasound, CT scan results, or other imaging findings..."
                      value={patientData.imagingResults}
                      onChange={(e) => setPatientData(prev => ({ ...prev, imagingResults: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Upload Files (Optional)</label>
                <div className="p-8 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-600">
                    Drag files here or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG up to 10MB
                  </p>
                  <input type="file" multiple className="hidden" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Analyze Data</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AddPatient;