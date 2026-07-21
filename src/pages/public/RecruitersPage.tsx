import { Link } from 'react-router-dom';
import {
  Zap,
  Search,
  Clock,
  MapPin,
  Bookmark,
  CheckCircle2,
  Cloud,
  Layers,
  Database,
  Network,
  Lock,
  Download,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import Footer from '../../components/Footer';
import logo from '../../assets/logo1.png';
import './recruitersPage.css';

const candidates = [
  {
    initials: 'SC',
    name: 'Sarah Chen',
    role: 'Senior Frontend Architect',
    score: 98,
    tags: ['React.js', 'TypeScript', 'GraphQL'],
  },
  {
    initials: 'MH',
    name: 'Marcus Holloway',
    role: 'Machine Learning Engineer',
    score: 92,
    tags: ['PyTorch', 'LLM Fine-tuning', 'SQL'],
  },
  {
    initials: 'ER',
    name: 'Elena Rodriguez',
    role: 'Senior Product Designer',
    score: 95,
    tags: ['Figma Pro', 'UX Research', 'Prototyping'],
  },
];

const companies = [
  { name: 'CloudScale', icon: Cloud },
  { name: 'NeoVibe', icon: Layers },
  { name: 'StructIQ', icon: Database },
  { name: 'OpenNode', icon: Network },
  { name: 'SecureLayer', icon: Lock },
];

const placements = [
  'Backend Eng placed at CloudScale',
  'UX Lead hired by NeoVibe',
  'Data Analyst at StructIQ',
  'DevOps Eng at OpenNode',
];

const trendingSkills = [
  { name: 'Generative AI (LLMs)', change: '+42%', positive: true, pct: 88 },
  { name: 'Rust (Systems Eng)', change: '+18%', positive: true, pct: 60 },
  { name: 'Solidity', change: '-5%', positive: false, pct: 30 },
  { name: 'Go (Microservices)', change: '+22%', positive: true, pct: 68 },
];

export default function RecruitersPage() {
  return (
    <div className="spai-recruiters">
      <nav>
        <div className="wrap">
          <div className="logo">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </div>
          <div className="nav-links">
            <Link to="/how-it-works">How it Works</Link>
            <Link to="/features">Features</Link>
            <Link to="/recruiters" className="active">Recruiters</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <header className="rec-hero">
        <div className="wrap">
          <div className="eyebrow">
            <Zap size={13} /> Recruiter Portal 2.0
          </div>
          <h1>
            Find Verified Talent, <span className="accent-line">Not Just Resumes.</span>
          </h1>
          <p className="lede">
            Stop scanning keywords. Search through the world&apos;s largest database of
            evidence-verified skill reports for technical and creative talent.
          </p>
          <div className="search-bar">
            <div className="search-field">
              <Search size={15} />
              <input type="text" placeholder="Skill (e.g. React, Figma)" />
            </div>
            <div className="search-field">
              <Clock size={15} />
              <select defaultValue="">
                <option value="">Any Experience</option>
                <option value="junior">Junior (0-2 yrs)</option>
                <option value="mid">Mid (2-5 yrs)</option>
                <option value="senior">Senior (5+ yrs)</option>
              </select>
            </div>
            <div className="search-field">
              <MapPin size={15} />
              <input type="text" placeholder="Remote / City" />
            </div>
            <Link to="/recruiter/search" className="btn btn-primary">Search Talent</Link>
          </div>
        </div>
      </header>

      <section className="rec-candidates">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <h2>Top Verified Candidates</h2>
              <p>Ranked by objective competency data, not years of experience alone.</p>
            </div>
            <Link to="/recruiter/search" className="view-all">
              View All Results <ArrowRight size={14} />
            </Link>
          </div>
          <div className="candidate-grid">
            {candidates.map((c) => (
              <div className="candidate-card" key={c.name}>
                <div className="candidate-top">
                  <div className="candidate-id">
                    <div className="candidate-avatar">{c.initials}</div>
                    <div>
                      <div className="candidate-name">{c.name}</div>
                      <div className="candidate-role">{c.role}</div>
                    </div>
                  </div>
                  <div className="candidate-score">
                    <div className="num">{c.score}%</div>
                    <div className="lbl">Skill Accuracy</div>
                  </div>
                </div>
                <div className="candidate-tags">
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="candidate-bar-track">
                  <div className="candidate-bar-fill" style={{ width: `${c.score}%` }} />
                </div>
                <div className="candidate-actions">
                  <Link to="/recruiter/search" className="btn btn-primary btn-small">View Evidence</Link>
                  <button type="button" className="icon-btn" aria-label="Save candidate">
                    <Bookmark size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rec-placements">
        <div className="wrap">
          <div className="placements-label">Proven Results: Recent Placements</div>
          <div className="company-row">
            {companies.map((company) => (
              <div className="company-item" key={company.name}>
                <company.icon size={16} />
                {company.name}
              </div>
            ))}
          </div>
          <div className="placement-grid">
            {placements.map((placement) => (
              <div className="placement-card" key={placement}>
                <CheckCircle2 size={16} />
                {placement}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rec-intel">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
            <h2>Data-Driven Hiring Intelligence</h2>
          </div>
          <div className="intel-grid">
            <div className="intel-card">
              <div className="intel-card-head">
                <h3>Verified Skill Density Map</h3>
                <div className="map-toggle">
                  <span className="active">React</span>
                  <span>Python</span>
                </div>
              </div>
              <p className="intel-sub">Global distribution of top-tier verified React developers.</p>
              <div className="map-mock">
                <div className="map-pin" style={{ top: '38%', left: '22%' }}>SF: 1,240 Verified</div>
                <div className="map-pin" style={{ top: '58%', left: '68%' }}>London: 800 Verified</div>
              </div>
            </div>

            <div className="intel-card intel-card-dark">
              <h3>Trending Verified Skills</h3>
              <p className="intel-sub">Market demand vs. verified supply</p>
              <div className="trend-list">
                {trendingSkills.map((skill) => (
                  <div className="trend-row" key={skill.name}>
                    <div className="trend-top">
                      <span>{skill.name}</span>
                      <span className={skill.positive ? 'up' : 'down'}>
                        {skill.positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {skill.change}
                      </span>
                    </div>
                    <div className="trend-track">
                      <div
                        className={`trend-fill ${skill.positive ? '' : 'down'}`}
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-ghost btn-full">
                <Download size={15} /> Download Full Report
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rec-cta">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-icon">
              <Lock size={22} />
            </div>
            <h2>Get the Full Verified Truth</h2>
            <p>
              Anonymous browsing only shows the surface. Create a recruiter account to view full
              transcripts, repo analysis, and AI behavioral summaries.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">Sign Up for Enterprise</Link>
              <Link to="/login" className="btn btn-ghost">Log In Now</Link>
            </div>
            <div className="cta-note">
              <ShieldCheck size={13} /> Enterprise-grade data protection (SOC 2 Compliant)
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
