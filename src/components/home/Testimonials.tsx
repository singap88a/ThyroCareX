import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Chief Endocrinologist',
      hospital: 'Mayo Clinic, New York',
      quote: 'ThyroCareX has revolutionized how we approach thyroid diagnosis. The AI accuracy is remarkable, helping us detect early-stage cancer with 98% precision.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Oncology Director',
      hospital: 'Johns Hopkins Hospital',
      quote: 'As an oncologist, I rely on ThyroCareX for quick and reliable thyroid cancer assessments. The platform reduced our diagnosis time from weeks to hours.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Thyroid Surgery Specialist',
      hospital: 'Cleveland Clinic',
      quote: 'The platform has transformed our surgical planning. With detailed AI analysis, we can now perform minimally invasive procedures with greater confidence.',
      image: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Medical Research Director',
      hospital: 'Harvard Medical School',
      quote: 'ThyroCareX represents the future of medical AI. Its deep learning algorithms consistently outperform traditional diagnostic methods.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Lisa Thompson',
      specialty: 'Pediatric Endocrinologist',
      hospital: 'Boston Children\'s Hospital',
      quote: 'For pediatric thyroid cases, accuracy is everything. ThyroCareX provides the precision we need while being gentle for young patients.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Robert Martinez',
      specialty: 'Radiology Department Head',
      hospital: 'Stanford Medical Center',
      quote: 'The integration of AI with medical imaging is seamless. ThyroCareX helps identify subtle patterns in thyroid scans that were previously undetectable.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = testimonials.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <section className="relative py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Medical Experts
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Discover why leading healthcare professionals worldwide choose ThyroCareX for accurate thyroid cancer diagnosis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={currentIndex * 3 + index}
              className="flex flex-col h-full p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
            >
              {/* Author Info - Top */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-14 h-14 rounded-xl"
                  />
                  {/* Green dot indicator */}
                  <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="mb-1 text-sm text-gray-600">{testimonial.specialty}</p>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="flex-shrink-0 w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{testimonial.hospital}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="flex-1 mb-4">
                <FaQuoteLeft className="w-5 h-5 mb-3 text-gray-300" />
                <p className="text-sm leading-relaxed text-gray-700">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Line Pagination */}
        <div className="flex items-center justify-center gap-3">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'w-8 bg-green-500' 
                  : 'w-4 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;