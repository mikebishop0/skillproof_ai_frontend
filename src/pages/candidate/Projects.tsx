import { Link } from 'react-router-dom';
import { candidate, projects } from '../../data/candidateMock';

export default function Projects() {
  const used = projects.length;
  const quota = candidate.projectQuota;
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const atLimit = candidate.plan === 'free' && used >= quota;

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Portfolio</div>
          <h1>Your projects</h1>
          <p>Upload real work as evidence AI reviews each one for depth and quality.</p>
        </div>
        <Link
          to={atLimit ? '/pricing' : '/dashboard/projects/new'}
          className="btn btn-primary"
        >
          {atLimit ? 'Upgrade to add more' : 'Add project'}
        </Link>
      </div>

      {candidate.plan === 'free' && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="quota-row">
            <span>
              <strong>{used}</strong> of {quota} projects used (Free plan)
            </span>
            {atLimit && (
              <Link to="/pricing" className="mono" style={{ color: 'var(--spai-claim)' }}>
                Upgrade for unlimited
              </Link>
            )}
          </div>
          <div className="bar-track">
            <div className={`bar-fill ${atLimit ? 'warn' : ''}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="grid-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/dashboard/projects/${project.id}`}
            className="card"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <h3 style={{ fontSize: 16 }}>{project.title}</h3>
              {project.status === 'reviewed' ? (
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--spai-verified)',
                    background: 'rgba(19,170,216,0.12)',
                    padding: '3px 9px',
                    borderRadius: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  AI score {project.score}%
                </span>
              ) : (
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--spai-slate)',
                    background: 'var(--spai-ink-lighter)',
                    padding: '3px 9px',
                    borderRadius: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Pending review
                </span>
              )}
            </div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginBottom: 12 }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
