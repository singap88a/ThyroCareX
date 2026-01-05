import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import DoctorProfile from './pages/profile/DoctorProfile';
import AddPatient from './pages/patients/AddPatient';
import DiagnosisResults from './pages/diagnosis/DiagnosisResults';
import PatientsList from './pages/patients/PatientsList';
import PatientDetails from './pages/patients/PatientDetails';
import PatientDashboard from './pages/patients/PatientDashboard';
import Community from './pages/community/Community';
import './App.css';
import Footer from './components/home/Footer';
import Navbar from './components/home/Navbar';
import PRICING from './pages/pricing/Pricing';
import Checkout from './pages/pricing/Checkout';
import ScrollToTop from './components/common/ScrollToTop';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PendingVerification from './components/auth/PendingVerification';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { AdminThemeProvider } from './contexts/AdminThemeContext';
import AdminLayout from './components/admin/layout/AdminLayout';
import DashboardOverview from './components/admin/dashboard/DashboardOverview';
import DoctorsManager from './components/admin/doctors/DoctorsManager';
import CasesManager from './components/admin/patients/CasesManager';
import AILogsManager from './components/admin/ai/AILogsManager';
import SubscriptionsManager from './components/admin/subscriptions/SubscriptionsManager';
import CreditsManager from './components/admin/credits/CreditsManager';
import MediaManager from './components/admin/media/MediaManager';
import ContactMessages from './components/admin/messages/ContactMessages';
import AdminUsers from './components/admin/users/AdminUsers';
import SettingsManager from './components/admin/settings/SettingsManager';
import SecurityLogs from './components/admin/security/SecurityLogs';
import AnnouncementsManager from './components/admin/announcements/AnnouncementsManager';
// Re-Diagnosis Feature Pages
import ReDiagnosis from './pages/diagnosis/ReDiagnosis';
import DiagnosisComparison from './pages/diagnosis/DiagnosisComparison';
import DiagnosisHistory from './pages/diagnosis/DiagnosisHistory';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <>
      <ScrollToTop />
      <Navbar/>
      <div className="pt-20 App">
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<DoctorProfile />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/pricing" element={<PRICING />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/diagnosis-results" element={<DiagnosisResults />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/patients/:id/dashboard" element={<PatientDashboard />} />
          {/* Re-Diagnosis Routes */}
          <Route path="/patients/:id/rediagnose" element={<ReDiagnosis />} />
          <Route path="/patients/:id/compare" element={<DiagnosisComparison />} />
          <Route path="/patients/:id/history" element={<DiagnosisHistory />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pending-verification" element={<PendingVerification />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminAuthProvider>
              <AdminThemeProvider>
                <AdminLayout />
              </AdminThemeProvider>
            </AdminAuthProvider>
          }>
            <Route index element={<DashboardOverview />} />
            <Route path="doctors" element={<DoctorsManager />} />
            <Route path="patients" element={<CasesManager />} />
            <Route path="ai-logs" element={<AILogsManager />} />
            <Route path="subscriptions" element={<SubscriptionsManager />} />
            <Route path="credits" element={<CreditsManager />} />
            <Route path="media" element={<MediaManager />} />
            <Route path="messages" element={<ContactMessages />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="security" element={<SecurityLogs />} />
            <Route path="announcements" element={<AnnouncementsManager />} />
          </Route>
        </Routes>
      </div>
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
     </AuthProvider>
  );
}

export default App;
