import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, User, Calendar, Activity, Plus,
  LayoutDashboard, Download, Phone, AlertCircle,
  CircleCheck, Loader2, RefreshCcw, UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import patientService from '../../services/patientService';
import toast from 'react-hot-toast';

const PatientsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    if (!user?.DoctorId) return;
    setLoading(true);
    try {
      const res = await patientService.getMyPatients(user.DoctorId);
      if (res.succeeded) {
        setPatients(res.data || []);
      } else {
        toast.error(res.message || 'Failed to load patients');
      }
    } catch (err) {
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, [user?.DoctorId]);

  const filtered = patients.filter(p =>
    (p.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(p.phoneNumber || '').includes(searchTerm)
  );

  const initials = (name = '') =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
            <p className="mt-1 text-gray-500">
              {loading ? 'Loading…' : `${patients.length} patient${patients.length !== 1 ? 's' : ''} registered`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchPatients}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 shadow-sm transition">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={() => navigate('/add-patient')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primaryHover shadow-lg shadow-primary/30 transition">
              <UserPlus className="w-4 h-4" /> Add Patient
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Patients', value: patients.length, icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'This Month',     value: patients.filter(p => {
                const d = new Date(p.registrationAt || 0);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Active Records', value: patients.length, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Pending Review', value: 0, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{loading ? '—' : value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition text-sm"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading patients…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <User className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              {searchTerm ? 'No matching patients' : 'No patients yet'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {searchTerm ? 'Try a different search term' : 'Add your first patient to get started'}
            </p>
            {!searchTerm && (
              <button onClick={() => navigate('/add-patient')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primaryHover transition shadow-lg shadow-primary/30">
                <UserPlus className="w-4 h-4" /> Add First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Patient', 'Age', 'Phone', 'Address', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(p => (
                    <tr key={p.patientID} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primaryHover flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow">
                            {initials(p.fullName)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{p.fullName}</div>
                            {p.email && <div className="text-xs text-gray-400">{p.email}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {p.age ? `${p.age} yrs` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {p.phoneNumber || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {p.address || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/patients/${p.patientID}/dashboard`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 group-hover:shadow-md"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
              <span>Showing <strong className="text-gray-700">{filtered.length}</strong> of <strong className="text-gray-700">{patients.length}</strong> patients</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;