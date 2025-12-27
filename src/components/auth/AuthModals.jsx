import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fadeIn transition-all duration-300">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl animate-scaleIn transform transition-all border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-gray-100 hover:text-red-500 hover:rotate-90"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] prose prose-sm max-w-none text-gray-600 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 font-semibold text-white transition-all shadow-lg bg-primary rounded-xl hover:bg-primary/90 hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            I Understand
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export const TermsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms and Conditions">
      <div className="space-y-4">
        <p><strong>Last Updated: December 2025</strong></p>
        <p>Welcome to MediSys Pro. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
        
        <h4>1. Account Registration</h4>
        <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
        
        <h4>2. Medical Disclaimer</h4>
        <p>This platform provides administrative and organizational tools for medical professionals. It does not provide medical advice, diagnosis, or treatment. Always rely on your professional judgment.</p>
        
        <h4>3. Data Privacy</h4>
        <p>We are committed to protecting patient data in accordance with HIPAA and other relevant regulations. Please review our Privacy Policy for details.</p>
        
        <h4>4. Usage Guidelines</h4>
        <p>You agree not to misuse the platform or attempt to access restricted areas without authorization.</p>
      </div>
    </Modal>
  );
};

export const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="space-y-4">
        <p><strong>Effective Date: December 2025</strong></p>
        <p>At MediSys Pro, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information.</p>
        
        <h4>1. Information We Collect</h4>
        <p>We collect personal information you provide (name, email, professional credentials) and usage data to improve our services.</p>
        
        <h4>2. How We Use Your Data</h4>
        <p>Your data is used to verify your identity, provide access to the platform, and communicate important updates. We do not sell your personal data.</p>
        
        <h4>3. Data Security</h4>
        <p>We employ industry-standard encryption and security measures to safeguard your information against unauthorized access.</p>
        
        <h4>4. Your Rights</h4>
        <p>You have the right to access, correct, or request deletion of your personal data, subject to legal and regulatory retention requirements.</p>
      </div>
    </Modal>
  );
};
