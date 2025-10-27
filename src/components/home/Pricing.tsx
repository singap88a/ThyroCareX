import { FaCheck, FaCrown, FaStar, FaRocket } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      features: [
        'Basic thyroid scan upload',
        'AI-powered initial analysis', 
        'Summary report with insights',
        'Email support within 24 hours',
        'Community forum access'
      ],
      cta: 'Get Started Free',
      icon: <FaRocket className="w-6 h-6" />,
      gradient: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Advanced',
      price: '$49',
      period: 'per month',
      features: [
        'Everything in Basic plan',
        'Detailed AI diagnosis report',
        'Video consultation with specialists',
        'Priority email & chat support',
        'Personalized follow-up reports',
        'Medical record storage'
      ],
      cta: 'Choose Advanced',
      popular: true,
      icon: <FaStar className="w-6 h-6" />,
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: [
        'Everything in Advanced plan',
        'Unlimited video consultations',
        '24/7 dedicated support line',
        'Second opinion from top experts',
        'Personalized treatment plans',
        'Family plan coverage',
        'Emergency response team'
      ],
      cta: 'Choose Professional',
      icon: <FaCrown className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full w-96 h-96 opacity-20"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-purple-200 rounded-full w-80 h-80 opacity-20"></div>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            💰 TRANSPARENT PRICING
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Healthcare Plan
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Select the perfect plan for your thyroid health journey. 
            All plans include our industry-leading AI diagnosis technology.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative group ${
                plan.popular ? 'lg:scale-105 lg:-translate-y-4' : ''
              } transition-all duration-500`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute z-20 transform -translate-x-1/2 -top-4 left-1/2">
                  <div className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <FaStar className="w-4 h-4" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                plan.popular ? 'border-blue-500' : 'border-gray-100'
              } group-hover:border-blue-300 overflow-hidden`}>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative p-8">
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${plan.bgColor} mb-4 mx-auto`}>
                      <div className={`text-gray-700`}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-lg text-gray-500">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                        <span className="leading-relaxed text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:-translate-y-1 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-lg'
                  }`}>
                    {plan.cta}
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${plan.gradient} group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center max-w-2xl gap-8 px-8 py-6 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <FaCheck className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-semibold">30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <FaCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <FaCheck className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-semibold">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;