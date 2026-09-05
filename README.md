# Google Fresher's Fuse 2026 — Certificate Generator Portal

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Official certificate generation and distribution portal for **Google Fresher's Fuse 2026**, organized by the **Google Student Ambassador (GSA) Program** at **Bharath Institute of Higher Education and Research (BIHER)**.

---

## 🌟 Key Features

- 🎓 **Official Participation Certificate**: Generates authentic participation certificates with the official BIHER and Google Student Ambassador branding.
- 📱 **Fully Responsive Across All Devices**: Seamless experience across **Mobile (320px–480px)**, **Tablet (641px–1024px)**, and **Laptop/Desktop (1025px+)**.
  - **Mobile**: Touch-first ergonomics, 48px touch targets, iOS Safari zoom-prevention, in-card quick download button.
  - **Tablet**: Balanced centered layout with 3-column feature badges and full-width preview.
  - **Laptop / Desktop**: Dual-column layout with a sticky preview column that stays in view as you type.
- ⚡ **Instant Client-Side Rendering**: Powered by HTML5 Canvas with sub-second rendering directly in your browser — zero latency, zero server processing, and complete privacy.
- 🔠 **Smart Text Scaling**: Automatically balances and scales long participant names so text never overflows the designated signature line.
- 📥 **High-Resolution Export**: One-click download as a crisp PNG file, ready to share on LinkedIn, portfolios, and resumes.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & DM Sans via Google Fonts

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or 20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/Madhan310301/Certificate_Generator.git
cd Certificate_Generator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 📦 Building & Production Preview

```bash
# Build the production bundle
pnpm build

# Preview production build locally
pnpm preview
```

The output bundle is generated at `artifacts/certificate-generator/dist`.

---

## ☁️ Deployment

The repository includes pre-configured deployment files for zero-config deployments:

### 1. Vercel
Import the repository on [Vercel](https://vercel.com). The included `vercel.json` automatically sets the build command and output directory.

### 2. Netlify
Import the repository on [Netlify](https://netlify.com). The included `netlify.toml` handles the build and single-page routing automatically.

### 3. GitHub Pages
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. To enable:
1. Go to your repository **Settings** → **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Pushes to `main` will automatically build and deploy the portal.

---

## 👨‍💻 Author

Built with ❤️ by **[Madhan Kumar T](https://www.madhankumart.in)** for the **Google Student Ambassador Program at BIHER**.
