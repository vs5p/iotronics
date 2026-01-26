import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import WhatsHappening from './components/WhatsHappening';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // FIX #1: Check if animation has already played
    const hasPlayedAnimation = sessionStorage.getItem('iotronicsAnimationPlayed');
    
    if (hasPlayedAnimation) {
      // Skip animation if already played
      setShowLoading(false);
    } else {
      // Play animation and mark as played
      const timer = setTimeout(() => {
        setShowLoading(false);
        sessionStorage.setItem('iotronicsAnimationPlayed', 'true');
      }, 3000); // 3 second animation

      return () => clearTimeout(timer);
    }
  }, []);

  // FIX #7: Error handling for missing images
  useEffect(() => {
    const handleImageError = (e) => {
      if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        e.target.style.display = 'none';
      }
    };

    document.addEventListener('error', handleImageError, true);
    return () => document.removeEventListener('error', handleImageError, true);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      {/* Loading Animation - Only shows once */}
      {showLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="logo-animation">
              <div className="circuit-ring"></div>
              <div className="logo-text">IoTRONICS</div>
            </div>
            <div className="loading-bar"></div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            IoTRONICS
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className={activeSection === 'features' ? 'active' : ''}>
              Features
            </button>
            <button onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section id="home">
          <Hero scrollToSection={scrollToSection} />
        </section>
        
        <section id="features">
          <Features />
        </section>
        
        <section id="happening">
          <WhatsHappening />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        
        <Footer />
      </main>
    </div>
  );
}

export default App;
