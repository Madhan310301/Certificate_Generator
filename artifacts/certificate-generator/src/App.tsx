import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  AlertTriangle,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Download,
  FileText,
  LogOut,
  Mail,
  RefreshCw,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import certificateTemplate from '@assets/certificate_template_biher.png';
import appLogo from '@assets/gsa_logo.png';
import { AttendeeLogin } from './components/AttendeeLogin';
import {
  getCurrentAttendee,
  getAttendeeClaim,
  hasAttendeeReachedLimit,
  logoutAttendee,
  recordAttendeeCertificate,
  type ClaimedCertificate,
} from './services/auth-service';
import type { AttendeeRecord } from './data/attendees';

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export const STATIC_CERTIFICATE_DATE = '08th Sep , 2026';
export const STATIC_INITIATIVE_NAME = 'Orientation Program';

function formatCertificateDate(): string {
  return STATIC_CERTIFICATE_DATE;
}

const CERTIFICATE_CONFIG = {
  templateImage: certificateTemplate as string | null,
  width: 1024,
  height: 769,
  name: {
    x: 512,
    y: 352,
    fontFamily: "'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', Arial, sans-serif",
    fontSize: 28,
    color: '#0f172a',
    textAlign: 'center' as CanvasTextAlign,
  },
  date: {
    text: STATIC_CERTIFICATE_DATE,
    x: 228,
    y: 654,
    fontFamily: "'Product Sans', 'Google Sans', 'Plus Jakarta Sans', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center' as CanvasTextAlign,
  },
  initiative: {
    text: STATIC_INITIATIVE_NAME,
    x: 508,
    y: 654,
    fontFamily: "'Product Sans', 'Google Sans', 'Plus Jakarta Sans', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center' as CanvasTextAlign,
  },
  signature: {
    // Signature will be updated later
    image: null as string | null,
    x: 796,
    y: 654,
  },
};

function drawFallbackCertificate(
  context: CanvasRenderingContext2D,
  name: string,
  width: number,
  height: number,
  dateStr: string = STATIC_CERTIFICATE_DATE,
  initiativeStr: string = STATIC_INITIATIVE_NAME
) {
  const navy = '#253252';
  const gold = '#dba548';
  const coral = '#c95b50';
  const cream = '#f8f0df';

  context.fillStyle = cream;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = gold;
  context.lineWidth = 7;
  context.strokeRect(38, 38, width - 76, height - 76);
  context.strokeStyle = 'rgba(201, 91, 80, .5)';
  context.lineWidth = 2;
  context.strokeRect(58, 58, width - 116, height - 116);

  context.fillStyle = coral;
  context.font = '600 25px "DM Sans"';
  context.textAlign = 'center';
  context.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 243);

  context.fillStyle = navy;
  context.font = '500 82px Fraunces, Georgia, serif';
  context.fillText('This certificate belongs to', width / 2, 393);

  context.fillStyle = navy;
  context.font = `700 ${CERTIFICATE_CONFIG.name.fontSize}px ${CERTIFICATE_CONFIG.name.fontFamily}, Georgia, serif`;
  context.textAlign = CERTIFICATE_CONFIG.name.textAlign;
  context.fillText(name || 'Your name here', CERTIFICATE_CONFIG.name.x, CERTIFICATE_CONFIG.name.y);

  // Date and Initiative
  context.fillStyle = '#000000';
  context.font = `700 ${CERTIFICATE_CONFIG.date.fontSize}px ${CERTIFICATE_CONFIG.date.fontFamily}`;
  context.textAlign = CERTIFICATE_CONFIG.date.textAlign;
  context.fillText(dateStr || STATIC_CERTIFICATE_DATE, CERTIFICATE_CONFIG.date.x, CERTIFICATE_CONFIG.date.y);

  context.textAlign = CERTIFICATE_CONFIG.initiative.textAlign;
  context.fillText(initiativeStr || STATIC_INITIATIVE_NAME, CERTIFICATE_CONFIG.initiative.x, CERTIFICATE_CONFIG.initiative.y);
}

let cachedTemplateImage: HTMLImageElement | null = null;
let imageLoadPromise: Promise<HTMLImageElement> | null = null;

function loadTemplateImage(src: string): Promise<HTMLImageElement> {
  if (cachedTemplateImage && cachedTemplateImage.complete && cachedTemplateImage.naturalWidth > 0) {
    return Promise.resolve(cachedTemplateImage);
  }
  if (!imageLoadPromise) {
    imageLoadPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        cachedTemplateImage = img;
        resolve(img);
      };
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }
  return imageLoadPromise;
}

function useCertificateRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  name: string,
  dateStr: string = STATIC_CERTIFICATE_DATE,
  initiativeStr: string = STATIC_INITIATIVE_NAME
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CERTIFICATE_CONFIG.width;
    canvas.height = CERTIFICATE_CONFIG.height;
    const context = canvas.getContext('2d');
    if (!context) return;

    let cancelled = false;
    const drawParticipantName = () => {
      if (cancelled) return;
      const textToDraw = (name || 'Your Full Name').trim();
      let fontSize = CERTIFICATE_CONFIG.name.fontSize;
      const maxTextWidth = 500;
      context.font = `700 ${fontSize}px ${CERTIFICATE_CONFIG.name.fontFamily}`;

      let textWidth = context.measureText(textToDraw).width;
      while (textWidth > maxTextWidth && fontSize > 16) {
        fontSize -= 1;
        context.font = `700 ${fontSize}px ${CERTIFICATE_CONFIG.name.fontFamily}`;
        textWidth = context.measureText(textToDraw).width;
      }

      context.fillStyle = CERTIFICATE_CONFIG.name.color;
      context.textAlign = CERTIFICATE_CONFIG.name.textAlign;
      context.fillText(textToDraw, CERTIFICATE_CONFIG.name.x, CERTIFICATE_CONFIG.name.y);
    };

    const drawCertificateDate = () => {
      if (cancelled) return;
      const displayDate = dateStr || STATIC_CERTIFICATE_DATE;
      context.font = `${CERTIFICATE_CONFIG.date.fontWeight} ${CERTIFICATE_CONFIG.date.fontSize}px ${CERTIFICATE_CONFIG.date.fontFamily}`;
      context.fillStyle = CERTIFICATE_CONFIG.date.color;
      context.textAlign = CERTIFICATE_CONFIG.date.textAlign;
      context.textBaseline = 'alphabetic';
      context.fillText(displayDate, CERTIFICATE_CONFIG.date.x, CERTIFICATE_CONFIG.date.y);
    };

    const drawInitiativeName = () => {
      if (cancelled) return;
      const displayInitiative = initiativeStr || STATIC_INITIATIVE_NAME;
      let fontSize = CERTIFICATE_CONFIG.initiative.fontSize;
      const maxTextWidth = 210;
      context.font = `${CERTIFICATE_CONFIG.initiative.fontWeight} ${fontSize}px ${CERTIFICATE_CONFIG.initiative.fontFamily}`;

      let textWidth = context.measureText(displayInitiative).width;
      while (textWidth > maxTextWidth && fontSize > 13) {
        fontSize -= 1;
        context.font = `${CERTIFICATE_CONFIG.initiative.fontWeight} ${fontSize}px ${CERTIFICATE_CONFIG.initiative.fontFamily}`;
        textWidth = context.measureText(displayInitiative).width;
      }

      context.fillStyle = CERTIFICATE_CONFIG.initiative.color;
      context.textAlign = CERTIFICATE_CONFIG.initiative.textAlign;
      context.textBaseline = 'alphabetic';
      context.fillText(displayInitiative, CERTIFICATE_CONFIG.initiative.x, CERTIFICATE_CONFIG.initiative.y);
    };

    const renderAll = (img: HTMLImageElement) => {
      if (cancelled) return;
      context.clearRect(0, 0, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
      context.drawImage(img, 0, 0, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
      drawParticipantName();
      drawCertificateDate();
      drawInitiativeName();
    };

    if (CERTIFICATE_CONFIG.templateImage) {
      if (cachedTemplateImage && cachedTemplateImage.complete && cachedTemplateImage.naturalWidth > 0) {
        renderAll(cachedTemplateImage);
      } else {
        loadTemplateImage(CERTIFICATE_CONFIG.templateImage)
          .then((img) => {
            if (!cancelled) renderAll(img);
          })
          .catch(() => {
            if (!cancelled) {
              drawFallbackCertificate(context, name, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height, dateStr, initiativeStr);
            }
          });
      }

      return () => {
        cancelled = true;
      };
    }

    drawFallbackCertificate(context, name, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height, dateStr, initiativeStr);

    return () => {
      cancelled = true;
    };
  }, [canvasRef, name, dateStr, initiativeStr]);
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [attendee, setAttendee] = useState<AttendeeRecord | null>(() => getCurrentAttendee());
  const [existingClaim, setExistingClaim] = useState<ClaimedCertificate | null>(null);

  const [name, setName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedCurrent, setHasGeneratedCurrent] = useState(false);
  const [limitReachedError, setLimitReachedError] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Enter your name to preview and download your certificate.');

  // Check if current attendee has already generated
  useEffect(() => {
    if (attendee) {
      if (attendee.isUnlimited) {
        setExistingClaim(null);
        setName('');
        setHasGeneratedCurrent(false);
        setStatusMessage('Admin Mode (Unlimited): You can generate and download multiple certificates.');
        return;
      }
      const claim = getAttendeeClaim(attendee.email);
      if (claim) {
        setExistingClaim(claim);
        setName(claim.participantName);
        setStatusMessage(`Certificate previously generated for ${claim.participantName}.`);
      } else {
        setExistingClaim(null);
        setName('');
        setHasGeneratedCurrent(false);
        setStatusMessage('Enter your name to preview and download your certificate.');
      }
    } else {
      setExistingClaim(null);
      setName('');
      setHasGeneratedCurrent(false);
    }
  }, [attendee]);

  const activeName = (!attendee?.isUnlimited && existingClaim) ? existingClaim.participantName : name;
  const activeDate = STATIC_CERTIFICATE_DATE;
  const activeInitiative = STATIC_INITIATIVE_NAME;

  useCertificateRenderer(canvasRef, activeName, activeDate, activeInitiative);

  const handleLoginSuccess = (user: AttendeeRecord) => {
    setAttendee(user);
    setLimitReachedError(false);
  };

  const handleLogout = () => {
    logoutAttendee();
    setAttendee(null);
    setExistingClaim(null);
    setName('');
    setHasGeneratedCurrent(false);
    setLimitReachedError(false);
  };

  const handleGenerate = useCallback(() => {
    if (!attendee) return;

    // Check limit enforcement (bypassed for unlimited accounts)
    if (!attendee.isUnlimited && (hasAttendeeReachedLimit(attendee.email) || existingClaim)) {
      setLimitReachedError(true);
      setStatusMessage('You have reached your limit. Each login can generate only one certificate.');
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName || isGenerating) {
      setStatusMessage('Please enter your full name first.');
      return;
    }

    setIsGenerating(true);
    setStatusMessage('Generating your official certificate…');

    window.setTimeout(() => {
      const canvas = canvasRef.current;
      const dataUrl = canvas ? canvas.toDataURL('image/png') : '';
      const issueDate = STATIC_CERTIFICATE_DATE;
      const initiativeName = STATIC_INITIATIVE_NAME;

      const result = recordAttendeeCertificate(
        attendee.email,
        attendee.phone,
        trimmedName,
        issueDate,
        dataUrl,
        attendee.isUnlimited,
        initiativeName
      );

      setIsGenerating(false);

      if (result.success) {
        if (!attendee.isUnlimited && result.claim) {
          setExistingClaim(result.claim);
        }
        setHasGeneratedCurrent(true);
        setLimitReachedError(false);
        setStatusMessage(
          attendee.isUnlimited
            ? `Official certificate generated for ${trimmedName}! Ready to download.`
            : `Official certificate ready for ${trimmedName}!`
        );
      } else {
        setLimitReachedError(true);
        setStatusMessage(result.error || 'You have reached your limit.');
      }
    }, 450);
  }, [attendee, existingClaim, isGenerating, name]);

  const handleDownloadPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const downloadName = (!attendee?.isUnlimited && existingClaim) ? existingClaim.participantName : name;
    const safeFilename = `${(downloadName || 'certificate').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'certificate'}-google-freshers-fuse.png`;
    const link = document.createElement('a');
    link.download = safeFilename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatusMessage('Certificate downloaded successfully! 🎉');
  }, [attendee?.isUnlimited, existingClaim, name]);

  // If user is not logged in, render the login page
  if (!attendee) {
    return (
      <main className="app-shell">
        <AttendeeLogin onLoginSuccess={handleLoginSuccess} />
      </main>
    );
  }

  const isClaimed = !attendee.isUnlimited && Boolean(existingClaim);
  const canDownload = isClaimed || (Boolean(attendee.isUnlimited) && hasGeneratedCurrent);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" data-testid="brand-mark">
          <img
            className="college-logo"
            src={appLogo}
            alt="Google Student Ambassador Program"
          />
          <div className="brand-text">
            <span className="brand-title">Google Student Ambassador</span>
            <span className="brand-subtitle">BIHER Campus Community</span>
          </div>
        </div>

        <div className="event-badge-container">
          <span className="event-badge">
            <Sparkles size={14} />
            Google Fresher&apos;s Fuse 2026
          </span>
        </div>

        {/* User status & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <User size={13} className={attendee.isUnlimited ? "text-amber-600" : "text-blue-600"} />
            <span className="font-medium truncate max-w-[180px]">
              {attendee.email}{attendee.isUnlimited ? ' (Unlimited)' : ''}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
            data-testid="button-attendee-logout"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-grid">
          <div className="intro">
            <div className="welcome-tag">
              <span>
                {attendee.isUnlimited
                  ? `⭐ Unlimited Access: ${attendee.email}`
                  : `🎓 Verified Attendee: ${attendee.email}`}
              </span>
            </div>

            <h1 id="page-title" className="headline">
              Claim Your Event <span className="text-gradient">Certificate</span>
            </h1>

            {/* If user has reached their limit, show prominent restriction banner */}
            {(isClaimed || (!attendee.isUnlimited && limitReachedError)) && (
              <div className="limit-reached-banner" data-testid="banner-limit-reached">
                <div className="flex items-start gap-3">
                  <ShieldAlert size={22} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 text-base">You have reached your limit.</h3>
                    <p className="mt-1 text-xs sm:text-sm text-amber-800 leading-relaxed">
                      You have already generated your official certificate of participation for <strong>Google Fresher&apos;s Fuse 2026</strong>.
                      Each attendee login is allocated exactly <strong>one certificate</strong> to preserve verification integrity.
                    </p>
                    {existingClaim && (
                      <div className="mt-2 text-xs font-semibold text-amber-950 bg-amber-100/80 px-2.5 py-1.5 rounded-md inline-block">
                        Issued to: {existingClaim.participantName} • Issue Date: {existingClaim.issueDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {attendee.isUnlimited ? (
              <p className="intro-copy">
                Welcome to <strong>Admin Access Mode</strong> for <strong>Google Fresher&apos;s Fuse 2026</strong>.
                This account has <strong>unlimited certificate generation</strong> permissions without the 1-certificate restriction.
              </p>
            ) : !isClaimed ? (
              <p className="intro-copy">
                Congratulations on attending <strong>Google Fresher&apos;s Fuse 2026</strong>!
                Enter your full name below to generate your official verified certificate. <strong>Note: You can only generate your certificate once.</strong>
              </p>
            ) : null}

            <div className="entry-card">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleGenerate();
                }}
                aria-label="Generate your certificate"
              >
                <div className="form-group">
                  <label htmlFor="certificate-name" className="entry-label">
                    Participant Full Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="certificate-name"
                      className="name-input"
                      data-testid="input-certificate-name"
                      type="text"
                      value={name}
                      onChange={(event) => {
                        if (!isClaimed) {
                          setName(event.target.value);
                          if (attendee.isUnlimited) {
                            setHasGeneratedCurrent(false);
                          }
                          setStatusMessage('Enter your name to preview your certificate.');
                        }
                      }}
                      disabled={isClaimed}
                      placeholder={isClaimed ? existingClaim?.participantName : 'e.g. Rahul Sharma'}
                      autoComplete="name"
                      autoCapitalize="words"
                      maxLength={48}
                      required
                    />
                  </div>
                  {isClaimed ? (
                    <p className="input-hint text-amber-700 font-medium">
                      🔒 Name is locked because your certificate has already been generated.
                    </p>
                  ) : attendee.isUnlimited ? (
                    <p className="input-hint text-blue-700 font-medium">
                      ✨ Unlimited mode: You can enter any name and generate multiple certificates.
                    </p>
                  ) : (
                    <p className="input-hint">
                      💡 Please ensure spelling is accurate before generating. Each account is limited to 1 generation.
                    </p>
                  )}
                </div>

                <div className="button-group">
                  {!isClaimed ? (
                    <button
                      type="submit"
                      className="generate-button"
                      data-testid="button-generate-certificate"
                      disabled={isGenerating || !name.trim()}
                    >
                      <Award size={18} aria-hidden="true" />
                      {isGenerating
                        ? 'Generating Certificate…'
                        : attendee.isUnlimited
                        ? 'Generate Certificate'
                        : 'Generate Certificate (1-Time)'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="generate-button opacity-60 cursor-not-allowed bg-slate-400"
                      disabled={true}
                      data-testid="button-generate-disabled"
                    >
                      <ShieldAlert size={18} />
                      Limit Reached (1 of 1 Claimed)
                    </button>
                  )}

                  {(isClaimed || (attendee.isUnlimited && hasGeneratedCurrent)) && (
                    <button
                      type="button"
                      className="quick-download-button"
                      onClick={handleDownloadPng}
                      data-testid="button-download-quick"
                    >
                      <Download size={18} aria-hidden="true" />
                      Download Certificate (PNG)
                    </button>
                  )}
                </div>

                <div className="date-badge" data-testid="badge-certificate-date">
                  <Calendar size={15} className="date-badge-icon" />
                  <span>Date: <strong>{STATIC_CERTIFICATE_DATE}</strong> • Initiative: <strong>{STATIC_INITIATIVE_NAME}</strong></span>
                </div>
              </form>
            </div>

            <div className="feature-cards">
              <div className="feature-item">
                <div className="feature-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <strong>Official Recognition</strong>
                  <p>Certified under the Google Student Ambassador Program at BIHER</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper" style={{ background: '#ecfdf5', color: '#059669' }}>
                  <Download size={16} />
                </div>
                <div>
                  <strong>Unlimited Re-Downloads</strong>
                  <p>Sign back in anytime with your credentials to download your copy</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Verified Attendance</strong>
                  <p>Protected by attendee registration and credential validation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview and Download */}
          <div className="preview-column">
            <div className="preview-header">
              <div className="preview-title-area">
                <h2>Certificate Preview</h2>
                <p>Live render of your official participation certificate</p>
              </div>
              <span className={`preview-badge ${canDownload ? 'badge-ready' : 'badge-draft'}`}>
                {canDownload
                  ? attendee.isUnlimited
                    ? '✓ Certificate Ready'
                    : '✓ Generated & Verified'
                  : 'Live Preview'}
              </span>
            </div>

            <div className={`canvas-frame${canDownload ? ' generated' : ''}`} data-testid="certificate-preview">
              <canvas
                ref={canvasRef}
                className="certificate-canvas"
                aria-label={isClaimed ? `Certificate for ${activeName}` : 'Certificate preview'}
                role="img"
              />
              {isGenerating && (
                <div className="canvas-loading" data-testid="status-generating" aria-live="polite">
                  <div className="loading-spinner"></div>
                  <span>Generating certificate…</span>
                </div>
              )}
            </div>

            <div className="result-bar">
              <div className="result-status" data-testid="status-certificate">
                <span className={`result-status-icon ${canDownload ? 'icon-success' : 'icon-pending'}`} aria-hidden="true">
                  {canDownload ? <Check size={18} /> : <Award size={18} />}
                </span>
                <div className="result-status-text">
                  <strong>
                    {canDownload
                      ? attendee.isUnlimited
                        ? 'Certificate Ready!'
                        : 'Certificate Verified!'
                      : 'Waiting for Name'}
                  </strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
              <button
                type="button"
                className="download-button"
                data-testid="button-download-certificate"
                onClick={handleDownloadPng}
                disabled={!canDownload || isGenerating}
              >
                <Download size={17} aria-hidden="true" />
                <span>Download PNG</span>
              </button>
            </div>

            {canDownload && (
              <div className="share-prompt" data-testid="share-prompt-linkedin">
                <Sparkles size={16} className="text-blue-600 shrink-0" />
                <span>
                  Tag us in the caption:{' '}
                  <a
                    href="https://www.linkedin.com/in/madhankumart"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Madhan Kumar T
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <strong>Google Student Ambassador Program</strong>
          <span>Bharath Institute of Higher Education and Research (BIHER)</span>
        </div>
        <div className="footer-center">
          <span>Event: Google Fresher&apos;s Fuse 2026</span>
        </div>
        <div className="footer-right">
          <span>Built with Passion by <a className="footer-credit" href="https://www.madhankumart.in" target="_blank" rel="noopener noreferrer">Madhan Kumar T</a></span>
        </div>
      </footer>
    </main>
  );
}

export default App;
