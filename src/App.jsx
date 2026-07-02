import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Synchronous core components and providers
import Footer from './components/home/Footer';
import Navbar from './components/home/Navbar';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingChatbot from './components/common/FloatingChatbot';
import PageLoader from './components/common/PageLoader';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { AdminThemeProvider } from './contexts/AdminThemeContext';

// Lazy-loaded pages
const Home = React.lazy(() => import('./pages/home/Home'));
const About = React.lazy(() => import('./pages/about/About'));
const Contact = React.lazy(() => import('./pages/contact/Contact'));
const DoctorProfile = React.lazy(() => import('./pages/profile/DoctorProfile'));
const AddPatient = React.lazy(() => import('./pages/patients/AddPatient'));
const DiagnosisResults = React.lazy(() => import('./pages/diagnosis/DiagnosisResults'));
const PatientsList = React.lazy(() => import('./pages/patients/PatientsList'));
const PatientDetails = React.lazy(() => import('./pages/patients/PatientDetails'));
const PatientDashboard = React.lazy(() => import('./pages/patients/PatientDashboard'));
const Community = React.lazy(() => import('./pages/community/Community'));
const PRICING = React.lazy(() => import('./pages/pricing/Pricing'));
const Checkout = React.lazy(() => import('./pages/pricing/Checkout'));
const Login = React.lazy(() => import('./components/auth/Login'));
const Register = React.lazy(() => import('./components/auth/Register'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const PendingVerification = React.lazy(() => import('./components/auth/PendingVerification'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = React.lazy(() => import('./pages/legal/Terms'));

// Lazy-loaded Admin pages
const AdminLayout = React.lazy(() => import('./components/admin/layout/AdminLayout'));
const DashboardOverview = React.lazy(() => import('./components/admin/dashboard/DashboardOverview'));
const DoctorsManager = React.lazy(() => import('./components/admin/doctors/DoctorsManager'));
const CasesManager = React.lazy(() => import('./components/admin/patients/CasesManager'));
const SubscriptionsManager = React.lazy(() => import('./components/admin/subscriptions/SubscriptionsManager'));
const CreditsManager = React.lazy(() => import('./components/admin/credits/CreditsManager'));
const MediaManager = React.lazy(() => import('./components/admin/media/MediaManager'));
const ContactMessages = React.lazy(() => import('./components/admin/messages/ContactMessages'));
const AdminUsers = React.lazy(() => import('./components/admin/users/AdminUsers'));
const DoctorRequests = React.lazy(() => import('./components/admin/doctors/DoctorRequests'));
const DoctorDetailsPage = React.lazy(() => import('./components/admin/doctors/DoctorDetailsPage'));
const DoctorRequestDetails = React.lazy(() => import('./components/admin/doctors/DoctorRequestDetails'));
const CommunityManager = React.lazy(() => import('./components/admin/community/CommunityManager'));
const PatientDetailsPage = React.lazy(() => import('./components/admin/patients/PatientDetailsPage'));

// Lazy-loaded Re-Diagnosis Feature Pages
const ReDiagnosis = React.lazy(() => import('./pages/diagnosis/ReDiagnosis'));
const DiagnosisComparison = React.lazy(() => import('./pages/diagnosis/DiagnosisComparison'));
const DiagnosisHistory = React.lazy(() => import('./pages/diagnosis/DiagnosisHistory'));

// Other lazy-loaded pages
const GeminiSingap = React.lazy(() => import('./pages/GeminiSingap/GeminiSingap'));
const PaymentSuccess = React.lazy(() => import('./pages/payment/PaymentSuccess'));
const PaymentFailure = React.lazy(() => import('./pages/payment/PaymentFailure'));
const NotFound = React.lazy(() => import('./pages/errors/NotFound'));

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');
  const isAdmin = location.pathname.includes('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar/>}
      <div className={!isAdmin ? "pt-20 App" : "App"}>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
            <Route path="/gemini" element={<GeminiSingap />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />

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
              <Route path="doctors/:id" element={<DoctorDetailsPage />} />
              <Route path="doctor-requests" element={<DoctorRequests />} />
              <Route path="doctor-requests/:id" element={<DoctorRequestDetails />} />
              <Route path="patients" element={<CasesManager />} />
              <Route path="patients/:id" element={<PatientDetailsPage />} />
              <Route path="subscriptions" element={<SubscriptionsManager />} />
              <Route path="credits" element={<CreditsManager />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="messages" element={<ContactMessages />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="community" element={<CommunityManager />} />
            </Route>
            
            {/* 404 Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      {!isDashboard && !isAdmin && <Footer />}
      <FloatingChatbot />
    </>
  );
}

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </Router>
      </NotificationProvider>
     </AuthProvider>
  );
}

export default App;
