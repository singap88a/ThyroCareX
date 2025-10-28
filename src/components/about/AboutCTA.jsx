const AboutCTA = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Ready to Transform
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
            Thyroid Care?
          </span>
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
          Join thousands of medical professionals and patients who trust ThyroCareX
          for accurate, AI-powered thyroid cancer diagnosis.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl">
            Get Started Today
          </button>
          <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
