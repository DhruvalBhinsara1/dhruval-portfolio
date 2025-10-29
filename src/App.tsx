import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';

function delayImport<T>(promise: Promise<T>): Promise<T> {
  return new Promise(resolve => setTimeout(() => promise.then(resolve), 2000));
}
const ProjectsGrid = lazy(() => delayImport(import('./components/ProjectsGrid')));
const AboutCard = lazy(() => delayImport(import('./components/AboutCard')));
const SkillsSection = lazy(() => delayImport(import('./components/SkillsSection')));
const ResumeSection = lazy(() => delayImport(import('./components/ResumeSection')));
const ContactForm = lazy(() => delayImport(import('./components/ContactForm')));
const Footer = lazy(() => delayImport(import('./components/Footer')));
const BackToTopButton = lazy(() => delayImport(import('./components/BackToTopButton')));
const FluidCursor = lazy(() => delayImport(import('./components/FluidCursor')));

function App() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white text-black snap-y snap-mandatory relative">
      {!isMobile && (
        <Suspense fallback={<LoadingScreen />}>
          <FluidCursor />
        </Suspense>
      )}
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<LoadingScreen />}>
          <AboutCard />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<LoadingScreen />}>
          <ProjectsGrid />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<LoadingScreen />}>
          <SkillsSection />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<LoadingScreen />}>
          <ResumeSection />
        </Suspense>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <Suspense fallback={<LoadingScreen />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={<LoadingScreen />}>
          <Footer />
        </Suspense>
        <Suspense fallback={<LoadingScreen />}>
          <BackToTopButton />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
