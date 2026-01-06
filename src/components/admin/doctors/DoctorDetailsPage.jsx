import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Calendar, CreditCard, Activity, Phone, User, FileText } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useAdminTheme();

  // Mock data - in real app, fetch by id
  const [doctor] = useState({
    id: parseInt(id) || 1,
    name: 'Dr. Sarah Smith',
    email: 'sarah@example.com',
    country: 'USA',
    phone: '+1 234 567 890',
    status: 'active',
    subscription: 'Pro',
    credits: 45,
    diagnosesCount: 128,
    dateOfBirth: '1985-05-15',
    gender: 'female',
    address: {
      street: '123 Medical Center Dr',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    medicalHistory: {
      thyroidIssues: false,
      diabetes: false,
      heartDisease: false,
      allergies: true
    },
    identityType: 'doctorCard',
    avatar: null
  });

  // Mock patients data - patients diagnosed by this doctor
  const [patients] = useState([
    {
      id: 'P001',
      name: 'John Smith',
      date: '2023-10-24',
      result: 'Normal',
      confidence: 98,
      image: 'https://prod-images-static.radiopaedia.org/images/51536838/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Patient shows no signs of abnormalities. Regular checkup recommended in 6 months.'
    },
    {
      id: 'P002',
      name: 'Emily Davis',
      date: '2023-10-23',
      result: 'Abnormal',
      confidence: 87,
      image: 'https://prod-images-static.radiopaedia.org/images/1568265/8b8f8e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Detected potential nodule in the left lobe. Biopsy recommended.'
    },
    {
      id: 'P003',
      name: 'Michael Brown',
      date: '2023-10-22',
      result: 'Normal',
      confidence: 95,
      image: 'https://prod-images-static.radiopaedia.org/images/2345678/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Clear scan. No issues found.'
    },
    {
      id: 'P004',
      name: 'Jessica Wilson',
      date: '2023-10-21',
      result: 'Uncertain',
      confidence: 65,
      image: 'https://prod-images-static.radiopaedia.org/images/3456789/0b1f7e4a8f9d9b4c5d2e1a3f6b5c7d8e_jumbo.jpeg',
      notes: 'Image quality is low. Requested re-scan.'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/doctors')}
          className={`p-2 rounded-lg transition-colors flex items-center gap-2
            ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'}`}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Doctors</span>
        </button>
      </div>

      {/* Doctor Header Section */}
      <div className={`rounded-2xl border overflow-hidden shadow-lg
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-full p-2 bg-white dark:bg-gray-800">
                <img 
                  src={doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.name}&background=random`} 
                  alt={doctor.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">{doctor.name}</h1>
                <div className="flex items-center gap-4 text-blue-100">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {doctor.country}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doctor.status === 'active' ? 'bg-emerald-500/20 text-white' :
                    doctor.status === 'suspended' ? 'bg-red-500/20 text-white' :
                    'bg-orange-500/20 text-white'
                  }`}>
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="p-8 space-y-8">
          {/* Contact Information */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <Mail size={20} className="text-blue-500" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.email}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Phone Number</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.phone || 'Not provided'}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Date of Birth</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.dateOfBirth || 'Not provided'}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Gender</label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {doctor.gender ? doctor.gender.charAt(0).toUpperCase() + doctor.gender.slice(1) : 'Not provided'}
                </p>
              </div>
            </div>
          </section>

          {/* Address */}
          {doctor.address && (
            <section>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <MapPin size={20} className="text-purple-500" /> Address
              </h3>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {doctor.address.street}, {doctor.address.city}, {doctor.address.state} {doctor.address.zipCode}
                </p>
              </div>
            </section>
          )}

          {/* Subscription & Credits */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <CreditCard size={20} className="text-emerald-500" /> Subscription & Usage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Current Plan</label>
                <p className="font-bold text-purple-500">{doctor.subscription}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Credits Remaining</label>
                <p className="font-bold text-emerald-500">{doctor.credits}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-xs text-gray-500 block mb-1">Total Diagnoses</label>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.diagnosesCount}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Patients Section */}
      <div className={`rounded-2xl border shadow-lg
        ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <User size={24} className="text-blue-500" />
            Patients Diagnosed ({patients.length})
          </h2>
        </div>

        <div className="p-6">
          {patients.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                No patients diagnosed yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-5 rounded-xl border transition-all hover:shadow-md
                    ${isDarkMode ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Patient Image */}
                    <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {patient.name}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Case ID: {patient.id} • Date: {patient.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            patient.result === 'Normal' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' :
                            patient.result === 'Abnormal' ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400'
                          }`}>
                            {patient.result}
                          </span>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {patient.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
                        <div className="flex items-start gap-2">
                          <FileText size={16} className={`mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {patient.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;

