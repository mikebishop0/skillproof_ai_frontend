import { useState } from 'react';
import toast from 'react-hot-toast';
import { recruiterAccounts as initialAccounts } from '../../data/adminMock';

export default function AdminRecruiters() {
  const [accounts, setAccounts] = useState(initialAccounts);

  const toggleSuspend = (id: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' } : a)),
    );
    toast.success('Recruiter account updated');
  };

  const enterpriseCount = accounts.filter((a) => a.plan === 'Enterprise').length;

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Recruiters</div>
        <h1>Recruiter accounts</h1>
        <p>Company accounts using the platform to search and hire verified candidates.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{accounts.length}</div>
          <div className="lbl">Recruiter accounts</div>
        </div>
        <div className="stat-cell">
          <div className="num">{enterpriseCount}</div>
          <div className="lbl">Enterprise plan</div>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1.6fr 0.8fr 0.8fr 0.8fr 1fr',
            gap: 8,
            fontSize: 12,
            color: 'var(--spai-slate)',
            paddingBottom: 8,
            borderBottom: '1px solid var(--spai-line)',
          }}
        >
          <span>Company</span>
          <span>Contact</span>
          <span>Plan</span>
          <span>Viewed</span>
          <span>Shortlisted</span>
          <span></span>
        </div>
        {accounts.map((account) => (
          <div
            key={account.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1.6fr 0.8fr 0.8fr 0.8fr 1fr',
              gap: 8,
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{account.companyName}</span>
            <span style={{ color: 'var(--spai-slate)' }}>{account.contactName}</span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                color: account.plan === 'Enterprise' ? 'var(--spai-verified)' : 'var(--spai-slate)',
              }}
            >
              {account.plan}
            </span>
            <span>{account.candidatesViewed}</span>
            <span>{account.shortlisted}</span>
            <button type="button" className="btn btn-ghost" onClick={() => toggleSuspend(account.id)}>
              {account.status === 'active' ? 'Suspend' : 'Reactivate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
