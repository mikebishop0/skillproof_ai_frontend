import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Users, ShieldCheck, TrendingUp, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

import logo from '../../assets/logo1.png';
import './authPage.css';

type Mode = 'login' | 'signup';
type Role = 'candidate' | 'recruiter';

const trustStats = [
  { icon: Users, value: '50K+', label: 'Verified profiles' },
  { icon: ShieldCheck, value: '98.4%', label: 'AI accuracy' },
  { icon: TrendingUp, value: '600+', label: 'Companies hiring' },
];

import { authApi } from '../../services/authApi';
import { extractErrorMessage } from '../../services/apiClient';
import { countryCodes } from '../../data/countryCodes';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);
  const [mode, setModeState] = useState<Mode>(location.pathname === '/register' ? 'signup' : 'login');
  const [role, setRole] = useState<Role>('candidate');
  const [email, setEmail] = useState('');
  
  // Real Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [dialCode, setDialCode] = useState('+1');
  const [localPhone, setLocalPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [code, setCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const setMode = (next: Mode) => {
    setModeState(next);
    navigate(next === 'signup' ? '/register' : '/login', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (mode === 'signup') {
      if (!firstName || !lastName || !email || !password || !localPhone || !country) {
        toast.error('All fields are required');
        return;
      }
      setLoading(true);
      try {
        await authApi.register({
          email,
          password,
          firstName,
          lastName,
          phoneNumber: `${dialCode}${localPhone.replace(/\D/g, '')}`,
          country,
          role: role.toUpperCase() as 'CANDIDATE' | 'RECRUITER',
        });
        toast.success('Registration code sent to your email!');
        setIsConfirming(true);
      } catch (err: any) {
        console.error(err);
        toast.error(extractErrorMessage(err, 'Registration failed'));
      } finally {
        setLoading(false);
      }
    } else {
      if (!email || !password) {
        toast.error('Email and password are required');
        return;
      }
      setLoading(true);
      try {
        const res = await authApi.login({ email, password });
        const tokens = res.data.tokens;
        
        // Save tokens
        setTokens(tokens);

        // Fetch actual user details
        const meRes = await authApi.getMe();
        const userDto = meRes.data.data;

        const loggedInUser = {
          id: userDto.id,
          name: `${userDto.first_name} ${userDto.last_name}`,
          email: userDto.email,
          role: (userDto.role === 'ADMIN' ? 'admin' : userDto.role === 'RECRUITER' ? 'recruiter' : 'candidate') as any,
        };

        setUser(loggedInUser);
        toast.success('Logged in successfully!');

        if (loggedInUser.role === 'recruiter') {
          navigate('/recruiter/search');
        } else if (loggedInUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (err: any) {
        console.error(err);
        toast.error(extractErrorMessage(err, 'Invalid email or password'));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!code) {
      toast.error('Please enter the 6-digit confirmation code');
      return;
    }
    setLoading(true);
    try {
      await authApi.confirmSignup({ email, code });
      toast.success('Account confirmed! You can now log in.');
      setIsConfirming(false);
      setMode('login');
    } catch (err: any) {
      console.error(err);
      toast.error(extractErrorMessage(err, 'Verification failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email is required to resend code');
      return;
    }
    try {
      await authApi.resendCode(email);
      toast.success('Verification code resent successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(extractErrorMessage(err, 'Failed to resend code'));
    }
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
            <Link to="/" className="back-link">
              <ArrowLeft size={14} /> Back to home
            </Link>
            
            {isConfirming ? (
              <div style={{ marginTop: 24 }}>
                <h1>Verify your email</h1>
                <p className="form-sub" style={{ marginBottom: 24 }}>
                  We've sent a 6-digit confirmation code to <strong>{email}</strong>.
                </p>
                <form onSubmit={handleConfirm}>
                  <div className="field">
                    <label htmlFor="confirmCode">Confirmation Code</label>
                    <input
                      type="text"
                      id="confirmCode"
                      placeholder="123456"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: 24 }} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Confirm'}
                  </button>
                </form>
                <p className="switch-line" style={{ marginTop: 24 }}>
                  Didn't receive the code?{' '}
                  <a
                    href="#"
                    className="link-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResendCode();
                    }}
                  >
                    Resend Code
                  </a>
                </p>
                <p className="switch-line" style={{ marginTop: 12 }}>
                  <a
                    href="#"
                    className="link-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsConfirming(false);
                    }}
                  >
                    Back to Sign Up
                  </a>
                </p>
              </div>
            ) : (
              <>
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
                    <>
                      <div className="field-row">
                        <div className="field">
                          <label htmlFor="fname">First name</label>
                          <input
                            type="text"
                            id="fname"
                            placeholder="Mayur"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="lname">Last name</label>
                          <input
                            type="text"
                            id="lname"
                            placeholder="Ramgir"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="field-row">
                        <div className="field">
                          <label htmlFor="phone">Phone number</label>
                          <div className="phone-row">
                            <select
                              id="dialCode"
                              className="dial-code-select"
                              value={dialCode}
                              onChange={(e) => setDialCode(e.target.value)}
                            >
                              {countryCodes.map((c) => (
                                <option key={`${c.name}-${c.dial}`} value={c.dial}>
                                  {c.dial} {c.name}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              id="phone"
                              placeholder="9871960338"
                              value={localPhone}
                              onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, ''))}
                              required
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            placeholder="United States"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
                      <input type="checkbox" required /> I agree to the{' '}
                      <a href="#" className="link-accent">terms</a> and{' '}
                      <a href="#" className="link-accent">privacy policy</a>
                    </label>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : (mode === 'login' ? 'Log in' : 'Create account')}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
