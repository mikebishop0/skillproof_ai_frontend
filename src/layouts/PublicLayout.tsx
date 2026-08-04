import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import logo from '../assets/logo1.png';
import './publicLayout.css';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout-page spai-landing">
      <nav>
        <div className="wrap">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="SkillProof AI" className="logo-img" />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">How it Works</Link>
            <Link to="/features">Features</Link>
            <Link to="/recruiters">Recruiters</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="public-layout-content">
        <div className="wrap">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
