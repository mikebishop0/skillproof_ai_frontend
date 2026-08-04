import PublicLayout from '../../layouts/PublicLayout';
import { Scale, ShieldCheck, UserCheck, AlertTriangle, FileCheck } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <Scale size={14} /> Platform Agreement
          </div>
          <h1>Terms of Service</h1>
        </div>

        {/* Highlights Callout */}
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
            <FileCheck size={18} /> Terms Overview
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569' }}>
            <li>Candidates must submit original, un-cheated code for assessment verification.</li>
            <li>Recruiters receive free profile browsing to evaluate candidate reports.</li>
            <li>Zonopact retains all intellectual property rights to the SkillProof AI engine.</li>
          </ul>
        </div>

        <div className="public-page-body">
          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={20} style={{ color: 'var(--spai-verified)' }} /> 1. Account Integrity & Acceptance
            </h2>
            <p>
              By creating an account on Zonopact SkillProof AI, you agree to comply with all platform rules. You are responsible for safeguarding your login credentials and maintaining accurate profile details.
            </p>
          </div>

          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} style={{ color: 'var(--spai-verified)' }} /> 2. Assessment Fair Play
            </h2>
            <p>
              Attempting to manipulate assessment timers, proxy-test for another individual, or submit plagiarized code repositories will result in immediate revocation of earned badges and account suspension.
            </p>
          </div>

          <div className="public-feature-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--spai-verified)' }} /> 3. Service Guarantee & Disclaimers
            </h2>
            <p>
              While SkillProof AI utilizes state-of-the-art multimodal evaluation rubrics, skill badges represent automated objective assessments and do not constitute a formal employment guarantee between candidates and recruiters.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
