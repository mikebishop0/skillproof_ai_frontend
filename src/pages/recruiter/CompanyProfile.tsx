import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Building2 } from 'lucide-react';
import { profileApi } from '../../services/profileApi';
import type { RecruiterProfileDto } from '../../services/profileApi';

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileApi.getRecruiterProfile();
        const data = res.data;
        if (data) {
          setProfileExists(true);
          setCompanyName(data.company || '');
          setIndustry(data.industry || '');
          setWebsite(data.company_website || '');
          setDesignation(data.designation || '');
          setContactNumber(data.contact_number || '');
        }
      } catch (err) {
        console.error('Failed to fetch recruiter profile:', err);
        setProfileExists(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) {
      toast.error('Company name is required');
      return;
    }
    const payload: RecruiterProfileDto = {
      company: companyName,
      industry,
      company_website: website,
      designation,
      contact_number: contactNumber,
    };
    try {
      if (profileExists) {
        await profileApi.updateRecruiterProfile(payload);
      } else {
        await profileApi.createRecruiterProfile(payload);
        setProfileExists(true);
      }
      toast.success('Company profile saved successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || 'Failed to save company profile');
    }
  };

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading company profile...</div>;
  }

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Company profile</div>
        <h1>Company profile</h1>
        <p>This is what candidates see when they review your recruiter account.</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
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
            <div style={{ fontSize: 12.5, color: 'var(--spai-slate)' }}>{industry || 'Specify Industry'}</div>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="companyName">Company name</label>
            <input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="industry">Industry</label>
            <input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="website">Website</label>
            <input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
          </div>
          <div className="field">
            <label htmlFor="designation">Designation / Role</label>
            <input id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Hiring Manager" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="contactNumber">Contact number</label>
          <input id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="+1234567890" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>Save changes</button>
      </form>
    </div>
  );
}

