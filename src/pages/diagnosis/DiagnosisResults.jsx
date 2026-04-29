import React, { useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, FileWarning } from 'lucide-react';
import ThyroidDiagnosisView from '../../components/diagnosis/ThyroidDiagnosisView';

const DiagnosisResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Keep route for compatibility, but always prefer the dashboard result page (single source of truth).
  if (state?.patientId) {
    navigate(`/patients/${state.patientId}/dashboard?view=results`, { replace: true });
    return null;
  }

  if (!state?.clinicalResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FileWarning className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h2>
          <p className="text-gray-500 mb-6">Please run an AI diagnosis first.</p>
          <button onClick={() => navigate('/patients')}
            className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primaryHover transition">
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  const { patientId, clinicalResult } = state;

  // Wrap clinicalResult to match the expected format in ThyroidDiagnosisView
  const initialData = useMemo(() => ({
    ...clinicalResult,
    diagnosisResult: {
      ...clinicalResult.clinical,
      rawResponse: clinicalResult.clinical.rawResponse || JSON.stringify(clinicalResult.clinical)
    },
    testDate: new Date().toISOString()
  }), [clinicalResult]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/patients')}
              className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900">Immediate AI Results</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Diagnostic Output</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/patients/${patientId}/dashboard`)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black hover:shadow-lg hover:shadow-primary/30 transition-all">
            <LayoutDashboard className="w-4 h-4" /> Open Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <ThyroidDiagnosisView 
          patientId={patientId} 
          initialData={initialData} 
        />
      </div>
    </div>
  );
};

export default DiagnosisResults;
