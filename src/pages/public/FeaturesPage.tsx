import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  FolderKanban,
  Sparkles,
  FileText,
  Gauge,
  Bug,
  CheckCircle2,
  Server,
  Code2,
  Cloud,
  Cpu,
  ShieldCheck,
  Lock,
  ScanEye,
  Video,
  Layers,
  BookOpen,
} from 'lucide-react';
import Footer from '../../components/Footer';
import logo from '../../assets/logo1.png';
import heroImg from '../../assets/bannerimg2.jpeg';
import './featuresPage.css';

const heroStats = [
  { value: '4', label: 'Evidence types analyzed' },
  { value: '98.4%', label: 'AI scoring accuracy' },
  { value: '<2 min', label: 'Average report time' },
];

const evidenceTypes = [
  { icon: Code2, title: 'Code repositories', description: 'Commit history, structure, and dependency choices.' },
  { icon: Video, title: 'Video walkthroughs', description: 'How a candidate reasons through their own decisions.' },
  { icon: Layers, title: 'Architecture diagrams', description: 'System design trade-offs and scalability thinking.' },
  { icon: BookOpen, title: 'Written documentation', description: 'Clarity of technical communication under review.' },
];

const capabilities = [
  {
    icon: FolderKanban,
    title: 'Evidence-Based Portfolios',
    description:
      'Turn static resumes into living proof. We verify GitHub commits, technical documentation, and project architecture to ensure ownership.',
    links: ['Git History Validation', 'Architecture Diagram Audit'],
  },
  {
    icon: Sparkles,
    title: 'AI-Driven Evaluation',
    description:
      'Our proprietary LLMs probe deeper than multiple-choice questions, analyzing logic flow and problem-solving patterns in real-time.',
    stat: { label: 'System Accuracy', tag: 'HIGH', pct: 92 },
  },
  {
    icon: FileText,
    title: 'Recruiter Insights Engine',
    description:
      'Translate technical complexity into business value with structured reports that highlight exactly where a candidate excels.',
    link: 'View Sample Report',
  },
];

const codeChecklist = [
  {
    title: 'Cognitive Load Metric',
    description: 'Measures code readability and maintainability for team environments.',
  },
  {
    title: 'Edge Case Resilience',
    description: 'Automated stress-testing of candidate logic against uncommon data inputs.',
  },
];

const techStack = [
  { icon: Server, label: 'Backend', items: 'Java, Python, Go, Node.js' },
  { icon: Code2, label: 'Frontend', items: 'React, Vue, TypeScript, Tailwind' },
  { icon: Cloud, label: 'Cloud / DevOps', items: 'AWS, Kubernetes, Terraform' },
  { icon: Cpu, label: 'Data / AI', items: 'PyTorch, SQL, Spark, NLP' },
];

const trustPoints = [
  { icon: ShieldCheck, label: 'SOC2 Type II Compliant' },
  { icon: ScanEye, label: 'Advanced Anti-Plagiarism' },
  { icon: Lock, label: 'End-to-End Encryption' },
];

export default function FeaturesPage() {
  return (
    <div className="spai-features">
      <nav>
        <div className="wrap">
          <div className="logo">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </div>
          <div className="nav-links">
            <Link to="/">How it Works</Link>
            <Link to="/features" className="active">Features</Link>
            <Link to="/recruiters">Recruiters</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <header className="feat-hero-v2">
        <div className="wrap feat-hero-split">
          <div>
            <div className="eyebrow">AI-Powered Verification</div>
            <h1>The Tech Behind The Truth</h1>
            <div className="feat-hero-subhead">Evidence Speaks Louder Than Buzzwords.</div>
            <p className="lede">
              SkillProof AI goes beyond questionnaires. Our proprietary Multilayered Verification
              engine analyzes real-world evidence code, video, and technical logic to provide an
              objective truth about expertise.
            </p>
            <div className="hero-actions">
              <a href="#capabilities" className="btn btn-primary">
                Explore the Engine <ArrowRight size={15} />
              </a>
              <a href="#" className="btn btn-ghost">
                <Play size={15} /> Watch Tech Demo
              </a>
            </div>
          </div>
          <div className="feat-hero-visual">
            <div className="feat-hero-img-card">
              <img src={heroImg} alt="AI evaluating candidate evidence" />
            </div>
            <p className="feat-hero-quote">
              &quot;Every claim, backed by evidence a recruiter can actually inspect.&quot;
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="evidence-grid">
            {evidenceTypes.map((item) => (
              <div className="evidence-card" key={item.title}>
                <div className="evidence-icon">
                  <item.icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section id="capabilities" className="feat-capabilities">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 44px' }}>
            <h2>Core Capabilities</h2>
            <p>Our verification pipeline is built on three pillars of objective assessment.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((cap) => (
              <div className="capability-card" key={cap.title}>
                <div className="capability-icon">
                  <cap.icon size={20} />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
                {cap.links && (
                  <ul className="capability-links">
                    {cap.links.map((link) => (
                      <li key={link}>
                        <CheckCircle2 size={13} /> {link}
                      </li>
                    ))}
                  </ul>
                )}
                {cap.stat && (
                  <div className="capability-stat">
                    <div className="capability-stat-top">
                      <span>{cap.stat.label}</span>
                      <span className="tag">{cap.stat.tag}</span>
                    </div>
                    <div className="capability-stat-track">
                      <div className="capability-stat-fill" style={{ width: `${cap.stat.pct}%` }} />
                    </div>
                  </div>
                )}
                {cap.link && (
                  <a href="#" className="capability-link">
                    {cap.link} <ArrowRight size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feat-deepcode">
        <div className="wrap feat-deepcode-grid">
          <div className="deepcode-cards">
            <div className="mini-card">
              <div className="mini-label">Code Quality</div>
              <h4>Scalability Analysis</h4>
              <p>AI detects O(n) complexity and potential memory leaks in candidate submissions automatically.</p>
            </div>
            <div className="mini-card mini-stat">
              <Gauge size={20} />
              <div className="mini-stat-value">14ms</div>
              <div className="mini-stat-label">Latency</div>
            </div>
            <div className="mini-card mini-card-wide">
              <div className="mini-icon"><Bug size={16} /></div>
              <div>
                <h4>Security Logic Check</h4>
                <p>Scans for SQLi, XSS, and proper auth implementation in coding challenges.</p>
              </div>
            </div>
          </div>
          <div className="deepcode-copy">
            <h2>
              Deep Code Analysis <span className="accent-line">(Logic &amp; Performance)</span>
            </h2>
            <p>
              We don&apos;t just check if the code runs, we evaluate how it thinks. SkillProof AI
              analyzes the underlying architecture, efficiency, and security of every line
              written during the assessment.
            </p>
            <ul className="deepcode-checklist">
              {codeChecklist.map((item) => (
                <li key={item.title}>
                  <CheckCircle2 size={16} />
                  <div>
                    <div className="check-title">{item.title}</div>
                    <div className="check-desc">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="feat-stack">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
            <h2>Universal Tech Stack</h2>
            <p>We verify expertise across the entire modern development landscape.</p>
          </div>
          <div className="stack-grid">
            {techStack.map((stack) => (
              <div className="stack-card" key={stack.label}>
                <div className="stack-icon">
                  <stack.icon size={20} />
                </div>
                <div className="stack-label">{stack.label}</div>
                <div className="stack-items">{stack.items}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feat-trust">
        <div className="wrap feat-trust-grid">
          <div>
            <h2>Enterprise-Grade Trust</h2>
            <p>
              Trust is our core product. We maintain the highest standards of data protection
              and verification integrity for global enterprises.
            </p>
            <ul className="trust-list">
              {trustPoints.map((point) => (
                <li key={point.label}>
                  <point.icon size={15} /> {point.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="trust-visual">
            <div className="trust-card">
              <div className="trust-card-icons">
                <ShieldCheck size={20} />
                <Lock size={20} />
              </div>
              <h4>Secure Core</h4>
              <p>Military-grade protection for candidate IP and company data.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="feat-cta">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-icon">
              <Cpu size={22} />
            </div>
            <h2>See the Engine in Action</h2>
            <p>
              Run a real assessment through our Multilayered Verification engine and get your
              own evidence-backed competency report in minutes.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">Start Free Assessment</Link>
              <a href="#" className="btn btn-ghost">
                <Play size={15} /> Watch Tech Demo
              </a>
            </div>
            <div className="cta-note">
              <ShieldCheck size={13} /> SOC2 Type II compliant end-to-end encryption
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
