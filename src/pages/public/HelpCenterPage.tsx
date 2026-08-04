import { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { HelpCircle, UserCheck, ShieldCheck, CreditCard, Code, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const helpCategories = [
  {
    icon: UserCheck,
    title: 'Candidate Setup',
    count: 'Step 1',
    desc: 'Building your profile, connecting GitHub, and uploading projects.',
  },
  {
    icon: Code,
    title: 'Taking Assessments',
    count: 'Step 2',
    desc: 'Test environment rules, timers, scoring rubrics, and retry policies.',
  },
  {
    icon: ShieldCheck,
    title: 'Badges & Credentials',
    count: 'Step 3',
    desc: 'Verifying badges, sharing on LinkedIn, and public profile privacy.',
  },
  {
    icon: CreditCard,
    title: 'Billing & Subscriptions',
    count: 'Step 4',
    desc: 'Upgrading to Premium, team plans, invoicing, and cancellation.',
  },
];

const stepGuides = [
  {
    step: 'Step 1: Setting Up Your Candidate Profile & Portfolio',
    details: 'Sign up for a free candidate account and complete your basic bio. Connect your GitHub repository or upload your technical projects (up to 3 on the Free Tier) so the AI engine can analyze your code structure, commit history, and technical depth.',
  },
  {
    step: 'Step 2: Taking Your First Technical Assessment',
    details: 'Navigate to the Assessments section in your dashboard and select your tech domain (Software Engineering, AI, Cloud, DevOps, or Security). Follow the timed prompt to complete coding scenarios or architecture questions in an isolated sandbox.',
  },
  {
    step: 'Step 3: Reviewing Your AI Competency Report',
    details: 'Once submitted, our multimodal AI evaluates your code against objective industry rubrics. You will receive a breakdown of your score, code efficiency, architecture decisions, and strengths.',
  },
  {
    step: 'Step 4: Claiming & Sharing Your Verified Skill Badges',
    details: 'Earned skill badges are automatically attached to your public profile link. You can export PDF certificates, copy your verified profile link, or share your badge directly to LinkedIn for recruiters to view.',
  },
];

export default function HelpCenterPage() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <HelpCircle size={14} /> Help & Support Center
          </div>
          <h1>How Can We Help You Today?</h1>
          <p>
            Browse step-by-step guides to understand how to build your profile, complete AI assessments, and share verified badges.
          </p>
        </div>

        {/* Category Cards */}
        <div className="public-grid-4" style={{ marginBottom: '48px' }}>
          {helpCategories.map((cat) => (
            <div 
              key={cat.title} 
              className="public-feature-card" 
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div className="public-icon-badge" style={{ margin: 0 }}>
                  <cat.icon size={22} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', color: '#0f172a', textTransform: 'uppercase' }}>
                  {cat.count}
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', marginTop: 0, marginBottom: '8px' }}>
                {cat.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Step-by-Step Dropdown Guides */}
        <div className="public-page-body">
          <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Step-by-Step Platform Guide</h2>

          <div className="faq-accordion" style={{ marginBottom: '48px' }}>
            {stepGuides.map((guide, idx) => {
              const isOpen = openStep === idx;
              return (
                <div 
                  key={guide.step} 
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button 
                    type="button"
                    className="faq-accordion-header"
                    onClick={() => toggleStep(idx)}
                  >
                    <span className="faq-question">{guide.step}</span>
                    {isOpen ? (
                      <ChevronUp className="faq-icon" size={20} />
                    ) : (
                      <ChevronDown className="faq-icon" size={20} />
                    )}
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-body">
                      <p>{guide.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Support Box */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,88,190,0.06) 0%, rgba(0,63,138,0.02) 100%)', 
              borderRadius: '16px', 
              padding: '32px', 
              textAlign: 'center',
              border: '1px solid rgba(0,88,190,0.15)'
            }}
          >
            <div className="public-icon-badge" style={{ margin: '0 auto 16px' }}>
              <MessageSquare size={22} />
            </div>
            <h3 style={{ fontSize: '20px', marginTop: 0, marginBottom: '8px' }}>Still need help?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', maxWidth: '480px', margin: '0 auto 20px' }}>
              Our dedicated support team is available Monday through Friday to answer any questions.
            </p>
            <Link to="/contact" className="public-btn-primary">
              Contact Support Team
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
