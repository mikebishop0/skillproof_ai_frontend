import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import './navbar.css';

interface NavbarProps {
  activePage?: 'how-it-works' | 'features' | 'recruiters' | 'pricing' | 'none';
}

export default function Navbar({ activePage = 'none' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <nav className="spai-public-nav">
      <div className="wrap nav-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={activePage === 'how-it-works' ? 'active' : ''}>How it Works</Link>
          <Link to="/features" className={activePage === 'features' ? 'active' : ''}>Features</Link>
          <Link to="/recruiters" className={activePage === 'recruiters' ? 'active' : ''}>Recruiters</Link>
          <Link to="/pricing" className={activePage === 'pricing' ? 'active' : ''}>Pricing</Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="nav-cta desktop-only">
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          type="button" 
          className="nav-mobile-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="currentColor">
              <path d="M342.6 150.6c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L237.3 256l150.6 150.6c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 301.3 41.4 451.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L146.7 256-3.9 105.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 210.7 342.6 60.1c12.5-12.5 32.8-12.5 45.3 0z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="currentColor">
              <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 337.7 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer/Menu Overlay */}
      <div className={`nav-mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className={activePage === 'how-it-works' ? 'active' : ''} onClick={() => setIsOpen(false)}>How it Works</Link>
          <Link to="/features" className={activePage === 'features' ? 'active' : ''} onClick={() => setIsOpen(false)}>Features</Link>
          <Link to="/recruiters" className={activePage === 'recruiters' ? 'active' : ''} onClick={() => setIsOpen(false)}>Recruiters</Link>
          <Link to="/pricing" className={activePage === 'pricing' ? 'active' : ''} onClick={() => setIsOpen(false)}>Pricing</Link>
          <div className="mobile-cta-divider" />
          <Link to="/login" className="btn btn-ghost mobile-btn" onClick={() => setIsOpen(false)}>Log In</Link>
          <Link to="/register" className="btn btn-primary mobile-btn" onClick={() => setIsOpen(false)}>Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
