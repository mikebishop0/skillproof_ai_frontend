import { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Your message has been sent! Our team will get back to you shortly.');
  };

  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <MessageSquare size={14} /> Contact Us
          </div>
          <h1>Get in Touch with SkillProof AI</h1>
          <p>
            Have questions about skill verification, recruiter access, or custom team plans? Send us a message and our team will respond within 24 hours.
          </p>
        </div>

        <div className="public-grid-3" style={{ marginBottom: '48px' }}>
          <div className="public-feature-card" style={{ textAlign: 'center' }}>
            <div className="public-icon-badge" style={{ margin: '0 auto 16px' }}>
              <Mail size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--spai-claim)', marginBottom: '6px' }}>Email Support</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Direct email response</p>
            <a href="mailto:support@zonopact.com" style={{ color: 'var(--spai-verified)', fontSize: '14px' }}>
              support@zonopact.com
            </a>
          </div>

          <div className="public-feature-card" style={{ textAlign: 'center' }}>
            <div className="public-icon-badge" style={{ margin: '0 auto 16px' }}>
              <MapPin size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--spai-claim)', marginBottom: '6px' }}>Headquarters</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Zonopact Tech Center</p>
            <span style={{ color: '#64748b', fontSize: '14px' }}>Silicon Valley, CA</span>
          </div>

          <div className="public-feature-card" style={{ textAlign: 'center' }}>
            <div className="public-icon-badge" style={{ margin: '0 auto 16px' }}>
              <Clock size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--spai-claim)', marginBottom: '6px' }}>Support Hours</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Monday - Friday</p>
            <span style={{ color: '#64748b', fontSize: '14px' }}>9:00 AM - 6:00 PM EST</span>
          </div>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', background: '#f8fafc', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div className="public-icon-badge" style={{ margin: '0 auto 20px', width: '64px', height: '64px' }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--spai-claim)' }}>Message Received!</h2>
              <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Thank you for contacting us, <strong>{formData.name}</strong>. We have sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <button 
                type="button"
                className="public-btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="public-form" onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--spai-claim)', marginTop: 0, marginBottom: '24px', textAlign: 'left' }}>
                Send a Message
              </h2>

              <div className="public-grid-2" style={{ margin: 0, gap: '16px' }}>
                <div className="public-form-group">
                  <label htmlFor="contact-name">Your Full Name *</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="e.g. Mayur Ramgir" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="public-form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    placeholder="name@company.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="public-grid-2" style={{ margin: 0, gap: '16px' }}>
                <div className="public-form-group">
                  <label htmlFor="contact-category">Inquiry Category</label>
                  <select 
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>General Inquiry</option>
                    <option>Candidate Assessment Help</option>
                    <option>Recruiter Partnership</option>
                    <option>Enterprise Plans</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="public-form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input 
                    id="contact-subject"
                    type="text" 
                    placeholder="Brief description" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="public-form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea 
                  id="contact-message"
                  rows={5} 
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="public-btn-primary" style={{ marginTop: '8px' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
