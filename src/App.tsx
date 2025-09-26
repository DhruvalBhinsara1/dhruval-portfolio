import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGrid from './components/ProjectsGrid';
import SkillsBadges from './components/SkillsBadges';
import AboutCard from './components/AboutCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <HeroSection />
      <ProjectsGrid />
      <SkillsBadges />
      <AboutCard />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
