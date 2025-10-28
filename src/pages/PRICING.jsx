import { useState } from 'react';
import { FaCheck, FaCrown, FaStar, FaRocket, FaUserTie, FaBuilding, FaShieldAlt, FaClock, FaHeadset, FaChartLine, FaUsers, FaFileMedical } from 'react-icons/fa';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');


  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individual patients and basic screening',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      icon: <FaRocket className="w-8 h-8" />,
      gradient: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gray-50',
      features: [
        { icon: <FaCheck className="w-4 h-4" />, text: 'Basic thyroid scan analysis' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'AI-powered initial screening' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Summary report with insights' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Email support within 24 hours' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Community forum access' },
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for regular patients and comprehensive care',
      monthlyPrice: '$49',
      yearlyPrice: '$39',
      period: 'per month',
      savings: 'Save 20%',
      icon: <FaUserTie className="w-8 h-8" />,
      gradient: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      features: [
        { icon: <FaCheck className="w-4 h-4" />, text: 'Everything in Starter plan' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Detailed AI diagnosis reports' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Video consultations with specialists' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Priority email & chat support' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Personalized follow-up reports' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Medical record storage' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Progress tracking dashboard' },
      ],
      cta: 'Choose Professional',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for clinics and healthcare providers',
      monthlyPrice: '$99',
      yearlyPrice: '$79',
      period: 'per month',
      savings: 'Save 25%',
      icon: <FaBuilding className="w-8 h-8" />,
      gradient: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      features: [
        { icon: <FaCheck className="w-4 h-4" />, text: 'Everything in Professional plan' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Unlimited video consultations' },
        { icon: <FaCheck className="w-4 h-4" />, text: '24/7 dedicated support line' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Second opinion from top experts' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Personalized treatment plans' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Family plan coverage' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Emergency response team' },
        { icon: <FaCheck className="w-4 h-4" />, text: 'Custom integration options' },
      ],
      cta: 'Choose Enterprise',
      popular: false
    }
  ];

  const features = [
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'HIPAA compliant data protection'
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: '24/7 Availability',
      description: 'Round-the-clock AI diagnosis'
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Certified medical professionals'
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: 'Continuous Updates',
      description: 'Always improving AI algorithms'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header Section */}
      <section className="relative py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 mb-8 border rounded-2xl bg-primary/10 border-primary/20">
              <FaStar className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold text-primary">TRANSPARENT PRICING</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
              Simple, Honest
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Pricing
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-600">
              Choose the perfect plan for your thyroid care journey. All plans include 
              our industry-leading AI diagnosis technology with different levels of support and features.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-2 mb-16 bg-gray-100 rounded-2xl">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-sm font-normal text-green-600">Save up to 25%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-transparent">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group transition-all duration-500 ${
                  plan.popular ? 'lg:scale-105 lg:-translate-y-4' : 'hover:-translate-y-2'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute z-20 transform -translate-x-1/2 -top-4 left-1/2">
                    <div className="flex items-center px-8 py-3 space-x-2 text-white shadow-2xl bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl">
                      <FaCrown className="w-4 h-4" />
                      <span className="font-semibold">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Plan Card */}
                <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                  plan.popular ? 'border-blue-500' : 'border-gray-100 group-hover:border-blue-200'
                } overflow-hidden h-full flex flex-col`}>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  <div className="relative flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl ${plan.bgColor} mb-4`}>
                        <div className={`text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                          {plan.icon}
                        </div>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 text-center">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        {plan.period && (
                          <span className="text-lg text-gray-500">/{plan.period}</span>
                        )}
                      </div>
                      {plan.savings && billingPeriod === 'yearly' && (
                        <div className="text-sm font-semibold text-green-600">
                          {plan.savings}
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="flex-1 mb-8 space-y-4">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            {feature.icon}
                          </div>
                          <span className="leading-relaxed text-gray-600">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white hover:shadow-lg'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${plan.gradient} group-hover:w-full transition-all duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Everything You Need for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryHover">
                Complete Thyroid Care
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 text-primary bg-primary/10 rounded-2xl group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryHover">
                Questions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "The Starter plan is completely free forever. For paid plans, we offer a 14-day money-back guarantee."
              },
              {
                question: "Do you offer discounts for clinics?",
                answer: "Yes, we offer special enterprise pricing for clinics and healthcare institutions. Contact our sales team."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Transform Your
            <span className="block text-blue-200">Thyroid Care?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
            Join thousands of patients and healthcare providers who trust ThyroCareX 
            for accurate, AI-powered thyroid diagnosis.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold transition-all duration-300 transform bg-white shadow-lg text-primary rounded-2xl hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl">
              Start Free Diagnosis
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-2xl hover:bg-white hover:text-primary">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;