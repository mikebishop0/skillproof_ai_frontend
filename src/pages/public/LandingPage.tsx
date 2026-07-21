import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  UserRound,
  FolderOpen,
  ClipboardCheck,
  Sparkles,
  Award,
  Share2,
  ShieldCheck,
  FolderKanban,
  ClipboardList,
  MessageCircle,
  FileText,
  Users,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Fingerprint,
  Brain,
  CheckCircle2,
} from 'lucide-react';
import Footer from '../../components/Footer';
import logo from '../../assets/logo1.png';
import './landingPage.css';

const flowSteps = [
  { icon: UserRound, title: 'Create Profile', description: 'Build your professional profile', accent: 'verified' as const },
  { icon: FolderOpen, title: 'Upload Projects', description: 'Add projects and evidence', accent: 'claim' as const },
  { icon: ClipboardCheck, title: 'Take Assessment', description: 'Attempt skill assessments', accent: 'verified' as const },
  { icon: Sparkles, title: 'AI Review', description: 'AI analyzes your skills', accent: 'claim' as const },
  { icon: Award, title: 'Earn Badge', description: 'Get verified skill badges', accent: 'verified' as const },
  { icon: Share2, title: 'Share Profile', description: 'Share with recruiters', accent: 'claim' as const },
];

const features = [
  { icon: ShieldCheck, title: 'AI Skill Verification', description: 'Advanced AI analyzes your projects and assessments' },
  { icon: FolderKanban, title: 'Portfolio Showcase', description: 'Showcase your work, projects, achievements' },
  { icon: ClipboardList, title: 'Skill Assessments', description: 'Technical tests across multiple technologies' },
  { icon: Award, title: 'Verified Badges', description: 'Earn industry-recognized skill badges' },
  { icon: MessageCircle, title: 'AI Career Coach', description: 'Get personalized career guidance and tips' },
  { icon: FileText, title: 'Resume Optimizer', description: 'Improve your resume with AI suggestions' },
  { icon: Users, title: 'Recruiter Access', description: 'Public profile accessible to recruiters' },
  { icon: TrendingUp, title: 'Analytics & Insights', description: 'Track your progress and skill growth' },
];

export default function LandingPage() {
  return (
    <div className="spai-landing">
      <nav>
        <div className="wrap">
          <div className="logo">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </div>
          <div className="nav-links">
            <a href="#how">How it Works</a>
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

      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Evidence-based hiring</div>
            <h1>
              Turn skills into <em>verifiable</em> evidence.
            </h1>
            <p className="lede">
              Stop listing what you claim to know. Upload real projects, pass AI-reviewed
              assessments, and earn badges recruiters can actually trust no interview required
              to prove you&apos;re for real.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Build your profile free</Link>
              <a href="#recruiters" className="btn btn-ghost">I&apos;m hiring</a>
            </div>
            <div className="hero-note">Free forever for up to 3 projects. No credit card.</div>
          </div>
          <div className="proof-visual">
            <div className="stack">
              <div className="card-claim">
                <div className="label">Traditional resume</div>
                <div className="claim-line">&quot;Expert in cloud architecture&quot;</div>
                <div className="claim-line">&quot;Led microservices migration&quot;</div>
                <div className="claim-line">&quot;5+ years AI engineering&quot;</div>
              </div>
              <div className="card-proof">
                <div className="proof-top">
                  <div>
                    <div className="proof-name">Mayur Ramgir</div>
                    <div className="proof-role">Java Architecture</div>
                  </div>
                  <div className="stamp">✓ verified</div>
                </div>
                <div className="score-row">
                  <div className="score-num">92%</div>
                  <div className="score-label">competency score</div>
                </div>
                <div className="evidence-list">
                  <div className="evidence-item">Built Spring Boot microservices</div>
                  <div className="evidence-item">Designed event-driven systems</div>
                  <div className="evidence-item">Completed architecture assessment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="problem">
        <div className="wrap problem-grid">
          <div className="problem-copy">
            <div className="section-head" style={{ marginBottom: 24 }}>
              <div className="eyebrow">The problem</div>
              <h2>Resumes don&apos;t prove anything anymore.</h2>
            </div>
            <p>
              Anyone can write <strong>&quot;AI engineering,&quot; &quot;DevOps,&quot; &quot;cloud architecture&quot;</strong> on
              a resume. Recruiters have no reliable way to tell a genuine expert from a confident
              guess so every hire becomes a bet.
            </p>
            <p>
              SkillProof AI replaces the guesswork with a paper trail: real projects, AI-reviewed
              code, scored assessments, and badges that mean something because they&apos;re earned, not
              self-reported.
            </p>
          </div>
          <div className="resume-mock">
            <div className="rname">Unverified candidate</div>
            <div className="resume-line">
              Expert in cloud architecture <span className="tag">unverified</span>
            </div>
            <div className="resume-line">
              Led microservices migration <span className="tag">unverified</span>
            </div>
            <div className="resume-line">
              Strong cybersecurity background <span className="tag">unverified</span>
            </div>
            <div className="resume-line" style={{ borderBottom: 'none' }}>
              5+ years AI engineering <span className="tag">unverified</span>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            <h2>How It Works</h2>
            <p>Simple steps to get your skills verified</p>
          </div>
          <div className="flow-steps">
            {flowSteps.map((step, index) => (
              <Fragment key={step.title}>
                <div className="flow-step">
                  <div className={`flow-icon ${step.accent === 'claim' ? 'claim' : ''}`}>
                    <step.icon size={24} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < flowSteps.length - 1 && <ChevronRight className="flow-arrow" size={20} />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="features">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            <h2>Powerful Features</h2>
            <p>Everything you need to prove your skills and grow your career</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <feature.icon size={20} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="engine">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Pricing</div>
            <h2>Start free. Upgrade when it pays for itself.</h2>
          </div>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Free</div>
              <div className="price-amount">
                $0 <span>/ forever</span>
              </div>
              <div className="price-desc">For candidates getting started.</div>
              <ul className="price-features">
                <li>Profile and public badge</li>
                <li>Portfolio, up to 3 projects</li>
                <li>AI project review</li>
              </ul>
              <Link to="/register" className="btn btn-ghost">Get started</Link>
            </div>
            <div className="price-card featured">
              <div className="badge-pop">Most popular</div>
              <div className="price-tier">Premium</div>
              <div className="price-amount">
                $9 <span>/ month</span>
              </div>
              <div className="price-desc">For active job seekers.</div>
              <ul className="price-features">
                <li>Unlimited projects</li>
                <li>Interview preparation</li>
                <li>AI career coach</li>
                <li>Resume optimization</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Upgrade to Premium</Link>
            </div>
            <div className="price-card">
              <div className="price-tier">Enterprise</div>
              <div className="price-amount">
                $299 <span>/ month</span>
              </div>
              <div className="price-desc">For hiring teams and orgs.</div>
              <ul className="price-features">
                <li>Employee skills mapping</li>
                <li>Team dashboards</li>
                <li>Skills gap analysis</li>
              </ul>
              <Link to="/pricing" className="btn btn-ghost">Talk to sales</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" id="recruiters">
        <div className="wrap">
          <h2>Hire on evidence, not adjectives.</h2>
          <p>Search verified candidates and view their full evidence trail free for recruiters.</p>
          <Link to="/recruiter/search" className="btn btn-primary">Browse verified candidates</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
