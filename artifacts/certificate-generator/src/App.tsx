import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { Award, Check, Download, FileImage, Info, Sparkles } from 'lucide-react';
import certificateTemplate from '@assets/ChatGPT_Image_Sep_5,_2026,_06_26_14_PM_1788612987434.png';
import websiteCollegeLogo from '@assets/ChatGPT_Image_Sep_5,_2026,_06_37_53_PM_1788613687449.png';

/**
 * TEMPLATE CONFIGURATION
 * The supplied artwork is used unchanged. Only the participant name is drawn
 * onto the template at the configured position.
 */
const CERTIFICATE_CONFIG = {
  templateImage: certificateTemplate as string | null,
  width: 1024,
  height: 768,
  name: {
    x: 512,
    y: 316,
    fontFamily: 'Arial',
    fontSize: 28,
    color: '#111827',
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
      context.fillStyle = CERTIFICATE_CONFIG.name.color;
      context.textAlign = CERTIFICATE_CONFIG.name.textAlign;
      context.font = `700 ${CERTIFICATE_CONFIG.name.fontSize}px ${CERTIFICATE_CONFIG.name.fontFamily}, sans-serif`;
      context.fillText(
        name || 'Your name here',
        CERTIFICATE_CONFIG.name.x,
        CERTIFICATE_CONFIG.name.y,
      );
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
  const [statusMessage, setStatusMessage] = useState('Enter a name to make it official.');

  useCertificateRenderer(canvasRef, generatedName || name);

  const handleGenerate = useCallback(() => {
    const trimmedName = name.trim();
    if (!trimmedName || isGenerating) {
      setStatusMessage('Add a name first, then generate your certificate.');
      return;
    }
    setIsGenerating(true);
    setStatusMessage('Preparing your certificate…');
    window.setTimeout(() => {
      setGeneratedName(trimmedName);
      setHasGenerated(true);
      setIsGenerating(false);
      setStatusMessage(`Ready for ${trimmedName}.`);
    }, 480);
  }, [isGenerating, name]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasGenerated) return;
    const link = document.createElement('a');
    link.download = `${generatedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'certificate'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatusMessage('Downloaded. A lovely moment, made permanent.');
  }, [generatedName, hasGenerated]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" data-testid="brand-mark">
          <img
            className="college-logo"
            src={websiteCollegeLogo}
            alt="Bharath Institute of Higher Education and Research"
          />
          <span className="brand-wordmark">BIHER<span>EVENT CERTIFICATE</span></span>
        </div>
        <div className="event-identity" aria-label="Event name">
          <span className="event-kicker">Certificate for</span>
          <strong>Google Fresher&apos;s Fuse</strong>
        </div>
        <div className="template-note" data-testid="text-template-note">
          <FileImage size={14} aria-hidden="true" />
          <span>One name. One finished certificate.</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-grid">
          <div className="intro">
            <p className="eyebrow">For the moment that matters</p>
            <h1 id="page-title" className="headline">Make it<br /><em>official.</em></h1>
            <p className="intro-copy">
              Turn a name into a keepsake in seconds. No account, no waiting,
              just a certificate ready to share from your phone.
            </p>

            <form
              className="entry-card"
              onSubmit={(event) => {
                event.preventDefault();
                handleGenerate();
              }}
              aria-label="Create a certificate"
            >
              <label htmlFor="certificate-name" className="entry-label">Enter your name.</label>
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
                  setStatusMessage('Enter a name to make it official.');
                }}
                 placeholder="Enter your full name"
                autoComplete="name"
                autoCapitalize="words"
                maxLength={48}
                required
              />
              <button
                type="submit"
                className="generate-button"
                data-testid="button-generate-certificate"
                disabled={isGenerating}
              >
                <Sparkles size={17} aria-hidden="true" />
                {isGenerating ? 'Making it official…' : 'Generate certificate'}
              </button>
              <div className="entry-hint" data-testid="text-entry-hint">
                <Info size={13} aria-hidden="true" />
                Press Enter to generate. Names are not saved.
              </div>
            </form>
          </div>

          <div className="preview-column">
            <div className="preview-heading">
              <h2>Live preview</h2>
              <p>Designed to download beautifully</p>
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
                  <span aria-label="Generating certificate" />
                </div>
              )}
            </div>
            <div className="result-bar">
              <div className="result-status" data-testid="status-certificate">
                <span className="result-status-icon" aria-hidden="true">
                  {hasGenerated ? <Check size={16} /> : <Award size={16} />}
                </span>
                <div>
                  <strong>{hasGenerated ? 'Certificate ready' : 'Your certificate is waiting'}</strong>
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
                <Download size={16} aria-hidden="true" />
                Download PNG
              </button>
            </div>
            <p className="setup-notice" data-testid="text-configuration-notice">
              <Info size={15} aria-hidden="true" />
              <span>The supplied certificate artwork stays unchanged; only the participant name is added when you generate a certificate.</span>
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>Made for live event moments</span>
        <a className="footer-credit" href="https://www.madhankumart.in">Made By Madhan Kumar T</a>
        <span>Private by design · Nothing is stored</span>
      </footer>
    </main>
  );
}

export default App;
