import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Stethoscope } from 'lucide-react';
import ThyroidDiagnosisView from '../../components/diagnosis/ThyroidDiagnosisView';

const PatientDetails = ({ testId = null }) => {
  const { id: patientId } = useParams();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Navigation Header */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-[100] border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/patients" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900">Patient Dashboard</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clinical Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black hover:shadow-lg hover:shadow-primary/30 transition-all">
                <Stethoscope size={18}/> New Assessment
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 mt-12">
        <ThyroidDiagnosisView patientId={patientId} dashboardMode={true} testId={testId} />
      </div>
    </div>
  );
};

export default PatientDetails;