import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';
import { useSavedProfilesStore } from '../../store/savedProfilesStore';

const RECENT_DAYS = 14;
const TODAY = new Date('2026-07-23');

export default function RecruiterDashboard() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const savedIds = useSavedProfilesStore((state) => state.savedIds);
  const featured = candidatePool.slice(0, 3);

  const verifiedCount = candidatePool.filter((c) => c.badges.length > 0).length;
  const recentlyJoinedCount = candidatePool.filter((c) => {
    const joined = new Date(c.joinedDate);
    const days = (TODAY.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24);
    return days <= RECENT_DAYS;
  }).length;
  const savedCandidatesCount = new Set([...shortlistedIds, ...savedIds]).size;
  const skillDemand = candidatePool
    .flatMap((c) => c.skills)
    .reduce<Record<string, number>>((acc, skill) => {
      acc[skill] = (acc[skill] ?? 0) + 1;
      return acc;
    }, {});
  const topSkills = Object.entries(skillDemand)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxSkillCount = topSkills[0]?.[1] ?? 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recruiter/search${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Recruiter</div>
        <h1>Find verified talent</h1>
        <p>Search candidates by skill, score, and badge free for recruiters.</p>
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
          <div className="lbl">Total candidates</div>
        </div>
        <div className="stat-cell">
          <div className="num">{verifiedCount}</div>
          <div className="lbl">Verified candidates</div>
        </div>
        <div className="stat-cell">
          <div className="num">{recentlyJoinedCount}</div>
          <div className="lbl">Recently joined</div>
        </div>
        <div className="stat-cell">
          <div className="num">{savedCandidatesCount}</div>
          <div className="lbl">Saved candidates</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Hiring analytics top skills in demand</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topSkills.map(([skill, count]) => (
            <div key={skill} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 30px', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 13.5 }}>{skill}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(count / maxSkillCount) * 100}%` }} />
              </div>
              <span className="mono" style={{ fontSize: 12.5, color: 'var(--spai-verified)', textAlign: 'right' }}>
                {count}
              </span>
            </div>
          ))}
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
                background: 'rgba(0,88,190,0.12)',
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
