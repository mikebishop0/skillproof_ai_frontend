import { Globe, Share2, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './footer.css';

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Subscribed (backend not connected yet)');
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark">S</span>SkillProof AI
            </div>
            <p>Turn skills into verifiable evidence with AI.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><Share2 size={15} /></a>
              <a href="#" aria-label="LinkedIn"><MessageCircle size={15} /></a>
              <a href="#" aria-label="YouTube"><Globe size={15} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <a href="/#features">Features</a>
            <Link to="/pricing">Pricing</Link>
            <span>Assessments</span>
            <span>Badges</span>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <span>About Us</span>
            <span>Careers</span>
            <span>Blog</span>
            <span>Contact</span>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <span>Help Center</span>
            <span>FAQ</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>

          <div className="footer-col newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} SkillProof AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
