import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Users, ShieldCheck, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { candidate } from '../../data/candidateMock';
import logo from '../../assets/logo1.png';
import './authPage.css';

type Mode = 'login' | 'signup';
type Role = 'candidate' | 'recruiter';

const trustStats = [
  { icon: Users, value: '50K+', label: 'Verified profiles' },
  { icon: ShieldCheck, value: '98.4%', label: 'AI accuracy' },
  { icon: TrendingUp, value: '600+', label: 'Companies hiring' },
];

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [mode, setModeState] = useState<Mode>(location.pathname === '/register' ? 'signup' : 'login');
  const [role, setRole] = useState<Role>('candidate');
  const [email, setEmail] = useState('');

  const setMode = (next: Mode) => {
    setModeState(next);
    navigate(next === 'signup' ? '/register' : '/login', { replace: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet set a mock session so the route guard and dashboards have a signed-in user to work with.
    setUser({
      id: 'mock-user',
      name: mode === 'signup' ? candidate.name : candidate.name,
      email: email || 'mayur.ramgir@example.com',
      role,
    });
    toast.success(mode === 'login' ? 'Logged in' : 'Account created');
    navigate(role === 'recruiter' ? '/recruiter/search' : '/dashboard');
  };

  return (
    <div className="spai-auth">
      <div className="page">
        <div className="side">
          <div className="side-glow" />
          <div className="side-content">
            <div className="side-logo">
              <img src={logo} alt="SkillProof AI" className="logo-img" />
            </div>
            <div className="eyebrow">Evidence-based hiring</div>
            <h2>Your next opportunity shouldn&apos;t hinge on a bullet point.</h2>
            <p>
              Join a platform where your projects, assessments, and AI reviews speak for you
              evidence recruiters can actually verify.
            </p>

            <div className="mini-card">
              <div className="mini-top">
                <div className="mini-name">Mayur Ramgir</div>
                <div className="mini-stamp">✓ verified</div>
              </div>
              <div className="mini-score">92%</div>
              <div className="mini-label">Java architecture score</div>
            </div>

            <div className="side-stats">
              {trustStats.map((stat) => (
                <div className="side-stat" key={stat.label}>
                  <stat.icon size={16} />
                  <div>
                    <div className="side-stat-value">{stat.value}</div>
                    <div className="side-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="side-trust">
              Trusted by engineering teams at CloudScale, NeoVibe, and 600+ more.
            </p>
          </div>
        </div>

        <div className="form-side">
          <div className="form-box">
            <div className="tabs">
              <div
                className={`tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                Log in
              </div>
              <div
                className={`tab ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => setMode('signup')}
              >
                Sign up
              </div>
            </div>

            {mode === 'signup' ? (
              <div>
                <h1>Create your account</h1>
                <p className="form-sub">Tell us who you are so we can set up the right experience.</p>
                <div className="role-toggle">
                  <div
                    className={`role-opt ${role === 'candidate' ? 'active' : ''}`}
                    onClick={() => setRole('candidate')}
                  >
                    <div className="r-icon">C</div>
                    <h3>Candidate</h3>
                    <p>Prove your skills with evidence</p>
                  </div>
                  <div
                    className={`role-opt ${role === 'recruiter' ? 'active' : ''}`}
                    onClick={() => setRole('recruiter')}
                  >
                    <div className="r-icon">R</div>
                    <h3>Recruiter</h3>
                    <p>Search verified candidates</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>Welcome back</h1>
                <p className="form-sub">Log in to continue building your evidence.</p>
              </div>
            )}

            <div className="oauth-row">
              <button type="button" className="oauth-btn">Continue with Google</button>
              <button type="button" className="oauth-btn">Continue with GitHub</button>
            </div>
            <div className="divider">or with email</div>

            <form onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="fname">First name</label>
                    <input type="text" id="fname" placeholder="Mayur" />
                  </div>
                  <div className="field">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" id="lname" placeholder="Ramgir" />
                  </div>
                </div>
              )}

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="At least 8 characters" />
              </div>

              {mode === 'login' && (
                <div className="row-between">
                  <label className="check">
                    <input type="checkbox" /> Stay logged in
                  </label>
                  <Link to="/forgot-password" className="link-accent">Forgot password?</Link>
                </div>
              )}

              {mode === 'signup' && (
                <label className="check" style={{ marginBottom: 22 }}>
                  <input type="checkbox" /> I agree to the{' '}
                  <a href="#" className="link-accent">terms</a> and{' '}
                  <a href="#" className="link-accent">privacy policy</a>
                </label>
              )}

              <button type="submit" className="btn btn-primary">
                {mode === 'login' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <p className="switch-line" style={{ marginTop: 22 }}>
              <span>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
              <a
                href="#"
                className="link-accent"
                onClick={(e) => {
                  e.preventDefault();
                  setMode(mode === 'login' ? 'signup' : 'login');
                }}
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
