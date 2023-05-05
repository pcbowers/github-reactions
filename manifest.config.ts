import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = packageJson.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === 'staging' ? '[INTERNAL] GitHub Reactions' : 'GitHub Reactions',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: packageJson.version,
  description: packageJson.description,
  author: packageJson.author,
  action: {
    default_icon: {
      '16': 'images/icon-16.png',
      '24': 'images/icon-32.png',
      '32': 'images/icon-48.png',
    },
    default_title: 'GitHub Reactions',
    default_popup: 'index.html',
  },
  icons: {
    '16': 'images/icon-16.png',
    '19': 'images/icon-19.png',
    '24': 'images/icon-24.png',
    '32': 'images/icon-32.png',
    '38': 'images/icon-38.png',
    '48': 'images/icon-48.png',
    '57': 'images/icon-57.png',
    '128': 'images/icon-128.png',
  },
  content_scripts: [
    {
      js: ['src/content/main.tsx'],
      matches: ['*://*.github.com/*'],
      run_at: 'document_end',
    },
  ],
}))
