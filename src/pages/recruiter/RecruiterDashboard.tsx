import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';

export default function RecruiterDashboard() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const featured = candidatePool.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recruiter/search${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Recruiter</div>
        <h1>Find verified talent</h1>
        <p>Search candidates by skill, score, and badge - free for recruiters.</p>
      </div>

      <form onSubmit={handleSearch} className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skill, e.g. Kubernetes"
            style={{
              flex: 1,
              background: 'var(--spai-ink-lighter)',
              border: '1px solid var(--spai-line)',
              borderRadius: 8,
              padding: '11px 14px',
              color: 'var(--spai-white)',
              fontSize: 14,
            }}
          />
          <button type="submit" className="btn btn-primary">
            Search candidates
          </button>
        </div>
      </form>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{candidatePool.length}</div>
          <div className="lbl">Verified candidates</div>
        </div>
        <div className="stat-cell">
          <div className="num">{shortlistedIds.length}</div>
          <div className="lbl">Shortlisted</div>
        </div>
        <div className="stat-cell">
          <div className="num">{new Set(candidatePool.flatMap((c) => c.skills)).size}</div>
          <div className="lbl">Skills covered</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <h2 style={{ fontSize: 16 }}>Featured candidates</h2>
        <Link to="/recruiter/search" style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>
          View all →
        </Link>
      </div>
      <div className="grid-3">
        {featured.map((candidate) => (
          <Link key={candidate.id} to={`/recruiter/candidate/${candidate.id}`} className="card" style={{ display: 'block' }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>{candidate.name}</h3>
            <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginBottom: 10 }}>{candidate.role}</p>
            <span
              className="mono"
              style={{
                fontSize: 12,
                color: 'var(--spai-verified)',
                background: 'rgba(47,174,122,0.12)',
                padding: '3px 9px',
                borderRadius: 12,
              }}
            >
              {candidate.score}% score
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
