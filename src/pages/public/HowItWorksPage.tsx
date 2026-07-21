import { Link } from 'react-router-dom';
import {
  Sparkles,
  Play,
  UserRound,
  FileText,
  Layers,
  BadgeCheck,
  BarChart3,
  Fingerprint,
  Brain,
  CheckCircle2,
  TrendingUp,
  Percent,
  Scale,
  PiggyBank,
} from 'lucide-react';
import Footer from '../../components/Footer';
import logo from '../../assets/logo1.png';
import './howItWorksPage.css';

const journeySteps = [
  {
    step: 'Step 01',
    icon: UserRound,
    title: 'Build Profile',
    description: 'Import your GitHub, Portfolio, and work history to set the foundation.',
  },
  {
    step: 'Step 02',
    icon: FileText,
    title: 'Upload Projects',
    description: 'Securely share actual work samples, repositories, or documentation.',
  },
  {
    step: 'Step 03',
    icon: Layers,
    title: 'Take Assessments',
    description: 'Engage with AI-driven, adaptive challenges that probe deep expertise.',
  },
  {
    step: 'Step 04',
    icon: BadgeCheck,
    title: 'Get Verified',
    description: 'Receive your SkillProof badge and a detailed evidence-based report.',
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

export default function HowItWorksPage() {
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
              <div className="hero-monitor">
                <div className="hero-panel">
                  <div className="hero-panel-top">
                    <span>AI Assessment Platform</span>
                    <BadgeCheck size={15} />
                  </div>
                  <div className="hero-panel-title">Candidate Evaluation Report</div>
                  <div className="hero-panel-rows">
                    <div className="hero-panel-row" />
                    <div className="hero-panel-row short" />
                    <div className="hero-panel-row" />
                  </div>
                </div>
                <div className="hero-monitor-stand" />
              </div>
              <div className="hero-desk-plant" />
              <div className="hero-desk-cup" />
            </div>
          </div>
        </div>
      </header>

      <section className="how-journey">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 44px' }}>
            <h2>The Verification Journey</h2>
            <p>Simple, robust, and lightning-fast for candidates.</p>
          </div>
          <div className="journey-grid">
            {journeySteps.map((step) => (
              <div className="journey-card" key={step.title}>
                <div className="journey-icon">
                  <step.icon size={22} />
                </div>
                <div className="journey-step">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
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
            <div className="hiring-board">
              <svg viewBox="0 0 200 70" preserveAspectRatio="none">
                <polyline points="0,55 30,40 60,45 90,20 120,30 150,12 180,22" fill="none" stroke="#0058be" strokeWidth="2.5" />
                <polyline points="0,60 30,58 60,50 90,52 120,40 150,44 180,35" fill="none" stroke="#22c07a" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="hiring-people">
              <span />
              <span />
              <span />
            </div>
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
