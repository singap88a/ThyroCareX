"use client";
import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
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
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Invalid email address.";
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
      <section className="relative py-3 mt-12 overflow-visible">
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-5">
          <div className="relative overflow-hidden rounded-[3rem] min-h-[450px]">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: "url('/bg1.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/60 to-cyan-500/40"></div>

            <div className="relative grid items-start h-full gap-8 px-6 py-12 text-white md:grid-cols-2">
              <div className="z-10 mt-20 ml-20 text-left">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-5xl">
                  Contact Us
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-white/90 md:text-xl">
                  We're here to help you with any questions about thyroid cancer diagnosis, AI technology, or partnership opportunities. Reach out to us anytime.
                </p>
              </div>
            </div>
          </div>

          <img
            src="/doctor1.png"
            alt="Doctor"
            className="absolute top-[47%] -translate-y-1/2 -right-4 h-[330px] md:h-[430px] lg:h-[530px] w-auto object-contain drop-shadow-2xl pointer-events-none"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {/* Left Column - Lottie Animation */}
            <div className="relative flex order-1 w-full lg:order-none">
              <DotLottieReact
                src="https://lottie.host/3d03a661-9736-4630-8012-2fd110ee9bb8/OeAkVAOXq4.lottie"
                loop
                autoplay
                className="w-[300px] md:w-[450px] lg:w-[450px] h-[400px] md:h-[700px] lg:h-[1000px] absolute -top-24 left-0"
              />
            </div>

            {/* Right Column - Contact Form */}
            <div className="order-2 lg:col-span-2">
              <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">
                    We'll get back to you as soon as possible
                  </p>
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
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-400" : "border-gray-300"
                          }`}
                        placeholder="Jane Doe"
                      />
                      {errors.name && (
                        <div className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        value={form.email}
                        onChange={handleChange("email")}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-400" : "border-gray-300"
                          }`}
                        placeholder="you@example.com"
                        type="email"
                      />
                      {errors.email && (
                        <div className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Subject *
                    </label>
                    <input
                      value={form.subject}
                      onChange={handleChange("subject")}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.subject ? "border-red-400" : "border-gray-300"
                        }`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.subject}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.message ? "border-red-400" : "border-gray-300"
                        }`}
                      placeholder="Please describe your inquiry in detail..."
                    />
                    {errors.message && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg text-primary bg-primary/10">
                      <FaUpload className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">
                        Attach files (optional)
                      </div>
                      <div className="text-sm text-gray-500">
                        Max 25MB • JPG, PNG, PDF
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20"
                    >
                      Browse
                    </button>
                  </div>

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

                  {status === "success" && (
                    <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-xl">
                      <FaCheckCircle className="w-5 h-5 text-green-600" />
                      <div className="text-green-800">
                        <div className="font-medium">
                          Message sent successfully!
                        </div>
                        <div className="text-sm">
                          We'll get back to you within 24 hours.
                        </div>
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

      {/* Bottom Animation Section */}
      <section className="pt-0 pb-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {/* Contact Info Card */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <div className="h-full p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <div className="mb-6">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Get in touch with our team for any questions or support.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg text-primary bg-primary/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Our Office</h3>
                      <p className="mt-1 text-gray-600">
                        123 Medical Street<br />
                        Cairo, Egypt 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg text-primary bg-primary/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone Number</h3>
                      <p className="mt-1 text-gray-600">
                        +20 123 456 7890<br />
                        Mon-Fri, 9AM-5PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg text-primary bg-primary/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Address</h3>
                      <p className="mt-1 text-gray-600">
                        info@thyrocare.com<br />
                        support@thyrocare.com
                      </p>
                    </div>
                  </div>

             
                </div>
              </div>
            </div>

            {/* Map Animation */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="h-full overflow-hidden border border-gray-200 shadow-lg rounded-2xl">
                <DotLottieReact
                  src="https://lottie.host/8c6dca52-3d55-4c56-975a-0bc59cf53aa6/DnB3kn2ZgX.lottie"
                  loop
                  autoplay
                  className="object-cover w-full h-full "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;