import { useState } from 'react';
import toast from 'react-hot-toast';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

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

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('SkillProof AI');
  const [supportEmail, setSupportEmail] = useState('support@zonopact.com');
  const [allowSignups, setAllowSignups] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);

  const saveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Platform settings saved (backend not connected yet)');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Settings</div>
        <h1>Platform settings</h1>
        <p>Manage site-wide configuration and access controls.</p>
      </div>

      <div className="settings-layout">
        <div>
          <form onSubmit={saveGeneral} className="card" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>General</h2>
            <div className="field">
              <label htmlFor="siteName">Site name</label>
              <input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="supportEmail">Support email</label>
              <input id="supportEmail" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Save changes</button>
          </form>

          <div className="card">
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Access control</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 8 }}>
              Control who can register and access the platform.
            </p>
            <ToggleRow
              label="Allow new signups"
              description="Let new candidates and recruiters create accounts"
              value={allowSignups}
              onChange={setAllowSignups}
            />
            <ToggleRow
              label="Require email verification"
              description="New accounts must verify their email before signing in"
              value={requireEmailVerification}
              onChange={setRequireEmailVerification}
            />
            <ToggleRow
              label="Maintenance mode"
              description="Show a maintenance banner and block non-admin logins"
              value={maintenanceMode}
              onChange={setMaintenanceMode}
            />
          </div>
        </div>

        <div>
          <div className="card settings-side-card" style={{ marginBottom: 20 }}>
            <div className="settings-side-icon">
              <ShieldCheck size={20} />
            </div>
            <div className="settings-side-label">Platform status</div>
            <div className="settings-side-value" style={{ color: maintenanceMode ? 'var(--spai-danger)' : 'var(--spai-verified)' }}>
              {maintenanceMode ? 'Maintenance' : 'Operational'}
            </div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 0' }}>
              Toggle maintenance mode from Access control.
            </p>
          </div>

          <div className="card settings-danger-card">
            <div className="settings-side-icon settings-danger-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="settings-side-label">Danger zone</div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, margin: '10px 0 16px' }}>
              Clearing platform cache signs out every active session immediately.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', color: 'var(--spai-danger)', borderColor: 'var(--spai-danger)' }}
              onClick={() => toast('Cache clearing is not connected yet')}
            >
              Clear platform cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
