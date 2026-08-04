import PublicLayout from '../../layouts/PublicLayout';
import { ShieldCheck, Lock, Eye, Server, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <ShieldCheck size={14} /> Legal & Compliance
          </div>
          <h1>Privacy Policy</h1>
        </div>

        {/* Key Highlights Callout */}
        <div 
          style={{ 
            background: 'rgba(0, 88, 190, 0.04)', 
            border: '1px solid rgba(0, 88, 190, 0.15)', 
            borderRadius: '14px', 
            padding: '24px 28px', 
            marginBottom: '40px' 
          }}
        >
          <h3 style={{ fontSize: '16px', color: 'var(--spai-verified)', marginTop: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} /> Privacy Highlights
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569' }}>
            <li>We do not sell your personal or candidate evaluation data to third parties.</li>
            <li>Public profile information (badges & project reviews) is only displayed if you choose to make it public.</li>
            <li>Code submitted for assessment is strictly evaluated in isolated sandboxes and never used to train public LLM models.</li>
          </ul>
        </div>

        <div className="public-page-body">
          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={20} style={{ color: 'var(--spai-verified)' }} /> 1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when setting up your account, creating your candidate profile, uploading code projects, or participating in skill assessments. This includes your name, email address, code repository links, and generated AI competency scores.
            </p>
          </div>

          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={20} style={{ color: 'var(--spai-verified)' }} /> 2. How We Use Your Data
            </h2>
            <p>
              Your data is exclusively utilized to power the SkillProof AI evaluation engine, issue verifiable badges, optimize your candidate dashboard, and allow recruiters to review your proven competencies when you share your profile link.
            </p>
          </div>

          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} style={{ color: 'var(--spai-verified)' }} /> 3. Data Rights & Control
            </h2>
            <p>
              You maintain full ownership of your portfolio uploads. You can update, export, or delete your account and associated skill report records at any time directly through your Candidate Settings.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
