import React, { Suspense, lazy } from 'react';

// Lazy load all components for better performance
const Hero = lazy(() => import('../../components/home/Hero'));
const Features = lazy(() => import('../../components/home/Features'));
const HowItWorks = lazy(() => import('../../components/home/HowItWorks'));
const Statistics = lazy(() => import('../../components/home/Statistics'));
const Pricing = lazy(() => import('../../components/home/Pricing'));
const Testimonials = lazy(() => import('../../components/home/Testimonials'));
const FAQ = lazy(() => import('../../components/home/FAQ'));
const Newsletter = lazy(() => import('../../components/home/Newsletter'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Features />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Statistics />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default Home;
