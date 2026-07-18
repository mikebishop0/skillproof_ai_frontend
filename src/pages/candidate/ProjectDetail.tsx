import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/candidateMock';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="card">
        <h1>Project not found</h1>
        <Link to="/dashboard/projects" className="btn btn-ghost" style={{ marginTop: 16 }}>
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Portfolio</div>
          <h1>{project.title}</h1>
        </div>
        <Link to={`/dashboard/projects/${project.id}/edit`} className="btn btn-ghost">
          Edit project
        </Link>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ color: 'var(--spai-slate)', fontSize: 14, marginBottom: 16 }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <a
          href={`https://${project.github}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}
        >
          View repository →
        </a>
      </div>

      {project.status === 'reviewed' ? (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h2 style={{ fontSize: 16 }}>AI evaluation</h2>
            <div>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--spai-verified)' }}>
                {project.score}%
              </span>
              <span style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginLeft: 6 }}>competency score</span>
            </div>
          </div>
          <div className="grid-2">
            <div>
              <div className="eyebrow" style={{ color: 'var(--spai-slate)' }}>Strengths</div>
              <ul style={{ listStyle: 'none', fontSize: 13.5 }}>
                {project.strengths.map((item) => (
                  <li key={item} style={{ paddingLeft: 14, position: 'relative', marginBottom: 6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--spai-verified)' }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--spai-claim)' }}>Improvement areas</div>
              <ul style={{ listStyle: 'none', fontSize: 13.5 }}>
                {project.improvements.map((item) => (
                  <li key={item} style={{ paddingLeft: 14, position: 'relative', marginBottom: 6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--spai-claim)' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', color: 'var(--spai-slate)' }}>
          <p>Our AI is still reviewing this project. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
