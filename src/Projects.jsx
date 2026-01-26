import React from 'react';

function Projects() {
  const projects = [
    {
      title: 'Smart Agriculture System',
      description: 'IoT-based automated irrigation system with soil moisture sensors and weather API integration.',
      tech: ['ESP32', 'Sensors', 'Cloud'],
      image: '🌾'
    },
    {
      title: 'Health Monitoring Device',
      description: 'Wearable device for real-time health vitals tracking with mobile app integration.',
      tech: ['Arduino', 'Bluetooth', 'App'],
      image: '💊'
    },
    {
      title: 'Smart Campus Security',
      description: 'AI-powered surveillance system with facial recognition and automated alerts.',
      tech: ['RPi', 'AI/ML', 'Camera'],
      image: '🔒'
    },
    {
      title: 'Energy Management System',
      description: 'Monitor and optimize energy consumption in buildings using smart meters.',
      tech: ['IoT', 'Dashboard', 'Analytics'],
      image: '⚡'
    }
  ];

  return (
    <div className="projects">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">
          Explore innovative IoT solutions built by our talented team members
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card card" key={index}>
            <div className="project-image">
              <div className="project-emoji">{project.image}</div>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <button className="project-link btn-with-arrow">
                View Details
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .projects {
          padding: 6rem 2rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .project-image {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-emoji {
          font-size: 5rem;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        }

        .project-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-light);
        }

        .project-description {
          color: var(--text-gray);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          color: var(--primary-color);
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .project-link {
          align-self: flex-start;
          padding: 0.75rem 1.5rem;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Projects;
