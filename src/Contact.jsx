import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // FIX #4: Email changed to iotronics@nmit.ac.in
    const mailtoLink = `mailto:iotronics@nmit.ac.in?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have questions about joining the club, collaborating on projects, or just want to say hi? We'd love to hear from you!
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card card">
            <div className="info-icon">📧</div>
            <h3>Email Us</h3>
            {/* FIX #4: Changed email to iotronics@nmit.ac.in */}
            <a href="mailto:iotronics@nmit.ac.in" className="info-link">
              iotronics@nmit.ac.in
            </a>
          </div>

          <div className="info-card card">
            <div className="info-icon">📍</div>
            <h3>Location</h3>
            <p>NMIT Campus, Bangalore</p>
          </div>

          <div className="info-card card">
            <div className="info-icon">🕐</div>
            <h3>Club Hours</h3>
            <p>Mon - Fri: 4:00 PM - 7:00 PM</p>
            <p>Sat: 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        <form className="contact-form card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us more..."
            ></textarea>
          </div>

          <button type="submit" className="btn-with-arrow">
            Send Message
            <span className="arrow-icon">→</span>
          </button>
        </form>
      </div>

      <style>{`
        .contact {
          padding: 6rem 2rem;
          background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 100%);
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          padding: 1.5rem;
          text-align: center;
        }

        .info-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .info-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-light);
        }

        .info-card p {
          color: var(--text-gray);
          margin: 0.25rem 0;
        }

        .info-link {
          color: var(--primary-color);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-link:hover {
          color: var(--secondary-color);
        }

        .contact-form {
          padding: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-light);
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-light);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .contact-form button[type="submit"] {
          margin-top: 1rem;
        }

        @media (max-width: 968px) {
          .contact-container {
            grid-template-columns: 1fr;
          }

          .contact-info {
            grid-row: 2;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
