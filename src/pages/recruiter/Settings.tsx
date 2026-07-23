import { useState } from 'react';
import toast from 'react-hot-toast';
import { ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';

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
      <div className={`toggle ${value ? 'on' : ''}`} role="switch" aria-checked={value} onClick={() => onChange(!value)}>
        <div className="toggle-dot" />
      </div>
    </div>
  );
}

export default function RecruiterSettings() {
  const [email, setEmail] = useState('recruiter@cloudscale.io');
  const [emailOnNewCandidate, setEmailOnNewCandidate] = useState(true);
  const [emailOnInterview, setEmailOnInterview] = useState(true);
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
        <p>Manage your login and notification preferences.</p>
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

          <div className="card">
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Notifications</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 8 }}>
              Choose what we email you about.
            </p>
            <ToggleRow
              label="New matching candidate"
              description="Get notified when a candidate matching your saved searches joins"
              value={emailOnNewCandidate}
              onChange={setEmailOnNewCandidate}
            />
            <ToggleRow
              label="Interview reminders"
              description="Get notified before scheduled interviews"
              value={emailOnInterview}
              onChange={setEmailOnInterview}
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
            <div className="settings-side-value">Enterprise</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              Unlimited candidate search and team dashboards.
            </p>
          </div>

          <div className="card settings-side-card" style={{ marginBottom: 20 }}>
            <div className="settings-side-icon">
              <KeyRound size={20} />
            </div>
            <div className="settings-side-label">Security tip</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginTop: 8 }}>
              Use a unique password of at least 12 characters and enable it every few months to
              keep your account secure.
            </p>
          </div>

          <div className="card settings-danger-card">
            <div className="settings-side-icon settings-danger-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="settings-side-label">Danger zone</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              Deactivating removes your recruiter account and all saved searches.
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
    </div>
  );
}
