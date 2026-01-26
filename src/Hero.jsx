import React from 'react';

function Hero({ scrollToSection }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">— The IoT Club —</div>
        
        <h1 className="hero-title">
          Building the Future of <span className="gradient-text">IoT</span>
        </h1>
        
        <p className="hero-description">
          Connecting minds, building the future. We explore the intersection of electronics, 
          programming, and innovation to create smart solutions for tomorrow's world.
        </p>
        
        <div className="hero-buttons">
          {/* FIX #3: Explore Projects button navigates to projects section */}
          <button 
            className="btn-with-arrow"
            onClick={() => scrollToSection('projects')}
          >
            Explore Projects
            <span className="arrow-icon">→</span>
          </button>
          
          {/* FIX #8: Changed "Join the Club" to "Contact Us" */}
          <button 
            className="btn-outline"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
          </button>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="floating-card card-1">
          <div className="card-icon">⚡</div>
          <div>Hardware</div>
        </div>
        <div className="floating-card card-2">
          <div className="card-icon">💻</div>
          <div>Software</div>
        </div>
        <div className="floating-card card-3">
          <div className="card-icon">🌐</div>
          <div>Network</div>
        </div>
      </div>

      <style>{`
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          min-height: calc(100vh - 80px);
          flex-wrap: wrap;
        }

        .hero-content {
          flex: 1;
          min-width: 300px;
        }

        .hero-badge {
          color: var(--primary-color);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-gray);
          margin-bottom: 2rem;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-outline {
          padding: 1rem 2rem;
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-outline:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px var(--glow-coral);
        }

        .hero-visual {
          flex: 1;
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-card {
          position: absolute;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
          animation: float 6s ease-in-out infinite;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .card-icon {
          font-size: 2rem;
        }

        .card-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .card-2 {
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .card-3 {
          bottom: 10%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-visual {
            min-height: 300px;
          }

          .floating-card {
            font-size: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;
