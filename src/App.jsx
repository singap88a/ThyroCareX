import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DoctorProfile from './pages/DoctorProfile';
import AddPatient from './pages/Add_patient';
import './App.css';
import Footer from './components/home/Footer';
import Navbar from './components/home/Navbar';
import PRICING from './pages/PRICING';
import ScrollToTop from './components/ScrollToTop';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './components/Dashboard/AdminDashboard.css';
import AdminLayout from './components/Dashboard/AdminLayout';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import DoctorsManager from './components/Dashboard/DoctorsManager';
import CasesManager from './components/Dashboard/CasesManager';
import AILogsViewer from './components/Dashboard/AILogsViewer';
import SubscriptionsManager from './components/Dashboard/SubscriptionsManager';
import CreditsManager from './components/Dashboard/CreditsManager';
import MessagesInbox from './components/Dashboard/MessagesInbox';
import SettingsManager from './components/Dashboard/SettingsManager';
import MediaManager from './components/Dashboard/MediaManager';
import AdminUsersManager from './components/Dashboard/AdminUsersManager';
import AnnouncementsManager from './components/Dashboard/AnnouncementsManager';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="analytics" element={<DashboardOverview />} />
              <Route path="doctors" element={<DoctorsManager />} />
              <Route path="cases" element={<CasesManager />} />
              <Route path="ai-logs" element={<AILogsViewer />} />
              <Route path="subscriptions" element={<SubscriptionsManager />} />
              <Route path="credits" element={<CreditsManager />} />
              <Route path="messages" element={<MessagesInbox />} />
              <Route path="settings" element={<SettingsManager />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="users" element={<AdminUsersManager />} />
              <Route path="announcements" element={<AnnouncementsManager />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
