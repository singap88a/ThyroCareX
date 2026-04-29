import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, User, Calendar, Weight, Ruler,
  Phone, MapPin, FileText, Upload, Send, X,
  CircleCheck, AlertCircle, Loader2, Brain,
  Activity, FlaskConical, Microscope
} from 'lucide-react';
import toast from 'react-hot-toast';
import patientService from '../../services/patientService';
import testService from '../../services/testService';

const AddPatient = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [patientData, setPatientData] = useState({
    // Step 1 — Basic Info
    fullName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    phone: '',
    address: '',
    // Step 2 — Medical History
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    // Step 3 — AI Diagnosis Data
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
    { id: 1, title: 'Basic Information', icon: User },
    { id: 2, title: 'Medical History', icon: FileText },
    { id: 3, title: 'AI Diagnosis', icon: Brain },
  ];

  const set = (field, value) => setPatientData(p => ({ ...p, [field]: value }));

  const getAgeNumber = () => {
    const n = Number(patientData.age);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(120, Math.floor(n)));
  };

  const calculateBMI = () => {
    const h = parseFloat(patientData.height);
    const w = parseFloat(patientData.weight);
    if (h && w) return (w / ((h / 100) ** 2)).toFixed(1);
    return '';
  };

  const bmi = calculateBMI();
  const bmiStatus = () => {
    const v = parseFloat(bmi);
    if (!bmi) return null;
    if (v < 18.5) return { label: 'Underweight', color: 'text-yellow-500' };
    if (v < 25) return { label: 'Normal', color: 'text-green-600' };
    if (v < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };
  const bmiInfo = bmiStatus();

  /* ── validation ─────────────────────────────────────── */
  const validateStep = () => {
    if (currentStep === 1) {
      if (!patientData.fullName.trim()) { toast.error('Full name is required'); return false; }
      if (!getAgeNumber()) { toast.error('Age is required'); return false; }
      if (!patientData.gender) { toast.error('Gender is required'); return false; }
      if (!patientData.phone.trim()) { toast.error('Phone number is required'); return false; }
    }
    return true;
  };

  const next = () => { if (validateStep()) setCurrentStep(s => Math.min(3, s + 1)); };
  const prev = () => setCurrentStep(s => Math.max(1, s - 1));

  /* ── submit ──────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1️⃣  Add patient to database
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
        toast.error(patientRes.message || 'Failed to create patient');
        return;
      }
      const patientId = patientRes.data;

      // 2️⃣  Run clinical AI assessment
      const clinicalPayload = {
        patient_id: patientId,
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

      let imageResult = null;
      // 3️⃣  Run image AI if an ultrasound was uploaded
      if (patientData.ultrasoundImage && clinicalRes.succeeded && clinicalRes.data?.testId) {
        try {
          const imgRes = await testService.processImage(clinicalRes.data.testId, patientData.ultrasoundImage);
          if (imgRes.succeeded) {
            imageResult = imgRes.data;
          } else {
            toast.error(imgRes.message || 'Image AI failed to process the ultrasound');
          }
        } catch (imgErr) {
          toast.error(imgErr?.response?.data?.message || 'Image AI failed to process the ultrasound');
        }
      }

      toast.success('Patient added & diagnosed successfully!');
      // Open the same Diagnosis Result page used in the Patient Dashboard
      navigate(`/patients/${patientId}/dashboard?view=results`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Toggle chip helper ──────────────────────────────── */
  const Toggle = ({ label, field }) => (
    <button
      type="button"
      onClick={() => set(field, !patientData[field])}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${patientData[field]
          ? 'bg-primary border-primary text-white shadow-md shadow-primary/30'
          : 'bg-white border-gray-200 text-gray-600 hover:border-primary/40'
        }`}
    >
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${patientData[field] ? 'border-white bg-white' : 'border-gray-400'
        }`}>
        {patientData[field] && <span className="w-2 h-2 rounded-full bg-primary block" />}
      </span>
      {label}
    </button>
  );

  /* ── render ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/patients')}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Add New Patient</h1>
              <p className="text-xs text-gray-500">Complete all steps to run the AI diagnosis</p>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-400">Step {currentStep} / {steps.length}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = currentStep > step.id;
            const active = currentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done ? 'bg-primary border-primary text-white' :
                      active ? 'bg-white border-primary text-primary shadow-md shadow-primary/20 scale-110' :
                        'bg-white border-gray-200 text-gray-400'
                    }`}>
                    {done ? <CircleCheck className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium transition-colors ${active ? 'text-primary' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: Basic Information ─────────────────── */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
                <p className="text-sm text-gray-500">Patient's personal & contact details</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Ahmed Mohamed"
                    value={patientData.fullName}
                    onChange={e => set('fullName', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age (years) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 35"
                    value={patientData.age}
                    onChange={e => set('age', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                  <select value={patientData.gender} onChange={e => set('gender', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition bg-white">
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Height (cm)</label>
                  <input type="number" placeholder="170" min="50" max="250"
                    value={patientData.height} onChange={e => set('height', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Weight (kg)</label>
                  <input type="number" placeholder="70" min="10" max="300"
                    value={patientData.weight} onChange={e => set('weight', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                  {bmi && bmiInfo && (
                    <p className={`mt-1 text-xs font-medium ${bmiInfo.color}`}>BMI: {bmi} — {bmiInfo.label}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="01xxxxxxxxx"
                    value={patientData.phone} onChange={e => set('phone', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input type="text" placeholder="City, Street..."
                    value={patientData.address} onChange={e => set('address', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Medical History ───────────────────── */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Medical History</h2>
                <p className="text-sm text-gray-500">Patient's background for clinical context</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Medical History</label>
                <textarea rows={4} placeholder="Previous diseases, surgeries, family history of thyroid conditions..."
                  value={patientData.medicalHistory} onChange={e => set('medicalHistory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Medications</label>
                <textarea rows={3} placeholder="List medications with dosage..."
                  value={patientData.currentMedications} onChange={e => set('currentMedications', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Known Allergies</label>
                <textarea rows={2} placeholder="Drug, food, or other allergies..."
                  value={patientData.allergies} onChange={e => set('allergies', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: AI Diagnosis Data ─────────────────── */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            {/* Thyroid Lab Values */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Thyroid Lab Results</h2>
                  <p className="text-sm text-gray-500">Enter available lab values — leave blank if not tested</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: 'TSH', unit: 'mIU/L', field: 'tsh', hint: '0.4–4.0' },
                    { label: 'T3', unit: 'ng/dL', field: 't3', hint: '80–200' },
                    { label: 'TT4', unit: 'μg/dL', field: 'tt4', hint: '4.5–12' },
                    { label: 'FTI', unit: '', field: 'fti', hint: '—' },
                    { label: 'T4U', unit: '', field: 't4u', hint: '—' },
                  ].map(({ label, unit, field, hint }) => (
                    <div key={field}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        {label} {unit && <span className="text-gray-400 normal-case font-normal">({unit})</span>}
                      </label>
                      <input type="number" step="0.001" placeholder={hint}
                        value={patientData[field]} onChange={e => set(field, e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Flags */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Clinical Flags</h2>
                  <p className="text-sm text-gray-500">Select all that apply to this patient</p>
                </div>
              </div>
              <div className="p-6 flex flex-wrap gap-3">
                <Toggle label="On Thyroxine" field="onThyroxine" />
                <Toggle label="Prior Thyroid Surgery" field="thyroidSurgery" />
                <Toggle label="Query Hyperthyroid" field="queryHyperthyroid" />
                <Toggle label="Nodule Present" field="nodulePresent" />
              </div>
            </div>

            {/* Ultrasound Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Thyroid Ultrasound Image</h2>
                  <p className="text-sm text-gray-500">Optional — enables AI segmentation & TI-RADS classification</p>
                </div>
              </div>
              <div className="p-6">
                {patientData.ultrasoundImage ? (
                  <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CircleCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-green-800 truncate">{patientData.ultrasoundImage.name}</p>
                      <p className="text-xs text-green-600">{(patientData.ultrasoundImage.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button onClick={() => set('ultrasoundImage', null)}
                      className="p-1.5 rounded-lg hover:bg-green-200 transition-colors">
                      <X className="w-4 h-4 text-green-700" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="w-full py-10 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary/40 hover:bg-blue-50/30 transition-all duration-200 group">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-gray-300 group-hover:text-primary transition-colors" />
                    <p className="text-sm font-medium text-gray-500 group-hover:text-primary">Click to upload ultrasound image</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, DICOM — max 15 MB</p>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={e => set('ultrasoundImage', e.target.files[0] || null)} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button onClick={prev} disabled={currentStep === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}>
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentStep < 3 ? (
            <button onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primaryHover shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-primaryHover text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Running AI Diagnosis...</>
              ) : (
                <><Brain className="w-5 h-5" /> Run AI Diagnosis</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPatient;