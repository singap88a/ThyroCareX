"use client";
import { useState } from "react";
 import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUpload,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";

const initialForm = { name: "", email: "", subject: "", message: "" };

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
 
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email address.";
    if (!form.subject.trim()) e.subject = "Please enter a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please enter a message (at least 10 characters).";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setForm(initialForm);
      setErrors({});
      setTimeout(() => setStatus(null), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handleChange = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
  };

 

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden text-white bg-primary">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary w-96 h-96 opacity-10"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full bg-primary w-80 h-80 opacity-10"></div>

        <div className="relative px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full text-primary bg-primary backdrop-blur-sm">
            📞 GET IN TOUCH
          </div>
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Contact
            <span className="block text-white">
              ThyroCareX
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white">
            We're here to help you with any questions about thyroid cancer diagnosis,
            AI technology, or partnership opportunities. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left Column - Contact Cards & Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                <ContactCard
                  title="Email Support"
                  detail="support@thyrocarex.ai"
                  icon={<FaEnvelope className="w-5 h-5 text-primary" />}
                  hint="Typical reply within a few hours"
                />
                <ContactCard
                  title="Call Us"
                  detail="+1 (800) 555-2049"
                  icon={<FaPhoneAlt className="w-5 h-5 text-green-600" />}
                  hint="Available 24/7 for urgent clinical support"
                />
                <ContactCard
                  title="Office (HQ)"
                  detail="ThyroCareX HQ, 123 Medical Way, San Francisco, CA"
                  icon={<FaMapMarkerAlt className="w-5 h-5 text-purple-600" />}
                  hint="By appointment — clinical consultations available"
                />
                <ContactCard
                  title="Working Hours"
                  detail="24 / 7"
                  icon={<FaClock className="w-5 h-5 text-orange-500" />}
                  hint="Clinical team available around the clock"
                />
              </div>

              {/* Social Media */}
              <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="mb-4 text-lg font-semibold text-gray-900">Follow Us</div>
                <div className="flex gap-4">
                  <a className="p-3 transition-colors text-primary bg-primary/10 rounded-xl hover:bg-primary/20" href="#">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a className="p-3 transition-colors text-primary bg-primary/10 rounded-xl hover:bg-primary/20" href="#">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a className="p-3 transition-colors text-primary bg-primary/10 rounded-xl hover:bg-primary/20" href="#">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                </div>
              </div>

 
            </div>

            {/* Middle Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We'll get back to you as soon as possible</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Full name *
                      </label>
                      <input
                        value={form.name}
                        onChange={handleChange("name")}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="Jane Doe"
                      />
                      {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        value={form.email}
                        onChange={handleChange("email")}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="you@example.com"
                        type="email"
                      />
                      {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Subject *
                    </label>
                    <input
                      value={form.subject}
                      onChange={handleChange("subject")}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.subject ? "border-red-400" : "border-gray-300"
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <div className="mt-1 text-sm text-red-500">{errors.subject}</div>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        errors.message ? "border-red-400" : "border-gray-300"
                      }`}
                      placeholder="Please describe your inquiry in detail..."
                    />
                    {errors.message && <div className="mt-1 text-sm text-red-500">{errors.message}</div>}
                  </div>

                  {/* File Upload */}
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg text-primary bg-primary/10">
                      <FaUpload className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">Attach files (optional)</div>
                      <div className="text-sm text-gray-500">Max 25MB • JPG, PNG, PDF</div>
                    </div>
                    <button type="button" className="px-4 py-2 text-sm font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20">
                      Browse
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center justify-center w-full gap-3 px-6 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-primary rounded-xl hover:bg-primaryHover disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Secure Message
                        <FaArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-xl">
                      <FaCheckCircle className="w-5 h-5 text-green-600" />
                      <div className="text-green-800">
                        <div className="font-medium">Message sent successfully!</div>
                        <div className="text-sm">We'll get back to you within 24 hours.</div>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-xl">
                      <FaTimesCircle className="w-5 h-5 text-red-600" />
                      <div className="text-red-800">
                        <div className="font-medium">Error sending message</div>
                        <div className="text-sm">Please try again later.</div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

 
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
 
          <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
 
            
            <div className="h-96">
              <iframe
                title="ThyroCareX HQ Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193407399086!2d-122.40569468468045!3d37.78799477975688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d7978b5f%3A0x1e7f1b9a2f6f0d4f!2sSalesforce%20Tower%2C%20415%20Mission%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2seg!4v1697040000000!5m2!1sen!2seg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

 
    </main>
  );
};

export default ContactPage;

/* Helper Components */
function ContactCard({ title, detail, icon, hint }) {
  return (
    <div className="flex items-start gap-4 p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md">
      <div className="flex items-center justify-center w-12 h-12 text-primary bg-primary/10 rounded-xl">
        {icon}
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm font-medium text-gray-500">{title}</div>
        <div className="mb-1 text-lg font-semibold text-gray-900">{detail}</div>
        {hint && <div className="text-sm text-gray-500">{hint}</div>}
      </div>
    </div>
  );
}