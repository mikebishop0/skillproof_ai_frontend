import { Link } from 'react-router-dom';
import { candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';

export default function Shortlist() {
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const toggle = useShortlistStore((state) => state.toggle);
  const candidates = candidatePool.filter((c) => shortlistedIds.includes(c.id));

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Shortlist</div>
        <h1>Saved candidates</h1>
        <p>Candidates you&apos;ve shortlisted for follow-up.</p>
      </div>

      {candidates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--spai-slate)', fontSize: 14, marginBottom: 16 }}>
            You haven&apos;t shortlisted any candidates yet.
          </p>
          <Link to="/recruiter/search" className="btn btn-primary">
            Search candidates
          </Link>
        </div>
      ) : (
        <div className="grid-2">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15 }}>{candidate.name}</h3>
                  <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginTop: 2 }}>{candidate.role}</p>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--spai-verified)',
                    background: 'rgba(19,170,216,0.12)',
                    padding: '3px 9px',
                    borderRadius: 12,
                  }}
                >
                  {candidate.score}%
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {candidate.skills.slice(0, 3).map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  to={`/recruiter/candidate/${candidate.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  View profile
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => toggle(candidate.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
