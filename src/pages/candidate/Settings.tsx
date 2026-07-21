import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck, KeyRound, Award, AlertTriangle } from 'lucide-react';
import { candidate, badges } from '../../data/candidateMock';

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="switch-row">
      <div>
        <div className="switch-label">{label}</div>
        <div className="switch-desc">{description}</div>
      </div>
      <div
        className={`toggle ${value ? 'on' : ''}`}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
      >
        <div className="toggle-dot" />
      </div>
    </div>
  );
}

export default function Settings() {
  const [email, setEmail] = useState('mayur.ramgir@example.com');
  const [publicProfile, setPublicProfile] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);
  const [emailOnReview, setEmailOnReview] = useState(true);
  const [emailOnBadge, setEmailOnBadge] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  const saveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account settings saved (backend not connected yet)');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Settings</div>
        <h1>Account settings</h1>
        <p>Manage your login, notifications, and privacy.</p>
      </div>

      <div className="settings-layout">
        <div>
          <form onSubmit={saveAccount} className="card" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>Account</h2>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">New password</label>
              <input id="password" type="password" placeholder="Leave blank to keep current password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </form>

          <div className="card" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Privacy</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 8 }}>
              Control who can see your evidence-based profile.
            </p>
            <ToggleRow
              label="Public profile"
              description="Anyone with the link can view your profile without logging in"
              value={publicProfile}
              onChange={setPublicProfile}
            />
            <ToggleRow
              label="Show in recruiter search"
              description="Let recruiters discover your profile by skill and badge search"
              value={showInSearch}
              onChange={setShowInSearch}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Notifications</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 8 }}>
              Choose what we email you about.
            </p>
            <ToggleRow
              label="AI review completed"
              description="Get notified when a project or assessment is scored"
              value={emailOnReview}
              onChange={setEmailOnReview}
            />
            <ToggleRow
              label="Badge earned"
              description="Get notified when you earn a new verified badge"
              value={emailOnBadge}
              onChange={setEmailOnBadge}
            />
            <ToggleRow
              label="Product updates"
              description="Occasional emails about new SkillProof AI features"
              value={productUpdates}
              onChange={setProductUpdates}
            />
          </div>
        </div>

        <div>
          <div className="card settings-side-card" style={{ marginBottom: 20 }}>
            <div className="settings-side-icon">
              <ShieldCheck size={20} />
            </div>
            <div className="settings-side-label">Current plan</div>
            <div className="settings-side-value" style={{ textTransform: 'capitalize' }}>{candidate.plan}</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              {candidate.plan === 'free'
                ? 'Upgrade for unlimited projects and AI career coaching.'
                : 'Thanks for supporting SkillProof AI.'}
            </p>
            <Link to="/dashboard/billing" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              Manage billing
            </Link>
          </div>

          <div className="card settings-side-card" style={{ marginBottom: 20 }}>
            <div className="settings-side-icon">
              <Award size={20} />
            </div>
            <div className="settings-side-label">Badges earned</div>
            <div className="settings-side-value">{badges.length}</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              Verified skills strengthen your public profile and search ranking.
            </p>
            <Link to="/dashboard/badges" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              View badges
            </Link>
          </div>

          <div className="card settings-side-card" style={{ marginBottom: 20 }}>
            <div className="settings-side-icon">
              <KeyRound size={20} />
            </div>
            <div className="settings-side-label">Security tip</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginTop: 8 }}>
              Use a unique password of at least 12 characters and update it every few months to
              keep your evidence trail secure.
            </p>
          </div>

          <div className="card settings-danger-card">
            <div className="settings-side-icon settings-danger-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="settings-side-label">Danger zone</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              Deactivating removes your public profile and evidence trail from recruiter search.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', color: 'var(--spai-danger)', borderColor: 'var(--spai-danger)' }}
              onClick={() => toast('Account deactivation is not connected yet')}
            >
              Deactivate account
            </button>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 20, color: 'var(--spai-slate)', fontSize: 13 }}>
        Logged in as {candidate.name} {candidate.plan} plan
      </p>
    </div>
  );
}
