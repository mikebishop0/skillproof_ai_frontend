import { Link } from 'react-router-dom';
import './landingPage.css';

export default function LandingPage() {
  return (
    <div className="spai">
      <nav>
        <div className="wrap">
          <div className="logo">
            <span className="logo-mark">S</span>SkillProof AI
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#recruiters">For recruiters</a>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log in</Link>
            <Link to="/register" className="btn btn-primary">Get verified</Link>
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
              assessments, and earn badges recruiters can actually trust — no interview required
              to prove you&apos;re for real.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Build your profile — free</Link>
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
                    <div className="proof-name">Aarav Sharma</div>
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
              guess — so every hire becomes a bet.
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
          <div className="section-head">
            <div className="eyebrow">How it works</div>
            <h2>From claim to proof in five steps.</h2>
            <p>Every badge on SkillProof AI is backed by an evidence trail a recruiter can actually inspect.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Upload evidence</h3>
              <p>Projects, GitHub links, architecture diagrams, certificates.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>AI review</h3>
              <p>Our AI evaluates complexity, code quality, and technical depth.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Take assessments</h3>
              <p>Coding tests, architecture scenarios, real-world problems.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h3>Earn your badge</h3>
              <p>Verified skill badges tied to your actual score.</p>
            </div>
            <div className="step">
              <div className="step-num">05</div>
              <h3>Share your profile</h3>
              <p>One public link recruiters can view for free, no login.</p>
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
          <p>Search verified candidates and view their full evidence trail — free for recruiters.</p>
          <Link to="/recruiter/search" className="btn btn-primary">Browse verified candidates</Link>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div>© {new Date().getFullYear()} SkillProof AI</div>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
