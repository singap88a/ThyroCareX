import { FaHandshake, FaAward, FaRocket, FaShieldAlt } from 'react-icons/fa';

const Partners = () => {
 

  const features = [
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Strategic Partnerships",
      description: "Collaborating with top medical institutions"
    },
    {
      icon: <FaAward className="w-6 h-6" />,
      title: "Certified Excellence",
      description: "Approved by leading healthcare authorities"
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Innovation Driven",
      description: "Partnering with technology pioneers"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Trusted Security",
      description: "HIPAA compliant partnerships"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-full w-96 h-96 opacity-40"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-purple-100 rounded-full w-80 h-80 opacity-40"></div>
      
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            🤝 TRUSTED PARTNERSHIPS
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Working with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Global Leaders
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Collaborating with world-renowned medical institutions, research centers, 
            and technology pioneers to advance thyroid cancer diagnosis and treatment.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="p-6 text-center transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

 
 
      </div>
    </section>
  );
};

export default Partners;