import PublicLayout from '../../layouts/PublicLayout';
import { Briefcase, Globe, Heart, Zap, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const perks = [
  { icon: Globe, title: '100% Remote-First', desc: 'Work from anywhere in the world with flexible asynchronous hours.' },
  { icon: Zap, title: 'AI Research Stipend', desc: '$3,000 annual budget for AI courses, conferences, and equipment.' },
  { icon: Heart, title: 'Comprehensive Health', desc: 'Full medical, dental, and vision coverage for you and dependents.' },
  { icon: Award, title: 'Competitive Equity', desc: 'Early employee stock options with long-term vesting.' },
];

export default function CareersPage() {
  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <Briefcase size={14} /> Work at SkillProof AI
          </div>
          <h1>Help Us Build the Future of Talent Verification</h1>
          <p>
            We are a high-velocity team of engineers, AI researchers, and product designers on a mission to end resume fraud and empower skilled individuals worldwide.
          </p>
        </div>

        <div className="public-grid-4" style={{ marginBottom: '56px' }}>
          {perks.map((p) => (
            <div key={p.title} className="public-feature-card">
              <div className="public-icon-badge">
                <p.icon size={22} />
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="public-page-body" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Open Roles Coming Soon</h2>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', marginBottom: '28px' }}>
            While there aren’t any active openings right now, we welcome conversations with people who care deeply about this mission. Let us know how you see yourself adding value.
          </p>

          <Link to="/contact" className="public-btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
