import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Play,
  BarChart3,
  Fingerprint,
  Brain,
  CheckCircle2,
  TrendingUp,
  Percent,
  Scale,
  PiggyBank,
  Copy,
  Check,
  X,
} from 'lucide-react';
import Footer from '../../components/Footer';
import logo from '../../assets/logo1.png';
import bannerImg from '../../assets/bannerimg1.jpeg';
import hiringImg from '../../assets/verification-globe.jpeg';
import './howItWorksPage.css';

const journeySteps = [
  {
    label: 'Step One',
    title: 'Upload your evidence',
    description:
      "Add real work — not a description of it. Projects, GitHub repos, architecture diagrams, and certificates all count as evidence.",
    type: 'tags' as const,
    tags: ['Project files', 'GitHub link', 'Architecture diagram', 'Certificate'],
  },
  {
    label: 'Step Two',
    title: 'AI reviews the work',
    description:
      'Our AI evaluates what you submitted across four dimensions — the same criteria a senior engineer would use in a real code review.',
    type: 'bars' as const,
    bars: [
      { label: 'Code quality', pct: 90 },
      { label: 'Architecture design', pct: 85 },
      { label: 'Technical depth', pct: 88 },
      { label: 'Problem solving', pct: 82 },
    ],
  },
  {
    label: 'Step Three',
    title: 'Prove it under pressure',
    description:
      "Projects show what you've built. Assessments show what you can do live — scored the moment you submit.",
    type: 'grid' as const,
    grid: [
      { tag: 'MCQ', title: 'Core concept checks' },
      { tag: 'Coding test', title: 'Live problem solving' },
      { tag: 'Architecture test', title: 'System design scenarios' },
      { tag: 'Scenario-based', title: 'Real-world decision making' },
    ],
  },
  {
    label: 'Step Four',
    title: 'Earn a verified badge',
    description:
      "Badges aren't awarded for showing up — they're issued when your combined project and assessment scores clear the bar.",
    type: 'badge' as const,
    badge: { name: 'Verified Java Developer', sub: 'Issued after 92% architecture score' },
  },
  {
    label: 'Step Five',
    title: 'Share one link',
    description: 'Your public profile is free to view — no login, no paywall. Recruiters see the evidence instantly.',
    type: 'link' as const,
    link: 'skillproof.ai/p/mayur-ramgir',
  },
];

const hiringPoints = [
  {
    icon: Percent,
    title: 'Reduce Time-to-Hire by 60%',
    description: 'Skip the initial technical screening. Only interview candidates whose skills are already proven by our engine.',
  },
  {
    icon: Scale,
    title: 'Eliminate Hiring Bias',
    description: 'Objective data levels the playing field, ensuring you find the best talent regardless of pedigree or background.',
  },
  {
    icon: PiggyBank,
    title: 'Cut Cost-per-Hire',
    description: 'Reduce the burden on your engineering team by outsourcing the deep technical verification to AI.',
  },
];

const resumeClaims = [
  'Self-reported skill level',
  'No way to verify claims',
  'Same bullet points as everyone else',
  'Recruiter has to just trust it',
];

const skillProofClaims = [
  'AI-scored, evidence-backed skill level',
  'Every claim links to real work',
  'Verified badges, not adjectives',
  'Recruiter can inspect the evidence directly',
];

export default function HowItWorksPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://${journeySteps[4].link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="spai-how">
      <nav>
        <div className="wrap">
          <div className="logo">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </div>
          <div className="nav-links">
            <Link to="/" className="active">How it Works</Link>
            <Link to="/features">Features</Link>
            <Link to="/recruiters">Recruiters</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <header className="how-hero">
        <div className="wrap how-hero-grid">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} /> AI-Powered Verification
            </div>
            <h1>
              Moving Beyond the Resume to <span className="accent-line">Verified Expertise.</span>
            </h1>
            <p className="lede">
              SkillProof AI transforms self-reported claims into objective competency reports.
              Using multimodal AI analysis, we verify technical depth, problem-solving, and
              soft skills through evidence.
            </p>
            <div className="hero-actions">
              <a href="#engine" className="btn btn-primary">Explore the Engine</a>
              <a href="#" className="btn btn-ghost">
                <Play size={15} /> Watch Demo
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-scene">
              <img src={bannerImg} alt="AI Assessment Platform dashboard" className="hero-banner-img" />
            </div>
          </div>
        </div>
      </header>

      <section className="how-compare">
        <div className="wrap">
          <h2>Resume claim vs. SkillProof evidence</h2>
          <div className="compare-grid">
            <div className="compare-card compare-card-old">
              <h3>Traditional resume</h3>
              <div className="compare-divider" />
              <ul>
                {resumeClaims.map((claim) => (
                  <li key={claim}>
                    <X size={15} />
                    {claim}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare-card compare-card-new">
              <h3>SkillProof AI profile</h3>
              <div className="compare-divider" />
              <ul>
                {skillProofClaims.map((claim) => (
                  <li key={claim}>
                    <Check size={15} />
                    {claim}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="how-journey">
        <div className="wrap">
          <div className="journey-head">
            <div className="journey-eyebrow">
              <span className="journey-dot" /> How it works
            </div>
            <h2>
              From claim to <span className="journey-accent">verified proof</span>, in five steps.
            </h2>
            <p>
              Every badge on SkillProof AI is backed by evidence a recruiter can actually inspect —
              here&apos;s exactly how it gets built.
            </p>
          </div>

          <div className="journey-timeline">
            {journeySteps.map((step, index) => (
              <div className="journey-row" key={step.title}>
                <div className="journey-marker-col">
                  <div className="journey-marker">{String(index + 1).padStart(2, '0')}</div>
                  {index < journeySteps.length - 1 && <div className="journey-line" />}
                </div>
                <div className="journey-body">
                  <div className="journey-label">{step.label}</div>
                  <h3>{step.title}</h3>
                  <div className="journey-card">
                    <p>{step.description}</p>
                    <div className="journey-divider" />

                    {step.type === 'tags' && (
                      <div className="journey-tags">
                        {step.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    {step.type === 'bars' && (
                      <div className="journey-bars">
                        {step.bars.map((bar) => (
                          <div className="journey-bar-row" key={bar.label}>
                            <span className="journey-bar-label">{bar.label}</span>
                            <div className="journey-bar-track">
                              <div className="journey-bar-fill" style={{ width: `${bar.pct}%` }} />
                            </div>
                            <span className="journey-bar-pct">{bar.pct}%</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.type === 'grid' && (
                      <div className="journey-grid2">
                        {step.grid.map((item) => (
                          <div className="journey-grid2-item" key={item.tag}>
                            <div className="journey-grid2-tag">{item.tag}</div>
                            <div className="journey-grid2-title">{item.title}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.type === 'badge' && (
                      <div className="journey-badge">
                        <div className="journey-badge-icon">
                          <Check size={16} />
                        </div>
                        <div>
                          <div className="journey-badge-name">{step.badge.name}</div>
                          <div className="journey-badge-sub">{step.badge.sub}</div>
                        </div>
                      </div>
                    )}

                    {step.type === 'link' && (
                      <div className="journey-link-box">
                        <span>{step.link}</span>
                        <button type="button" onClick={handleCopyLink}>
                          {copied ? <Check size={13} /> : <Copy size={13} />}
                          {copied ? 'Copied' : 'Copy link'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="engine" className="how-engine">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            <h2>The SkillProof AI Engine</h2>
            <p>We don&apos;t just look at code. We look at context, creativity, and critical thinking.</p>
          </div>
          <div className="engine-grid">
            <div className="engine-card engine-card-wide">
              <div className="engine-icon">
                <BarChart3 size={22} />
              </div>
              <h3>Multimodal Evidence Analysis</h3>
              <p>
                Our engine parses video transcripts, commit history, and technical architecture
                diagrams to identify the specific contributions of a candidate.
              </p>
              <ul className="engine-checklist">
                <li><CheckCircle2 size={15} /> Code Quality &amp; Scalability</li>
                <li><CheckCircle2 size={15} /> Communication Effectiveness</li>
                <li><CheckCircle2 size={15} /> Logical Reasoning Depth</li>
              </ul>
              <div className="engine-mock">
                <div className="engine-mock-bar" />
                <div className="engine-mock-bar short" />
                <div className="engine-mock-chart">
                  <TrendingUp size={28} />
                </div>
              </div>
            </div>

            <div className="engine-card engine-card-accent">
              <div className="engine-icon">
                <Fingerprint size={22} />
              </div>
              <h3>Advanced Anti-Fraud</h3>
              <p>
                We ensure the work belongs to the person claiming it. Biometric monitoring and
                code-style fingerprinting maintain the highest trust levels.
              </p>
              <div className="globe-frame">
                <div className="globe" />
              </div>
            </div>

            <div className="engine-card">
              <div className="engine-icon">
                <Brain size={22} />
              </div>
              <h3>Adaptive Challenges</h3>
              <p>
                The AI adjusts difficulty in real-time, identifying the ceiling of a candidate&apos;s
                skill rather than just checking for &quot;passed&quot; answers.
              </p>
              <div className="engine-difficulty">
                <div className="engine-difficulty-label">Current difficulty: Senior III</div>
                <div className="engine-bar-track">
                  <div className="engine-bar-fill" style={{ width: '82%' }} />
                </div>
              </div>
            </div>

            <div className="engine-card engine-card-wide">
              <div className="engine-card-top">
                <div>
                  <h3>Recruiter Transparency</h3>
                  <p>Eliminate resume bias with direct evidence links.</p>
                </div>
                <Link to="/profile/mayur-ramgir" className="btn btn-primary btn-small">
                  View Sample Report
                </Link>
              </div>
              <div className="engine-report-mock">
                <div className="engine-report-row">
                  <div className="engine-report-avatar">M</div>
                  <div>
                    <div className="engine-report-name">Mayur Ramgir</div>
                    <div className="engine-report-role">Java Architecture, Verified</div>
                  </div>
                </div>
                <div className="engine-report-tags">
                  <span>Python</span>
                  <span>System Design</span>
                  <span>AWS</span>
                  <span>Kubernetes</span>
                </div>
                <svg className="engine-report-graph" viewBox="0 0 300 50" preserveAspectRatio="none">
                  <polyline
                    points="0,40 40,30 80,34 120,18 160,24 200,10 240,16 300,4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-hiring">
        <div className="wrap how-hiring-grid">
          <div className="hiring-visual">
            <img src={hiringImg} alt="AI-verified identity and evidence matching" className="hiring-img" />
          </div>
          <div>
            <h2>Evidence-Based Hiring</h2>
            <p>Stop gambling on interviews. Start hiring with the confidence of verified evidence.</p>
            <ul className="hiring-list">
              {hiringPoints.map((point) => (
                <li key={point.title}>
                  <div className="hiring-icon">
                    <point.icon size={16} />
                  </div>
                  <div>
                    <div className="hiring-title">{point.title}</div>
                    <div className="hiring-desc">{point.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="how-cta">
        <div className="wrap">
          <div className="cta-card">
            <h2>Ready to Verify Your Expertise?</h2>
            <p>Join 50,000+ professionals who are proving their worth with SkillProof AI. Secure your career&apos;s future today.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-cta-primary">Start Free Assessment</Link>
              <a href="#" className="btn btn-cta-ghost">Talk to Sales</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
