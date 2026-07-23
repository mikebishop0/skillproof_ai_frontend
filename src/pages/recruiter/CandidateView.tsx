import { Link, useParams } from 'react-router-dom';
import { Star, Check, Bookmark } from 'lucide-react';
import { candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';
import { useSavedProfilesStore } from '../../store/savedProfilesStore';

export default function CandidateView() {
  const { id } = useParams();
  const candidate = candidatePool.find((c) => c.id === id);
  const toggle = useShortlistStore((state) => state.toggle);
  const isShortlisted = useShortlistStore((state) => state.isShortlisted);
  const toggleSaved = useSavedProfilesStore((state) => state.toggle);
  const isSaved = useSavedProfilesStore((state) => state.isSaved);

  if (!candidate) {
    return (
      <div className="card">
        <h1>Candidate not found</h1>
        <Link to="/recruiter/search" className="btn btn-ghost" style={{ marginTop: 16 }}>
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Candidate profile</div>
          <h1>{candidate.name}</h1>
          <p>{candidate.role} {candidate.location}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => toggle(candidate.id)}
            style={isShortlisted(candidate.id) ? { color: 'var(--spai-verified)', borderColor: 'rgba(0,88,190,0.35)' } : undefined}
          >
            <Star size={14} fill={isShortlisted(candidate.id) ? 'currentColor' : 'none'} />
            {isShortlisted(candidate.id) ? 'Shortlisted' : 'Shortlist'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => toggleSaved(candidate.id)}
            style={isSaved(candidate.id) ? { color: 'var(--spai-verified)', borderColor: 'rgba(0,88,190,0.35)' } : undefined}
          >
            <Bookmark size={14} fill={isSaved(candidate.id) ? 'currentColor' : 'none'} />
            {isSaved(candidate.id) ? 'Saved' : 'Save profile'}
          </button>
          <Link to={`/profile/${candidate.id}`} className="btn btn-ghost">
            Open public profile
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{candidate.score}%</div>
          <div className="lbl">Competency score</div>
        </div>
        <div className="stat-cell">
          <div className="num">{candidate.projectCount}</div>
          <div className="lbl">Verified projects</div>
        </div>
        <div className="stat-cell">
          <div className="num">{candidate.badges.length}</div>
          <div className="lbl">Badges earned</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {candidate.skills.map((skill, index) => {
            const pct = Math.max(55, candidate.score - index * 5);
            return (
              <div key={skill} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 48px', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13.5 }}>{skill}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--spai-verified)', textAlign: 'right' }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 10 }}>Evidence top project</h2>
        <h3 style={{ fontSize: 15, marginBottom: 6 }}>{candidate.topProject.title}</h3>
        <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>{candidate.topProject.description}</p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Badges</h2>
        {candidate.badges.length > 0 ? (
          <div className="grid-3">
            {candidate.badges.map((badge) => (
              <div key={badge} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(0,88,190,0.12)',
                    border: '1px solid rgba(0,88,190,0.35)',
                    color: 'var(--spai-verified)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}
                >
                  <Check size={18} />
                </div>
                <p style={{ fontSize: 12.5 }}>{badge}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>No badges earned yet.</p>
        )}
      </div>
    </div>
  );
}
