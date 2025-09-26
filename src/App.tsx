import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGrid from './components/ProjectsGrid';
import SkillsBadges from './components/SkillsBadges';
import AboutCard from './components/AboutCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

function App() {
  return (
    <div className="min-h-screen bg-white text-black snap-y snap-mandatory">
      <Navbar />
      <HeroSection />
      <AboutCard />
      <ProjectsGrid />
      <SkillsBadges />
      <ContactForm />
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default App;
