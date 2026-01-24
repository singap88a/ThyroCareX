import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthWave from "./AuthWave";
import { useAuth } from "../../contexts/AuthContext";

import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);
    
    setLoading(false);
    
    if (result.success) {
      toast.success('Logged in successfully');
      if (result.role === 'Admin') {
        navigate('/admin'); // Redirect to Admin Dashboard base
      } else {
        navigate('/'); // Redirect to Home
      }
    } else {
      setError(result.message);
      toast.error(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white">
      
      {/* ========== LEFT CONTENT (Form) ========== */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24 mt-16">
        <div className="w-full max-w-md mx-auto animate-fadeIn">
          
          {/* Logo / Header */}
          <div className="mb-12">
            <div className="relative inline-block w-full">
              <div className="flex items-center mb-2">
{/* أيقونة الدرع الطبي */}
<div className="flex items-center justify-center w-10 h-10 mr-3 shadow-sm bg-gradient-to-br from-blue-50 to-primary/10 rounded-xl">
  <svg 
    className="w-7 h-7 text-primary" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
</div>
                <h1 className="text-[1.7rem] font-bold tracking-tight text-gray-900">
                  <span className="relative font-extrabold text-primary">
                    Welcome Back
                    <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full transform -translate-y-1"></span>
                  </span>
                  <span className="ml-2 font-extrabold text-gray-700">
                    to Thyro Carex

                  </span>
                </h1>
              </div>
              <p className="  text-sm font-medium text-gray-600">
                Sign in to access your medical dashboard
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <span className="font-medium">Error!</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Username */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                </div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full py-4 pr-4 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full py-4 pr-12 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 border-transparent pl-11 bg-gray-50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors cursor-pointer hover:text-primary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-2 text-sm">
              <label className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-gray-700">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary/50" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-medium text-gray-400 transition-colors hover:text-primary">
                Forgot Password?
              </a>
            </div>

            {/* Create Account Link */}
            <div className="pt-2 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="font-semibold transition-all duration-300 text-primary hover:underline">
                  Create Account
                </a>
              </p>
            </div>

            <div className="flex pt-4">
              <button 
                disabled={loading}
                className="flex-1 py-4 px-6 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========== ANIMATED WAVE SECTION WITH LOTTIE ========== */}
      <AuthWave />

      <style>{`
        :root {
          --primary: #4695a5;
        }
        
        /* Focus styles for inputs */
        input:focus {
          outline: none;
          border-color: #4695a5 !important;
          box-shadow: 0 0 0 3px rgba(70, 149, 165, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;