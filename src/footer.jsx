import React from 'react';

function Footer() {
  // FIX #6: Social media links added to footer logos
  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://www.instagram.com/iotronics.nmit?igsh=MT',
      color: '#E4405F'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://in.linkedin.com/in/iotronics-the-iot-club-997a21333',
      color: '#0077B5'
    },
    ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">IoTRONICS</h3>
          <p className="footer-description">
            Building the future of IoT, one project at a time. 
            Join us in exploring the endless possibilities of connected technology.
          </p>
          
          {/* FIX #6: Added clickable social media links */}
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={social.name}
                style={{ '--hover-color': social.color }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <button onClick={() => scrollToSection(link.id)} className="footer-link">
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact Info</h4>
          <div className="contact-details">
            {/* FIX #4: Changed email to iotronics@nmit.ac.in */}
            <a href="mailto:iotronics@nmit.ac.in" className="contact-item">
              <span className="contact-icon">📧</span>
              iotronics@nmit.ac.in
            </a>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              NMIT, Bangalore
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              Mon-Sat: 10AM - 7PM
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} IoTRONICS. All rights reserved.</p>
          <p className="footer-credits">Made with ❤️ by IoTRONICS Team</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          padding: 4rem 2rem 2rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .footer-description {
          color: var(--text-gray);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .footer-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        /* FIX #6: Social Links Styling */
        .social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-light);
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .social-link:hover {
          transform: translateY(-3px);
          border-color: var(--hover-color);
          box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
          background: var(--hover-color);
          color: white;
        }

        .social-icon {
          font-size: 1.5rem;
        }

        .social-name {
          font-size: 0.9rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          background: none;
          border: none;
          color: var(--text-gray);
          cursor: pointer;
          padding: 0;
          font-size: 1rem;
          text-align: left;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary-color);
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-gray);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item:hover {
          color: var(--primary-color);
        }

        .contact-icon {
          font-size: 1.25rem;
        }

        .footer-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0 auto 2rem;
          max-width: 1200px;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-copyright {
          text-align: center;
          color: var(--text-gray);
          font-size: 0.9rem;
        }

        .footer-copyright p {
          margin: 0.25rem 0;
        }

        .footer-credits {
          color: var(--text-gray);
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          .footer-links {
            align-items: center;
          }

          .footer-link {
            text-align: center;
          }

          .contact-details {
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
