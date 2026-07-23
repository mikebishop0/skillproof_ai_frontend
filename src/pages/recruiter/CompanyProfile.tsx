import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2 } from 'lucide-react';

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState('CloudScale');
  const [industry, setIndustry] = useState('Cloud Infrastructure');
  const [website, setWebsite] = useState('https://cloudscale.io');
  const [size, setSize] = useState('201-500 employees');
  const [description, setDescription] = useState(
    'CloudScale builds enterprise-grade cloud infrastructure tooling for teams shipping at scale.',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Company profile saved (backend not connected yet)');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Company profile</div>
        <h1>Company profile</h1>
        <p>This is what candidates see when they review your recruiter account.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 640 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'rgba(0,88,190,0.12)',
              color: 'var(--spai-verified)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{companyName || 'Your company'}</div>
            <div style={{ fontSize: 12.5, color: 'var(--spai-slate)' }}>{industry}</div>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="companyName">Company name</label>
            <input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="industry">Industry</label>
            <input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="website">Website</label>
            <input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="size">Company size</label>
            <input id="size" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </div>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </form>
    </div>
  );
}
