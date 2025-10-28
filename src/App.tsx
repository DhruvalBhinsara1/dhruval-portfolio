import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGrid from './components/ProjectsGrid';
import AboutCard from './components/AboutCard';
import SkillsSection from './components/SkillsSection';
import ResumeSection from './components/ResumeSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import FluidCursor from './components/FluidCursor';

function App() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white text-black snap-y snap-mandatory relative">
      <FluidCursor />
      <Navbar />
      <div className="relative z-10 pt-20">
        <HeroSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <AboutCard />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <ProjectsGrid />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <SkillsSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <ResumeSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <ContactForm />
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
}

export default App;
