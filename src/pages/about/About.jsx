import AboutHero from '../../components/about/AboutHero';
import AboutStats from '../../components/about/AboutStats';
import AboutPrinciples from '../../components/about/AboutPrinciples';
import AboutTeam from '../../components/about/AboutTeam';
import AboutTimeline from '../../components/about/AboutTimeline';
// import AboutCTA from '../../components/about/AboutCTA';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutStats />
      <AboutPrinciples />
      <AboutTeam />
      <AboutTimeline />
      {/* <AboutCTA /> */}
    </div>
  );
};

export default About;
