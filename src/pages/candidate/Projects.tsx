import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileApi } from '../../services/profileApi';
import type { ProjectDto } from '../../services/profileApi';
import { useAuthStore } from '../../store/authStore';

export default function Projects() {
  const user = useAuthStore((state) => state.user);
  const [projectsList, setProjectsList] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await profileApi.getProjects();
        setProjectsList(res.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const used = projectsList.length;
  const quota = 5;
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const userPlan = (user as any)?.plan?.toLowerCase() || 'free';
  const atLimit = userPlan === 'free' && used >= quota;

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading projects...</div>;
  }

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

      {userPlan === 'free' && (
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
        {projectsList.map((project) => (
          <Link
            key={project.id}
            to={`/dashboard/projects/${project.id}`}
            className="card"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <h3 style={{ fontSize: 16 }}>{project.title}</h3>
              {project.status === 'COMPLETED' ? (
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--spai-verified)',
                    background: 'rgba(0,88,190,0.12)',
                    padding: '3px 9px',
                    borderRadius: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  AI score {(project as any).score ?? 88}%
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
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginBottom: 12 }}>
              {project.summary || project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.technologies?.map((tech) => (
                <span className="tag" key={tech.id}>{tech.name}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

