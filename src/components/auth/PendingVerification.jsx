import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';
import AuthWave from './AuthWave';

const PendingVerification = () => {
  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white">
      {/* Content Section */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24 mt-16 pb-12">
        <div className="w-full max-w-md mx-auto text-center animate-fadeIn">
          
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg border-4 border-primary/20">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
               <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Registration Submitted!
          </h1>
          
          <div className="px-6 py-4 mb-8 text-left bg-blue-50/50 border border-blue-100 rounded-2xl">
            <p className="mb-4 text-gray-600 leading-relaxed">
              Thank you for registering with <strong>MediSys Pro</strong>. We have received your information and identity documents.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Your account is currently <span className="font-semibold text-primary">Pending Approval</span>. Our administrative team will review your credentials shortly.
            </p>
          </div>

          <p className="mb-8 text-sm text-gray-500">
            You will receive an email notification once your account has been verified and activated.
          </p>

          <Link 
            to="/login"
            className="inline-flex items-center justify-center w-full px-8 py-4 font-bold text-white transition-all duration-300 transform shadow-lg bg-primary rounded-2xl hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-1"
          >
            Back to Login
          </Link>

        </div>
      </div>

      {/* Wave Animation Section */}
      <AuthWave />
      
      <style>{`
        :root {
          --primary: #4695a5;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PendingVerification;
