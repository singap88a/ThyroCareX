 

 import Hero from '../../components/home/Hero';
import Features from '../../components/home/Features';
import HowItWorks from '../../components/home/HowItWorks';
import AboutPreview from '../../components/home/AboutPreview';
import Statistics from '../../components/home/Statistics';
import Pricing from '../../components/home/Pricing';
import Testimonials from '../../components/home/Testimonials';
import FAQ from '../../components/home/FAQ';
import Newsletter from '../../components/home/Newsletter';
import Partners from '../../components/home/Partners';
 
const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      {/* <AboutPreview /> */}
      <Statistics />
      <Pricing />
      <Testimonials />
      <FAQ />
      {/* <Partners /> */}
            <Newsletter />

    </div>
  );
};

export default Home;
