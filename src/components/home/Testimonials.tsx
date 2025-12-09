import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Chief Endocrinologist',
      hospital: 'Mayo Clinic, New York',
      quote: 'ThyroCareX has revolutionized how we approach thyroid diagnosis. The AI    ',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Oncology Director',
      hospital: 'Johns Hopkins Hospital',
      quote: 'As an oncologist, I rely on ThyroCareX for quick and reliable thyroid cancer  .',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Thyroid Surgery Specialist',
      hospital: 'Cleveland Clinic',
      quote: 'The platform has transformed our surgical planning with detailed AI analysis.',
      image: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Medical Research Director',
      hospital: 'Harvard Medical School',
      quote: 'ThyroCareX represents the future of medical AI with outstanding algorithms.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Lisa Thompson',
      specialty: 'Pediatric Endocrinologist',
      hospital: 'Boston Children\'s Hospital',
      quote: 'For pediatric thyroid cases, ThyroCareX provides the precision we need.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Robert Martinez',
      specialty: 'Radiology Department Head',
      hospital: 'Stanford Medical Center',
      quote: 'The integration of AI with medical imaging is seamless and powerful.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Fatima Mohammed',
      specialty: 'Diagnostic Radiology Specialist',
      hospital: 'Dubai Hospital',
      quote: 'An amazing platform that helps us identify precise patterns in thyroid   .',
      image: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Dr. Ahmed Hassan',
      specialty: 'Chief Medical Officer',
      hospital: 'Cairo Medical Center',
      quote: 'Revolutionary platform that has improved our diagnostic accurac',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&h=120&fit=crop&crop=face',
      rating: 5,
    },
  ];

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="flex-shrink-0 w-[320px] mx-3">
      <div className="relative   p-5 bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
        {/* Quote Icon - Top Right Corner */}
        <div className="absolute top-2 right-2">
          <FaQuoteLeft className="w-8 h-8 text-primary opacity-20" />
        </div>

        {/* Author Info */}
        <div className="relative flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="object-cover w-14 h-14 border-2 border-primary rounded-xl"
            />
            {/* Animated Status Indicator - Flame/Pulse Effect */}
            <div className="absolute bottom-0 right-0 w-4 h-4">
              <div className="absolute inset-0 bg-primary rounded-full border-2 border-white animate-flame-pulse"></div>
              <div className="absolute inset-0 bg-primary rounded-full border-2 border-white opacity-75 animate-flame-pulse-delayed"></div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-gray-900 mb-1">
              {testimonial.name}
            </h4>
            {/* Star Rating - Directly Under Name */}
            <div className="flex items-center gap-1 mb-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className="w-3.5 h-3.5 text-amber-400" 
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {testimonial.hospital}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative">
          <p className="text-sm leading-relaxed text-gray-700">
            "{testimonial.quote}"
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            ⭐ Customer Reviews
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Medical Experts
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Discover why healthcare professionals worldwide choose ThyroCareX for accurate thyroid cancer diagnosis
          </p>
        </div>

        {/* Scrolling Testimonials Container */}
        <div className="relative">
          {/* Top Row - Scrolling Right */}
          <div className="mb-6 overflow-hidden">
            <div className="flex animate-scroll-right">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Bottom Row - Scrolling Left */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Join over <span className="font-bold text-primary">500+</span> medical professionals who trust ThyroCareX
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes flame-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
        }

        @keyframes flame-pulse-delayed {
          0%, 100% {
            transform: scale(1.2);
            opacity: 0;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.4;
          }
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-flame-pulse {
          animation: flame-pulse 1.5s ease-in-out infinite;
        }

        .animate-flame-pulse-delayed {
          animation: flame-pulse-delayed 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;