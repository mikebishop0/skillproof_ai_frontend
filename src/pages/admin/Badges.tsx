import { useState } from 'react';
import toast from 'react-hot-toast';
import { badgeDefinitions } from '../../data/adminMock';

export default function AdminBadges() {
  const [badges, setBadges] = useState(badgeDefinitions);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [criteria, setCriteria] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setBadges((prev) => [{ id: crypto.randomUUID(), name, criteria, issuedCount: 0 }, ...prev]);
    setName('');
    setCriteria('');
    setShowForm(false);
    toast.success('Badge definition created');
  };

  const remove = (id: string) => {
    setBadges((prev) => prev.filter((b) => b.id !== id));
    toast.success('Badge definition deleted');
  };

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Badges</div>
          <h1>Manage badges</h1>
          <p>Define badge criteria and see how many candidates have earned each one.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : 'New badge'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: 20, maxWidth: 480 }}>
          <div className="field">
            <label htmlFor="badge-name">Badge name</label>
            <input id="badge-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="criteria">Criteria</label>
            <textarea
              id="criteria"
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              placeholder="e.g. Score 85%+ on the relevant assessment"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create badge</button>
        </form>
      )}

      <div className="grid-2">
        {badges.map((badge) => (
          <div key={badge.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h3 style={{ fontSize: 15 }}>{badge.name}</h3>
              <span
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--spai-verified)',
                  background: 'rgba(47,174,122,0.12)',
                  padding: '3px 9px',
                  borderRadius: 12,
                  whiteSpace: 'nowrap',
                }}
              >
                {badge.issuedCount} issued
              </span>
            </div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginBottom: 14 }}>{badge.criteria}</p>
            <button type="button" className="btn btn-danger" onClick={() => remove(badge.id)}>
              Delete
            </button>
          </div>
        ))}
        {badges.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No badge definitions yet.</p>
        )}
      </div>
    </div>
  );
}
