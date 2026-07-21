import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo1.png';
import './forgotPasswordPage.css';

type Step = 'request' | 'otp' | 'new-password' | 'success';

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
      <nav>
        <div className="logo">
          <img src={logo} alt="SkillProof AI" className="logo-img" />
        </div>
      </nav>

      <div className="center-page">
        <div className="card">
          {step === 'request' && (
            <div>
              <Link to="/login" className="back-link">← Back to log in</Link>
              <div className="step-icon">🔑</div>
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
              <button type="button" className="back-link" onClick={() => setStep('request')}>← Back</button>
              <div className="step-icon">✉</div>
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
              <div className="step-icon">🔒</div>
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
              <div className="success-icon">✓</div>
              <h1>Password reset</h1>
              <p className="sub">Your password has been updated. Use it to log in from now on.</p>
              <Link to="/login" className="btn btn-primary">Back to log in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
