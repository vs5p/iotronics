import React from 'react';

function Features() {
  const features = [
    {
      icon: '🔧',
      title: 'Hardware Development',
      description: 'Design and build IoT devices using Arduino, ESP32, Raspberry Pi, and custom PCBs.'
    },
    {
      icon: '💻',
      title: 'Software Integration',
      description: 'Develop firmware, mobile apps, and cloud platforms to power smart devices.'
    },
    {
      icon: '🌐',
      title: 'Network & Connectivity',
      description: 'Explore WiFi, Bluetooth, LoRa, and other protocols for seamless communication.'
    },
    {
      icon: '🔬',
      title: 'Innovation Labs',
      description: 'Experiment with cutting-edge technologies in our state-of-the-art lab space.'
    },
    {
      icon: '📚',
      title: 'Workshops & Training',
      description: 'Regular hands-on sessions to learn new skills and stay updated with trends.'
    },
    {
      icon: '🏆',
      title: 'Competitions',
      description: 'Participate in hackathons, tech fests, and national-level competitions.'
    }
  ];

  return (
    <div className="features">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">
          Explore our core activities and learn what makes IoTRONICS unique
        </p>
      </div>

      <div className="grid grid-3">
        {features.map((feature, index) => (
          <div className="card feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        .features {
          padding: 6rem 2rem;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--text-gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem;
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .feature-card:nth-child(2) .feature-icon {
          animation-delay: 0.2s;
        }

        .feature-card:nth-child(3) .feature-icon {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-light);
        }

        .feature-description {
          color: var(--text-gray);
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Features;
