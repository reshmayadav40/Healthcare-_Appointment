import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiAward, FiUsers, FiClock, FiShield } from "react-icons/fi";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">MediCare Portal</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <Link to="/login" className="nav-btn nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn nav-btn-signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Health, 
            <span className="gradient-text"> Our Priority</span>
          </h1>
          <p className="hero-subtitle">
            Schedule appointments with top doctors, manage medical records, and take control of your health all in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-hero btn-hero-primary">
              Get Started <FiArrowRight />
            </Link>
            <Link to="/login" className="btn btn-hero btn-hero-secondary">
              Login
            </Link>
          </div>
          <p className="hero-hint">✨ No credit card required. Start free today.</p>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-card card-1">📋</div>
            <div className="graphic-card card-2">💊</div>
            <div className="graphic-card card-3">🏆</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Why Choose MediCare?</h2>
          <p>Everything you need for better healthcare management</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Find Doctors</h3>
            <p>Search and filter doctors by specialty, location, and availability. Find the perfect doctor for your needs.</p>
            <ul className="feature-list">
              <li><FiCheck /> Filter by specialty</li>
              <li><FiCheck /> Check availability</li>
              <li><FiCheck /> View ratings</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Book Appointments</h3>
            <p>Easily schedule appointments in just 3 steps. Get instant confirmation and receive reminders.</p>
            <ul className="feature-list">
              <li><FiCheck /> Quick booking</li>
              <li><FiCheck /> Multiple time slots</li>
              <li><FiCheck /> Instant confirmation</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Medical Records</h3>
            <p>Keep all your medical records in one secure place. Access lab reports and health vitals anytime.</p>
            <ul className="feature-list">
              <li><FiCheck /> Secure storage</li>
              <li><FiCheck /> Lab reports</li>
              <li><FiCheck /> Health vitals</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Health Dashboard</h3>
            <p>Track your health journey with a comprehensive dashboard. Get personalized health tips and statistics.</p>
            <ul className="feature-list">
              <li><FiCheck /> Health statistics</li>
              <li><FiCheck /> Health tips</li>
              <li><FiCheck /> Progress tracking</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Profile Management</h3>
            <p>Manage your personal information easily. Update your profile and health information anytime.</p>
            <ul className="feature-list">
              <li><FiCheck /> Easy editing</li>
              <li><FiCheck /> Health info</li>
              <li><FiCheck /> Preferences</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your health data is encrypted and protected. We follow industry-standard security practices.</p>
            <ul className="feature-list">
              <li><FiCheck /> End-to-end encryption</li>
              <li><FiCheck /> HIPAA compliant</li>
              <li><FiCheck /> Data privacy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Expert Doctors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in 4 simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up with your email and basic health information in less than 2 minutes.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Find Doctor</h3>
            <p>Browse and filter doctors by specialty, location, and availability.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Book Appointment</h3>
            <p>Select date and time that works best for you in just 3 steps.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Care</h3>
            <p>Meet your doctor and receive quality healthcare. Keep your records safe.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>Join thousands of users who trust MediCare for their healthcare needs.</p>
          <Link to="/signup" className="btn btn-cta">
            Create Free Account Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Doctor Search</a></li>
              <li><a href="#services">Appointments</a></li>
              <li><a href="#services">Medical Records</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#social">Facebook</a></li>
              <li><a href="#social">Twitter</a></li>
              <li><a href="#social">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 MediCare Portal. All rights reserved.</p>
          <p>Secure Healthcare Management System</p>
        </div>
      </footer>
    </div>
  );
}
