import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { candidatePool } from '../../data/recruiterMock';
import { useSavedProfilesStore } from '../../store/savedProfilesStore';

export default function SavedProfiles() {
  const savedIds = useSavedProfilesStore((state) => state.savedIds);
  const toggleSaved = useSavedProfilesStore((state) => state.toggle);
  const candidates = candidatePool.filter((c) => savedIds.includes(c.id));

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Saved profiles</div>
        <h1>Saved profiles</h1>
        <p>Candidate profiles you&apos;ve bookmarked for later review, separate from your active shortlist.</p>
      </div>

      {candidates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--spai-slate)', fontSize: 14, marginBottom: 16 }}>
            You haven&apos;t saved any profiles yet.
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
                    background: 'rgba(0,88,190,0.12)',
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
                <button type="button" className="btn btn-danger" onClick={() => toggleSaved(candidate.id)}>
                  <Bookmark size={14} fill="currentColor" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
