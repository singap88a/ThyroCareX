import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Zap, Activity, Star } from 'lucide-react';

const PlanModal = ({ isOpen, onClose, onSave, plan = null }) => {
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    planType: 1,
    description: '',
    features: [],
    price: 0,
    durationInDays: 30
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        id: plan.id,
        planType: plan.planType,
        description: plan.description || '',
        features: plan.features || [],
        price: plan.price,
        durationInDays: plan.durationInDays || 30
      });
    } else {
      setFormData({
        id: null,
        planType: 1,
        description: '',
        features: [],
        price: 0,
        durationInDays: 30
      });
    }
  }, [plan, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 custom-scrollbar"
        >
          {/* Header */}
          <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">
              {plan ? 'Edit Subscription Plan' : 'Create New Plan'}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Plan Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Basic Info & Description */}
              <div className="md:col-span-12 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Plan Tier</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 1, name: 'Starter', icon: Zap, color: 'text-teal-600', bg: 'bg-teal-50' },
                      { id: 2, name: 'Pro', icon: Activity, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                      { id: 3, name: 'Enterprise', icon: Star, color: 'text-primary-color', bg: 'bg-primary-color/10' }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setFormData({...formData, planType: tier.id})}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                          formData.planType === tier.id 
                            ? 'border-[#4695a5] bg-[#4695a5]/5 shadow-md shadow-[#4695a5]/10 scale-[1.02]' 
                            : 'border-slate-100 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <tier.icon className={`w-6 h-6 ${formData.planType === tier.id ? 'text-[#4695a5]' : 'text-slate-400'}`} />
                        <span className={`text-xs font-black ${formData.planType === tier.id ? 'text-slate-900' : 'text-slate-400'}`}>
                          {tier.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Content Split */}
              <div className="md:col-span-6 space-y-6">
                {/* Price & Duration Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4695a5]/20 focus:border-[#4695a5] outline-none font-bold text-slate-900"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Duration (Days)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.durationInDays}
                      onChange={(e) => setFormData({...formData, durationInDays: parseInt(e.target.value)})}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4695a5]/20 focus:border-[#4695a5] outline-none font-bold text-slate-900"
                      placeholder="30"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Short Description</label>
                  <textarea 
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4695a5]/20 focus:border-[#4695a5] outline-none text-slate-700 font-medium text-sm transition-all`}
                    placeholder="Briefly describe what this plan offers..."
                  />
                </div>
              </div>

              {/* Right Column: Features */}
              <div className="md:col-span-6 space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Plan Features</label>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddFeature(e)}
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4695a5]/20 focus:border-[#4695a5] outline-none text-slate-700 font-medium text-sm"
                      placeholder="e.g., AI Diagnosis Tools"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>

                  {/* Tag Chips Scrollable */}
                  <div className={`p-4 bg-slate-50 border border-slate-100 rounded-2xl min-h-[120px] max-h-[180px] overflow-y-auto custom-scrollbar`}>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-[#4695a5]/10 text-[#4695a5] bg-opacity-80 rounded-lg text-sm font-bold border border-[#4695a5]/20">
                          {feature}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveFeature(feature)}
                            className="p-0.5 hover:bg-[#4695a5]/20 rounded-full transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {formData.features.length === 0 && (
                        <span className="text-xs text-slate-400 font-medium">No features added yet.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] py-4 bg-[#4695a5] hover:bg-[#3d8391] text-white font-black rounded-xl shadow-xl shadow-[#4695a5]/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {plan ? 'Update Plan' : 'Create Plan'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PlanModal;
