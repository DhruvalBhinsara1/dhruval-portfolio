import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { Suspense, lazy } from 'react';

function SectionFallback() {
  return <div className="min-h-24" aria-hidden="true" />;
}

const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'));
const AboutCard = lazy(() => import('./components/AboutCard'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ResumeSection = lazy(() => import('./components/ResumeSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const BackToTopButton = lazy(() => import('./components/BackToTopButton'));
const FluidCursor = lazy(() => import('./components/FluidCursor'));

function App() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white text-black snap-y snap-mandatory relative">
      {!isMobile && (
        <Suspense fallback={null}>
          <FluidCursor />
        </Suspense>
      )}
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<SectionFallback />}>
          <AboutCard />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<SectionFallback />}>
          <ProjectsGrid />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<SectionFallback />}>
          <ResumeSection />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<SectionFallback />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
