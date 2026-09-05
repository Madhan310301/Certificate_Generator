import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const appDist = path.join(rootDir, 'artifacts', 'certificate-generator', 'dist');
const rootDist = path.join(rootDir, 'dist');

if (fs.existsSync(appDist)) {
  fs.cpSync(appDist, rootDist, { recursive: true });
  console.log(`[build] Successfully synced build artifacts to root dist: ${rootDist}`);
} else {
  console.warn(`[build] App dist directory not found at ${appDist}`);
}
