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
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
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

          </Routes>
        </div>
              <Footer />

      </Router>
    </AuthProvider>
  );
}

export default App;
