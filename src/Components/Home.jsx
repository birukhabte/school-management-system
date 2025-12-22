import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Our <span className="highlight">School Management System</span></h1>
            <p className="hero-description">
              Our system helps schools manage students, teachers, classes, and more efficiently.
              Whether you are a student, teacher, or administrator, our platform simplifies school operations.
            </p>
            <div className="cta-buttons">
              <Link to="/Choose-user" className="primary-cta">Login</Link>
              <Link to="/Choose-user" className="secondary-cta">Register</Link>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-content">
            <h2 className="about-title">About</h2>
            <p className="about-text">This system is designed for educational institutions to streamline management processes.</p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Schools</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Students</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="services-list">
            <h2 className="section-title">Services / Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎓</div>
                <h3 className="feature-title">Student Management</h3>
                <p className="feature-description">Track student progress, attendance, and performance easily.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👩‍🏫</div>
                <h3 className="feature-title">Teacher Management</h3>
                <p className="feature-description">Manage teacher schedules, subject allocations, and payroll.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3 className="feature-title">Class Scheduling</h3>
                <p className="feature-description">Automated timetable generation and conflict resolution.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="contact-title">Contact</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">info@schoolmanagement.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+123-456-7890</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="footer-content">
          <p className="copyright">&copy; 2024 School Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Header = () => {
  return (
    <header className="home-header">
      <nav className="header-content">
        <Link to="/" className="logo">
          <h1>School Management System</h1>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/Choose-user" className="login-btn">Login</Link>
          <Link to="/Choose-user" className="register-btn">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Home;
