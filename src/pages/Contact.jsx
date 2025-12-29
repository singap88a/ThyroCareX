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
      <section className="relative py-3 overflow-visible mt-12">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
          <div className="relative overflow-hidden rounded-[3rem] min-h-[450px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/bg1.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/60 to-cyan-500/40"></div>

            <div className="relative grid items-start h-full gap-8 px-6 py-12 md:grid-cols-2 text-white">
              <div className="z-10 text-left ml-20 mt-20">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-5xl">
                  Contact Us
                </h1>
                <p className="max-w-lg text-lg text-white/90 leading-relaxed md:text-xl">
                  We're here to help you with any questions about thyroid cancer diagnosis, AI technology, or partnership opportunities. Reach out to us anytime.
                </p>
              </div>
            </div>


          </div>

          <img
            src="/doctor.png"
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
            <div className="flex items-center justify-center order-1 w-full lg:order-none">
              <DotLottieReact
                src="https://lottie.host/3d03a661-9736-4630-8012-2fd110ee9bb8/OeAkVAOXq4.lottie"
                loop
                autoplay
                className="w-[300px] md:w-[450px] lg:w-[600px] h-[400px] md:h-[600px] lg:h-[800px]"
              />
            </div>


            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2 order-2">
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
      <section className="pt-0 pb-8 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 -mt-8">
          <div className="flex justify-center h-[250px] md:h-[350px] lg:h-[450px]">
            <DotLottieReact
              src="https://lottie.host/8c6dca52-3d55-4c56-975a-0bc59cf53aa6/DnB3kn2ZgX.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>


    </main >
  );
};

export default ContactPage;
