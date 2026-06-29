import { useState } from "react";
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import AuthWave from "./AuthWave";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address.");
    
    setLoading(true);
    try {
      const result = await authService.forgotPassword(email);
      if (result.succeeded) {
        toast.success(result.message || "OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTPAndReset = async (e) => {
    e.preventDefault();
    if (step === 2) {
      if (!otp) return toast.error("Please enter the OTP.");
      setLoading(true);
      try {
        const result = await authService.verifyOTP(email, otp);
        if (result.succeeded) {
          toast.success("OTP verified!");
          setStep(3);
        } else {
          toast.error(result.message || "Invalid or expired OTP.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Invalid or expired OTP.");
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
      if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
      
      setLoading(true);
      try {
        const result = await authService.resetPassword(email, otp, newPassword);
        if (result.succeeded) {
          toast.success("Password reset successfully!");
          setStep(4);
        } else {
          toast.error(result.message || "Failed to reset password.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to reset password. OTP may be invalid.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white">
      {/* ========== LEFT CONTENT (Form) ========== */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24 mt-16">
        <div className="w-full max-w-md mx-auto animate-fadeIn">
          
          <div className="mb-12">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
            
            <div className="relative inline-block w-full">
              <div className="flex flex-col items-start mb-8">
                <img src="/logo_edit.png" alt="ThyroCareX Logo" className="h-16 w-auto mb-6 drop-shadow-md" />
                <h1 className="text-[1.7rem] font-bold tracking-tight text-gray-900">
                  <span className="relative font-extrabold text-primary">
                    {step === 1 && "Forgot Password"}
                    {step === 2 && "Enter OTP"}
                    {step === 3 && "Reset Password"}
                    {step === 4 && "Success"}
                    {step !== 4 && <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full transform -translate-y-1"></span>}
                  </span>
                </h1>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {step === 1 && "Enter your email address and we'll send you an OTP to reset your password."}
                {step === 2 && "Enter the 6-digit OTP sent to your email address."}
                {step === 3 && "Create a new strong password for your account."}
                {step === 4 && "Your password has been successfully reset. You can now login with your new password."}
              </p>
            </div>
          </div>

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 pr-4 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                    required
                  />
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOTPAndReset}>
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <KeyRound className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-4 pr-4 font-medium tracking-widest text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={handleVerifyOTPAndReset}>
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full py-4 px-4 pr-12 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-4 px-4 pr-12 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {step === 4 && (
             <div className="flex flex-col items-center justify-center p-8 bg-white border border-green-100 shadow-xl shadow-green-50 rounded-2xl text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                   <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <Link 
                   to="/login" 
                   className="w-full px-6 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transform transition-all hover:-translate-y-0.5"
                >
                   Go to Login
                </Link>
             </div>
          )}

        </div>
      </div>

      {/* ========== ANIMATED WAVE SECTION ========== */}
      <AuthWave />
      
      <style>{`
        :root {
          --primary: #4695a5;
        }
        input:focus {
          outline: none;
          border-color: #4695a5 !important;
          box-shadow: 0 0 0 3px rgba(70, 149, 165, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
