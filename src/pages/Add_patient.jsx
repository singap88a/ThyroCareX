import React, { useState } from 'react';
import { 
  ArrowLeft, 
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
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AddPatient = () => {
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
    { id: "fatigue", name: "تعب وإرهاق", category: "عام" },
    { id: "weightGain", name: "زيادة الوزن", category: "وزن" },
    { id: "weightLoss", name: "فقدان الوزن", category: "وزن" },
    { id: "coldIntolerance", name: "عدم تحمل البرد", category: "حراري" },
    { id: "heatIntolerance", name: "عدم تحمل الحر", category: "حراري" },
    { id: "hairLoss", name: "تساقط الشعر", category: "جلدي" },
    { id: "dryMain", name: "جفاف الجلد", category: "جلدي" },
    { id: "constipation", name: "إمساك", category: "هضمي" },
    { id: "diarrhea", name: "إسهال", category: "هضمي" },
    { id: "heartPalpitations", name: "خفقان القلب", category: "قلبي" },
    { id: "anxiety", name: "قلق وتوتر", category: "نفسي" },
    { id: "depression", name: "اكتئاب", category: "نفسي" },
    { id: "musclePain", name: "ألم العضلات", category: "عضلي" },
    { id: "tremor", name: "رعشة", category: "عصبي" },
    { id: "sleepProblems", name: "مشاكل النوم", category: "نوم" }
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
    showToast("تم حفظ بيانات المريض", "سيتم تحليل البيانات وعرض النتائج قريباً");
    // navigate("/diagnosis-results", { state: { patientData } });
  };

  const saveDraft = () => {
    showToast("تم حفظ المسودة", "يمكنك العودة لإكمال البيانات لاحقاً");
  };

  const steps = [
    { id: 1, title: "المعلومات الأساسية", icon: User },
    { id: 2, title: "التاريخ المرضي", icon: FileText },
    { id: 3, title: "الأعراض", icon: Activity },
    { id: 4, title: "التحاليل والفحوصات", icon: Upload }
  ];

  const getBMIStatus = (bmi) => {
    if (!bmi) return '';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { status: 'نقص الوزن', color: 'text-yellow-600' };
    if (bmiValue < 25) return { status: 'وزن طبيعي', color: 'text-green-600' };
    if (bmiValue < 30) return { status: 'زيادة الوزن', color: 'text-orange-600' };
    return { status: 'سمنة', color: 'text-red-600' };
  };

  const bmi = calculateBMI();
  const bmiStatus = getBMIStatus(bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Toast Notifications */}
      <div className="fixed z-50 space-y-2 top-4 left-4">
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
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <div className="mr-3">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-sm">{toast.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إضافة مريض جديد</h1>
                <p className="text-gray-600">أدخل بيانات المريض للحصول على التشخيص</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <button 
                onClick={saveDraft}
                className="flex items-center px-4 py-2 space-x-2 space-x-reverse font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 shadow-sm rounded-xl hover:bg-gray-50"
              >
                <Save className="w-4 h-4" />
                <span>حفظ مسودة</span>
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
                  <div className="mr-3">
                    <div className={`font-medium transition-colors duration-300 ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                        currentStep > step.id 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                          : "bg-gray-300"
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
                <User className="w-6 h-6 ml-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">المعلومات الأساسية</h2>
              </div>
              <p className="mt-1 text-gray-600">أدخل المعلومات الشخصية الأساسية للمريض</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="اسم المريض بالكامل"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">تاريخ الميلاد</label>
                  <input
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) => setPatientData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {calculateAge() && (
                    <div className="inline-block px-3 py-1 mt-2 text-sm text-blue-700 rounded-lg bg-blue-50">
                      العمر: {calculateAge()} سنة
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">الجنس</label>
                  <select 
                    value={patientData.gender}
                    onChange={(e) => setPatientData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">الطول (سم)</label>
                  <input
                    type="number"
                    placeholder="170"
                    value={patientData.height}
                    onChange={(e) => setPatientData(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">الوزن (كجم)</label>
                  <input
                    type="number"
                    placeholder="70"
                    value={patientData.weight}
                    onChange={(e) => setPatientData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {bmi && (
                    <div className="flex items-center mt-2 space-x-2 space-x-reverse">
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <input
                    type="tel"
                    placeholder="01234567890"
                    value={patientData.phone}
                    onChange={(e) => setPatientData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">العنوان (اختياري)</label>
                  <input
                    type="text"
                    placeholder="عنوان المريض"
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
                <FileText className="w-6 h-6 ml-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">التاريخ المرضي</h2>
              </div>
              <p className="mt-1 text-gray-600">معلومات طبية مهمة عن المريض</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">التاريخ المرضي</label>
                <textarea
                  placeholder="اذكر الأمراض السابقة، العمليات الجراحية، أو أي حالات مرضية في التاريخ العائلي..."
                  value={patientData.medicalHistory}
                  onChange={(e) => setPatientData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">الأدوية الحالية</label>
                <textarea
                  placeholder="اذكر جميع الأدوية التي يتناولها المريض حالياً مع الجرعات..."
                  value={patientData.currentMedications}
                  onChange={(e) => setPatientData(prev => ({ ...prev, currentMedications: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">الحساسيات المعروفة</label>
                <textarea
                  placeholder="اذكر أي حساسيات معروفة للأدوية أو الطعام أو المواد الأخرى..."
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
                <Activity className="w-6 h-6 ml-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">الأعراض</h2>
              </div>
              <p className="mt-1 text-gray-600">حدد الأعراض الموجودة ودرجة شدتها (1-10)</p>
            </div>
            <div className="p-6">
              <div className="pr-2 space-y-4 overflow-y-auto max-h-96">
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
                      <div className="flex items-center space-x-3 space-x-reverse">
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
                          <span className="px-2 py-1 mr-2 text-xs text-gray-700 bg-gray-200 rounded-full">
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
                      <div className="mt-3 mr-6">
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
                          <span>خفيف</span>
                          <span>متوسط</span>
                          <span>شديد</span>
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
                <Upload className="w-6 h-6 ml-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">التحاليل والفحوصات</h2>
              </div>
              <p className="mt-1 text-gray-600">أدخل نتائج التحاليل المخبرية والفحوصات التصويرية</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">تحاليل الغدة الدرقية</h3>
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
                    <label className="block mb-2 text-sm font-medium text-gray-700">تحاليل أخرى</label>
                    <textarea
                      placeholder="أي تحاليل أخرى مثل الأجسام المضادة، الكالسيوم، إلخ..."
                      value={patientData.otherTests}
                      onChange={(e) => setPatientData(prev => ({ ...prev, otherTests: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">الفحوصات التصويرية</label>
                    <textarea
                      placeholder="نتائج السونار، الأشعة المقطعية، أو أي فحوصات تصويرية أخرى..."
                      value={patientData.imagingResults}
                      onChange={(e) => setPatientData(prev => ({ ...prev, imagingResults: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">رفع الملفات (اختياري)</label>
                <div className="p-8 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-600">
                    اسحب الملفات هنا أو انقر للاختيار
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG حتى 10MB
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
            السابق
          </button>
          
          <div className="flex space-x-2 space-x-reverse">
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                التالي
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2 space-x-reverse"
              >
                <Send className="w-4 h-4" />
                <span>تحليل البيانات</span>
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