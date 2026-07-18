import { useState } from 'react';
import { Link } from 'react-router-dom';
import './profilePage.css';

const skills = [
  { name: 'Java architecture', pct: 92 },
  { name: 'Microservices design', pct: 88 },
  { name: 'Event-driven systems', pct: 85 },
  { name: 'Cloud deployment', pct: 74 },
  { name: 'Security practices', pct: 66 },
];

const projects = [
  {
    title: 'Spring Boot microservices platform',
    score: 92,
    description:
      'A multi-service order management system built with Spring Boot, handling checkout, inventory, and payment flows across five independently deployed services.',
    tags: ['Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
    strengths: ['Strong microservices knowledge', 'Excellent architecture skills'],
    improvements: ['Security optimization', 'Better monitoring design'],
    links: ['View repository', 'View architecture diagram'],
  },
  {
    title: 'Event-driven order pipeline',
    score: 85,
    description:
      'Kafka-based event pipeline replacing a synchronous REST chain, cutting order-processing latency and decoupling downstream services.',
    tags: ['Apache Kafka', 'Java 21', 'Redis'],
    strengths: [],
    improvements: [],
    links: ['View repository'],
  },
];

const assessments = [
  { name: 'Java architecture assessment', type: 'Scenario-based', score: 92 },
  { name: 'Microservices design patterns', type: 'Architecture test', score: 88 },
  { name: 'Distributed systems coding test', type: 'Coding test', score: 81 },
];

const badges = [
  { name: 'Verified Java developer', date: 'Issued Mar 2026' },
  { name: 'Certified DevOps engineer', date: 'Issued May 2026' },
  { name: 'Cloud architect expert', date: 'Issued Jun 2026' },
];

export default function PublicProfilePage() {
  const [copyLabel, setCopyLabel] = useState('Copy profile link');

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopyLabel('Link copied');
    setTimeout(() => setCopyLabel('Copy profile link'), 1800);
  };

  return (
    <div className="spai-profile">
      <nav>
        <div className="wrap">
          <div className="logo">
            <span className="logo-mark">S</span>SkillProof AI
          </div>
          <Link to="/register" className="btn btn-primary">Create your own profile</Link>
        </div>
      </nav>

      <header className="profile-hero">
        <div className="wrap">
          <div className="hero-top">
            <div className="identity">
              <div className="avatar">MR</div>
              <div>
                <div className="name-row">
                  <h1>Mayur Ramgir</h1>
                  <span className="stamp">✓ verified</span>
                </div>
                <div className="role">Java Architecture · Backend Systems</div>
                <div className="location">Pune, India · Open to remote roles</div>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-ghost" onClick={copyLink}>
                <span>{copyLabel}</span>
              </button>
              <a href="#" className="btn btn-ghost">Download report</a>
            </div>
          </div>

          <div className="score-strip">
            <div className="score-cell">
              <div className="num">92%</div>
              <div className="lbl">Java architecture score</div>
            </div>
            <div className="score-cell">
              <div className="num">4</div>
              <div className="lbl">Verified projects</div>
            </div>
            <div className="score-cell">
              <div className="num">3</div>
              <div className="lbl">Badges earned</div>
            </div>
            <div className="score-cell">
              <div className="num">6</div>
              <div className="lbl">Assessments passed</div>
            </div>
          </div>
        </div>
      </header>

      <section id="skills">
        <div className="wrap">
          <div className="sec-head">
            <h2>Verified skills</h2>
            <span className="count">Scored by AI evaluation</span>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-row" key={skill.name}>
                <div className="skill-name">{skill.name}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${skill.pct}%` }} />
                </div>
                <div className="skill-pct">{skill.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <div className="sec-head">
            <h2>Evidence — projects</h2>
            <span className="count">4 reviewed</span>
          </div>

          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-top">
                <h3>{project.title}</h3>
                <div className="project-score">AI score {project.score}%</div>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="evidence-tags">
                {project.tags.map((tag) => (
                  <span className="evidence-tag" key={tag}>{tag}</span>
                ))}
              </div>
              {(project.strengths.length > 0 || project.improvements.length > 0) && (
                <div className="ai-note">
                  <div className="col">
                    <div className="col-label">Strengths</div>
                    <ul>
                      {project.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col improve">
                    <div className="col-label">Improvement areas</div>
                    <ul>
                      {project.improvements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="project-links">
                {project.links.map((link) => (
                  <a href="#" key={link}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="assessments">
        <div className="wrap">
          <div className="sec-head">
            <h2>Assessments</h2>
            <span className="count">6 completed</span>
          </div>
          <div className="assess-list">
            {assessments.map((item) => (
              <div className="assess-row" key={item.name}>
                <div>
                  <div className="assess-name">{item.name}</div>
                  <div className="assess-type">{item.type}</div>
                </div>
                <div className="assess-score">{item.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="badges">
        <div className="wrap">
          <div className="sec-head">
            <h2>Badges earned</h2>
            <span className="count">3 verified</span>
          </div>
          <div className="badge-grid">
            {badges.map((badge) => (
              <div className="badge-card" key={badge.name}>
                <div className="badge-icon">✓</div>
                <h3>{badge.name}</h3>
                <div className="date">{badge.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hire" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="cta-banner">
            <div>
              <h3>Hiring for a similar role?</h3>
              <p>Search verified candidates like Mayur — free for recruiters, no login required to browse.</p>
            </div>
            <Link to="/recruiter/search" className="btn btn-primary">Browse verified candidates</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div>Verified by SkillProof AI · Report generated Jul 2026</div>
          <div className="foot-links">
            <Link to="/register">Create your profile</Link>
            <a href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
