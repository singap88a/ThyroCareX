import { FaUsers, FaStethoscope, FaUserMd, FaAward } from 'react-icons/fa';

const AboutStats = () => {
  const stats = [
    { icon: <FaUsers className="w-8 h-8" />, number: "50K+", label: "Patients Served", description: "Across 25+ countries" },
    { icon: <FaStethoscope className="w-8 h-8" />, number: "98%", label: "Accuracy Rate", description: "Clinical validation" },
    { icon: <FaUserMd className="w-8 h-8" />, number: "200+", label: "Medical Experts", description: "Global network" },
    { icon: <FaAward className="w-8 h-8" />, number: "15+", label: "Industry Awards", description: "Recognition excellence" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center w-20 h-20 mx-auto transition-transform duration-300 text-primary bg-primary/10 rounded-2xl group-hover:scale-110">
                {stat.icon}
              </div>
              <div className="mb-2 text-4xl font-bold text-gray-900">{stat.number}</div>
              <div className="mb-2 text-lg font-semibold text-gray-900">{stat.label}</div>
              <div className="text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
