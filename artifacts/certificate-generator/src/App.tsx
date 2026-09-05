import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { Award, Check, CheckCircle2, Download, ShieldCheck, Sparkles } from 'lucide-react';
import certificateTemplate from '@assets/certificate_template_biher.png';
import appLogo from '@assets/gsa_logo.png';

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
};

function drawFallbackCertificate(
  context: CanvasRenderingContext2D,
  name: string,
  width: number,
  height: number,
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

  const drawSeal = (x: number, y: number, radius: number) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.strokeStyle = gold;
    context.lineWidth = 4;
    context.stroke();
    context.beginPath();
    context.arc(x, y, radius - 13, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(201, 91, 80, .5)';
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = coral;
    context.font = '700 24px "DM Sans"';
    context.textAlign = 'center';
    context.fillText('•  •  •', x, y + 8);
  };

  drawSeal(142, 142, 47);
  drawSeal(width - 142, height - 142, 47);

  context.fillStyle = coral;
  context.font = '600 25px "DM Sans"';
  context.textAlign = 'center';
  context.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 243);

  context.fillStyle = navy;
  context.font = '500 82px Fraunces, Georgia, serif';
  context.fillText('This certificate belongs to', width / 2, 393);

  context.strokeStyle = gold;
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(350, 667);
  context.lineTo(width - 350, 667);
  context.stroke();

  context.fillStyle = '#6d7180';
  context.font = '500 26px "DM Sans"';
  context.fillText('for showing up, taking part, and making the moment count.', width / 2, 778);

  context.fillStyle = navy;
  context.font = '600 23px "DM Sans"';
  context.fillText('EVENT DAY  •  2025', width / 2, 920);

  context.fillStyle = coral;
  context.font = '500 19px "DM Sans"';
  context.fillText('A SMALL RECORD OF A BIG MOMENT', width / 2, 975);

  context.fillStyle = navy;
  context.font = '600 18px "DM Sans"';
  context.fillText('MOMENT / CERTIFICATE', width / 2, 1043);

  context.fillStyle = '#c8b98f';
  context.font = '18px "DM Sans"';
  context.fillText('TEMPLATE PREVIEW', width / 2, 1091);

  context.fillStyle = navy;
  context.font = `500 ${CERTIFICATE_CONFIG.name.fontSize}px ${CERTIFICATE_CONFIG.name.fontFamily}, Georgia, serif`;
  context.textAlign = CERTIFICATE_CONFIG.name.textAlign;
  context.fillText(name || 'Your name here', CERTIFICATE_CONFIG.name.x, CERTIFICATE_CONFIG.name.y);
}

function useCertificateRenderer(canvasRef: RefObject<HTMLCanvasElement | null>, name: string) {
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

    if (CERTIFICATE_CONFIG.templateImage) {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;
        context.drawImage(image, 0, 0, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
        drawParticipantName();
      };
      image.onerror = () => {
        if (!cancelled) {
          drawFallbackCertificate(context, name, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
        }
      };
      image.src = CERTIFICATE_CONFIG.templateImage;
      return () => {
        cancelled = true;
      };
    }

    drawFallbackCertificate(context, name, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);

    return () => {
      cancelled = true;
    };
  }, [canvasRef, name]);
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Enter your name to preview and download your certificate.');

  useCertificateRenderer(canvasRef, generatedName || name);

  const handleGenerate = useCallback(() => {
    const trimmedName = name.trim();
    if (!trimmedName || isGenerating) {
      setStatusMessage('Please enter your full name first.');
      return;
    }
    setIsGenerating(true);
    setStatusMessage('Generating your certificate…');
    window.setTimeout(() => {
      setGeneratedName(trimmedName);
      setHasGenerated(true);
      setIsGenerating(false);
      setStatusMessage(`Ready for ${trimmedName}! You can now download it.`);
    }, 400);
  }, [isGenerating, name]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasGenerated) return;
    const link = document.createElement('a');
    const safeFilename = `${generatedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'certificate'}-participation.png`;
    link.download = safeFilename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatusMessage('Certificate downloaded successfully! 🎉');
  }, [generatedName, hasGenerated]);

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
        <div className="portal-status">
          <span className="status-dot"></span>
          <span>Official Event Portal</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-grid">
          <div className="intro">
            <div className="welcome-tag">
              <span>🎓 Welcome, Freshers Batch of 2026!</span>
            </div>
            <h1 id="page-title" className="headline">
              Claim Your Event <span className="text-gradient">Certificate</span>
            </h1>
            <p className="intro-copy">
              Congratulations on participating in <strong>Google Fresher&apos;s Fuse 2026</strong>!
              Enter your full name below to instantly generate and download your verified certificate of participation.
            </p>

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
                    Your Full Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="certificate-name"
                      className="name-input"
                      data-testid="input-certificate-name"
                      type="text"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        if (hasGenerated) {
                          setHasGenerated(false);
                          setGeneratedName('');
                        }
                        setStatusMessage('Enter your name to preview your certificate.');
                      }}
                      placeholder="e.g. Rahul Sharma"
                      autoComplete="name"
                      autoCapitalize="words"
                      maxLength={48}
                      required
                    />
                  </div>
                  <p className="input-hint">
                    💡 Please check your spelling carefully. It will appear exactly as typed on your certificate.
                  </p>
                </div>

                <div className="button-group">
                  <button
                    type="submit"
                    className="generate-button"
                    data-testid="button-generate-certificate"
                    disabled={isGenerating || !name.trim()}
                  >
                    <Award size={18} aria-hidden="true" />
                    {isGenerating ? 'Generating Certificate…' : hasGenerated ? 'Update Certificate' : 'Generate Certificate'}
                  </button>

                  {hasGenerated && (
                    <button
                      type="button"
                      className="quick-download-button"
                      onClick={handleDownload}
                    >
                      <Download size={18} aria-hidden="true" />
                      Download Certificate (PNG)
                    </button>
                  )}
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
                  <strong>High-Resolution Export</strong>
                  <p>Ready to showcase on LinkedIn, portfolio, and resumes</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Private &amp; Instant</strong>
                  <p>Generated directly in your browser without signups</p>
                </div>
              </div>
            </div>
          </div>

          <div className="preview-column">
            <div className="preview-header">
              <div className="preview-title-area">
                <h2>Certificate Preview</h2>
                <p>Live preview of your official participation certificate</p>
              </div>
              <span className={`preview-badge ${hasGenerated ? 'badge-ready' : 'badge-draft'}`}>
                {hasGenerated ? '✓ Ready to Download' : 'Live Preview'}
              </span>
            </div>

            <div className={`canvas-frame${hasGenerated ? ' generated' : ''}`} data-testid="certificate-preview">
              <canvas
                ref={canvasRef}
                className="certificate-canvas"
                aria-label={hasGenerated ? `Certificate for ${generatedName}` : 'Certificate preview'}
                role="img"
              />
              {isGenerating && (
                <div className="canvas-loading" data-testid="status-generating" aria-live="polite">
                  <div className="loading-spinner"></div>
                  <span>Rendering certificate…</span>
                </div>
              )}
            </div>

            <div className="result-bar">
              <div className="result-status" data-testid="status-certificate">
                <span className={`result-status-icon ${hasGenerated ? 'icon-success' : 'icon-pending'}`} aria-hidden="true">
                  {hasGenerated ? <Check size={18} /> : <Award size={18} />}
                </span>
                <div className="result-status-text">
                  <strong>{hasGenerated ? 'Certificate Ready!' : 'Waiting for Name'}</strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
              <button
                type="button"
                className="download-button"
                data-testid="button-download-certificate"
                onClick={handleDownload}
                disabled={!hasGenerated || isGenerating}
              >
                <Download size={17} aria-hidden="true" />
                <span>Download PNG</span>
              </button>
            </div>

            <div className="share-prompt">
              <Sparkles size={16} className="text-blue-600 flex-shrink-0" />
              <span>
                Celebrating your college start? Post on LinkedIn with <strong>#GoogleFreshersFuse</strong> and tag <strong>@BIHER</strong>!
              </span>
            </div>
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
          <span>Built with ❤️ by <a className="footer-credit" href="https://www.madhankumart.in" target="_blank" rel="noopener noreferrer">Madhan Kumar T</a></span>
        </div>
      </footer>
    </main>
  );
}

export default App;
