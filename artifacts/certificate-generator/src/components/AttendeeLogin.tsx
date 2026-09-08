import { useState, type FormEvent } from 'react';
import { Award, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, Sparkles, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';
import { loginAttendee } from '../services/auth-service';
import appLogo from '@assets/gsa_logo.png';
import type { AttendeeRecord } from '../data/attendees';

interface AttendeeLoginProps {
  onLoginSuccess: (attendee: AttendeeRecord) => void;
}

export function AttendeeLogin({ onLoginSuccess }: AttendeeLoginProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (!cleanEmail) {
      setErrorMessage('Please enter your registered Gmail or Email ID.');
      return;
    }

    if (!cleanPhone) {
      setErrorMessage('Please enter your 10-digit registered mobile number.');
      return;
    }

    setIsLoading(true);

    // Small timeout for smooth feedback
    setTimeout(() => {
      const res = loginAttendee(cleanEmail, cleanPhone);
      setIsLoading(false);

      if (res.success && res.attendee) {
        onLoginSuccess(res.attendee);
      } else {
        setErrorMessage(
          res.error || 'Invalid Email ID or Mobile Number. Please check your credentials and try again.'
        );
      }
    }, 350);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card" data-testid="card-attendee-login">
        <div className="login-header">
          <div className="login-brand">
            <img src={appLogo} alt="Google Student Ambassador" className="login-logo" />
            <div>
              <span className="login-brand-title">Google Student Ambassador</span>
              <span className="login-brand-sub">BIHER Campus Community</span>
            </div>
          </div>

          <div className="login-tag">
            <Sparkles size={14} className="text-blue-500" />
            <span>Google Fresher&apos;s Fuse 2026</span>
          </div>

          <h1 className="login-title">
            Attendee <span className="text-gradient">Login</span>
          </h1>
          <p className="login-subtitle">
            Sign in with your registered <strong>Email ID</strong> and <strong>Mobile Number</strong> to claim your official certificate of participation.
          </p>
        </div>

        {errorMessage && (
          <div className="login-error-alert" role="alert" data-testid="alert-login-error">
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <div className="text-sm">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field-group">
            <label htmlFor="login-email" className="login-label">
              Registered Email / Username
            </label>
            <div className="login-input-container">
              <Mail size={18} className="login-input-icon text-slate-400" />
              <input
                id="login-email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="e.g. rahul@gmail.com or username"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                className="login-input"
                data-testid="input-login-email"
              />
            </div>
            <span className="login-field-hint">Enter your registered email ID or attendee username.</span>
          </div>

          <div className="login-field-group">
            <label htmlFor="login-phone" className="login-label">
              Mobile Number (Password)
            </label>
            <div className="login-input-container">
              <Phone size={18} className="login-input-icon text-slate-400" />
              <input
                id="login-phone"
                type={showPassword ? 'text' : 'password'}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="10-digit mobile number"
                autoComplete="current-password"
                inputMode="numeric"
                maxLength={15}
                required
                className="login-input pr-10"
                data-testid="input-login-phone"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <span className="login-field-hint">Your 10-digit registered mobile number acts as your password.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim() || !phone.trim()}
            className="login-submit-button"
            data-testid="button-login-submit"
          >
            {isLoading ? (
              <>
                <div className="login-spinner"></div>
                Verifying Credentials…
              </>
            ) : (
              <>
                <UserCheck size={18} />
                Sign In to Claim Certificate
              </>
            )}
          </button>
        </form>

        <div className="login-notice-box">
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <ShieldCheck size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <strong>Single-Certificate Policy:</strong> Each verified attendee login is allocated exactly <strong>one certificate</strong>. Once generated, your certificate is permanently linked to your account for future downloads.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
