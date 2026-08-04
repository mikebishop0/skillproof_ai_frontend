import PublicLayout from '../../layouts/PublicLayout';
import { ShieldCheck, Cpu, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import bannerImg from '../../assets/bannerimg1.jpeg';
import globeImg from '../../assets/verification-globe.jpeg';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Verified Candidates', value: '50,000+' },
  { label: 'AI Evaluation Accuracy', value: '98.4%' },
  { label: 'Hiring Companies', value: '600+' },
  { label: 'Badges Issued', value: '120,000+' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Evidence Over Claims',
    desc: 'Self-reported resumes are out. Objective, AI-reviewed technical evidence is the future of hiring.',
  },
  {
    icon: Cpu,
    title: 'Multimodal AI Analysis',
    desc: 'Our engine evaluates code structure, problem-solving speed, and architecture design in real-time.',
  },
  {
    icon: Users,
    title: 'Equal Opportunity Hiring',
    desc: 'Bias-free assessment guarantees talent is judged strictly on verified technical capability.',
  },
  {
    icon: Award,
    title: 'Tamper-Proof Credentials',
    desc: 'Every badge is linked to a cryptographic public profile that recruiters can verify instantly.',
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <Sparkles size={14} /> About Zonopact SkillProof AI
          </div>
          <h1>Turning Skills Into Verifiable Evidence</h1>
          <p>
            We are building an AI-powered credential engine that transforms how candidates present their technical talent and how recruiters discover proven engineers.
          </p>
        </div>

        <div 
          style={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            marginBottom: '48px',
            border: '1px solid rgba(0,0,0,0.1)',
            maxHeight: '320px',
            position: 'relative'
          }}
        >
          <img 
            src={bannerImg} 
            alt="SkillProof AI Engine" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="public-grid-4" style={{ marginBottom: '56px' }}>
          {stats.map((s) => (
            <div key={s.label} className="public-feature-card" style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', color: 'var(--spai-verified)', marginBottom: '4px', marginTop: 0 }}>
                {s.value}
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="public-page-body">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Our Mission & Values</h2>
          <p style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px', color: '#64748b' }}>
            Traditional resumes leave hiring managers guessing. SkillProof AI eliminates the guesswork with objective, evidence-backed proof.
          </p>

          <div className="public-grid-2">
            {values.map((v) => (
              <div key={v.title} className="public-feature-card">
                <div className="public-icon-badge">
                  <v.icon size={22} />
                </div>
                <h3>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div 
            style={{ 
              marginTop: '56px', 
              background: 'linear-gradient(135deg, rgba(0,88,190,0.06) 0%, rgba(0,63,138,0.02) 100%)', 
              borderRadius: '16px', 
              padding: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '32px',
              border: '1px solid rgba(0,88,190,0.15)'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '22px', marginTop: 0, marginBottom: '10px' }}>Ready to prove your skills?</h3>
              <p style={{ fontSize: '15px', color: '#475569', marginBottom: '20px' }}>
                Join over 50,000 developers who use SkillProof AI to showcase real evidence to top tech recruiters.
              </p>
              <Link to="/register" className="public-btn-primary">
                Get Started Free <ArrowRight size={16} />
              </Link>
            </div>
            <img 
              src={globeImg} 
              alt="Verification Globe" 
              style={{ width: '180px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
