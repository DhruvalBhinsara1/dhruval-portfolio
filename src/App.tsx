import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGrid from './components/ProjectsGrid';
import AboutCard from './components/AboutCard';
import ResumeSection from './components/ResumeSection';
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
  <ResumeSection />
      <ContactForm />
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default App;
