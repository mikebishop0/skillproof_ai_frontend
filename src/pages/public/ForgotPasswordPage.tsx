import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, Lock, CheckCircle2, ShieldCheck, Clock, Bell, ArrowLeft } from 'lucide-react';
import logo from '../../assets/logo1.png';
import './forgotPasswordPage.css';

type Step = 'request' | 'otp' | 'new-password' | 'success';

const trustStats = [
  { icon: ShieldCheck, value: '256-bit', label: 'Encryption' },
  { icon: Clock, value: '<2 min', label: 'Avg. reset time' },
  { icon: Bell, value: '24/7', label: 'Login alerts' },
];

function calculateStrength(value: string) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
  if (value.length >= 12) score++;
  return score;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const strength = calculateStrength(newPassword);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="spai-forgot">
      <div className="page">
        <div className="side">
          <div className="side-glow" />
          <div className="side-content">
            <div className="side-logo">
              <img src={logo} alt="SkillProof AI" className="logo-img" />
            </div>
            <div className="eyebrow">Account security</div>
            <h2>Losing access shouldn&apos;t cost you your progress.</h2>
            <p>
              Your verified badges, projects, and AI reports stay exactly as you left them.
              Let&apos;s get you back in safely.
            </p>

            <div className="mini-card">
              <div className="mini-top">
                <div className="mini-name">Account Protection</div>
                <div className="mini-stamp">✓ active</div>
              </div>
              <ul className="mini-checklist">
                <li><CheckCircle2 size={14} /> Password encrypted end-to-end</li>
                <li><CheckCircle2 size={14} /> Suspicious login alerts on</li>
                <li><CheckCircle2 size={14} /> One-time code verification</li>
              </ul>
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
          </div>
        </div>

        <div className="form-side">
          <div className="form-box">
            {step === 'request' && (
              <div>
                <Link to="/login" className="back-link"><ArrowLeft size={14} /> Back to log in</Link>
                <div className="step-icon"><KeyRound size={20} /></div>
                <h1>Forgot your password?</h1>
                <p className="sub">Enter the email on your account and we&apos;ll send you a code to reset it.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="field">
                    <label htmlFor="reset-email">Email</label>
                    <input
                      type="email"
                      id="reset-email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => setStep('otp')}>
                    Send reset code
                  </button>
                </form>
              </div>
            )}

            {step === 'otp' && (
              <div>
                <button type="button" className="back-link" onClick={() => setStep('request')}><ArrowLeft size={14} /> Back</button>
                <div className="step-icon"><Mail size={20} /></div>
                <h1>Check your email</h1>
                <p className="sub">
                  We sent a 6-digit code to <strong>{email || 'your email'}</strong>. Enter it below.
                </p>
                <div className="otp-row">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => setStep('new-password')}>
                  Verify code
                </button>
                <p className="resend">
                  Didn&apos;t get it? <a href="#">Resend code</a>
                </p>
              </div>
            )}

            {step === 'new-password' && (
              <div>
                <div className="step-icon"><Lock size={20} /></div>
                <h1>Set a new password</h1>
                <p className="sub">Choose a password you haven&apos;t used before.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="field">
                    <label htmlFor="new-pw">New password</label>
                    <input
                      type="password"
                      id="new-pw"
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="hint">Use 8+ characters with a number and a symbol.</div>
                  </div>
                  <div className="strength-row">
                    <div className={`strength-bar ${strength >= 1 ? 'on' : ''}`} />
                    <div className={`strength-bar ${strength >= 2 ? 'on' : ''}`} />
                    <div className={`strength-bar ${strength >= 3 ? 'on' : ''}`} />
                  </div>
                  <div className="field">
                    <label htmlFor="confirm-pw">Confirm password</label>
                    <input type="password" id="confirm-pw" placeholder="Re-enter password" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => setStep('success')}>
                    Reset password
                  </button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div className="success-box">
                <div className="success-icon"><CheckCircle2 size={26} /></div>
                <h1>Password reset</h1>
                <p className="sub">Your password has been updated. Use it to log in from now on.</p>
                <Link to="/login" className="btn btn-primary">Back to log in</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
