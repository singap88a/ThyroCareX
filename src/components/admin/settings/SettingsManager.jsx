import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Mail, 
  CreditCard, 
  Cpu, 
  Save, 
  Upload,
  Globe,
  Shield
} from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const SettingsManager = () => {
  const { isDarkMode } = useAdminTheme();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email (SMTP)', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'ai', label: 'AI Model', icon: Cpu },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          System Settings
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Configure global application settings and integrations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className={`w-full lg:w-64 flex flex-col gap-2 p-2 rounded-xl border h-fit
          ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : (isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600')}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`flex-1 p-6 rounded-xl border min-h-[500px]
          ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>General Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Site Name</label>
                  <input type="text" defaultValue="ThyroCareX" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Support Email</label>
                  <input type="email" defaultValue="support@thyrocarex.com" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Site Logo</label>
                <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
                  ${isDarkMode ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800' : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'}`}>
                  <Upload size={32} className="text-gray-400" />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG (max. 2MB)</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SMTP Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMTP Host</label>
                  <input type="text" defaultValue="smtp.gmail.com" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMTP Port</label>
                  <input type="text" defaultValue="587" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                  <input type="text" defaultValue="notifications@thyrocarex.com" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <input type="password" defaultValue="********" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Payment Gateways</h2>
              
              <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Stripe</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Credit Cards & International Payments</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-400"/>
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer checked:bg-green-400"></label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Stripe Public Key</label>
                <input type="text" defaultValue="pk_test_..." className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
              </div>
            </motion.div>
          )}

          {/* AI Settings */}
          {activeTab === 'ai' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Model Configuration</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Model Endpoint URL</label>
                  <input type="text" defaultValue="https://api.thyrocarex.com/v1/predict" className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confidence Threshold</label>
                    <span className="text-sm font-bold text-blue-500">85%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="85" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  <p className="text-xs text-gray-500">Predictions below this threshold will be marked as "Uncertain".</p>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>API Key</label>
                  <div className="flex gap-2">
                    <input type="password" defaultValue="sk_live_..." className={`flex-1 p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                    <button className={`px-4 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30">
              <Save size={18} /> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
