const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const PROJECT_ROOT = path.join(__dirname, '..');
const HTML_FILE = path.join(PROJECT_ROOT, 'index.html');

function toForwardSlash(p) {
  return p.replace(/\\/g, '/');
}

async function minifyJS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = await minify(content);
  if (result.error) throw result.error;
  return result.code;
}

function minifyCSS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = new CleanCSS().minify(content);
  if (result.errors && result.errors.length > 0) throw result.errors;
  return result.styles;
}

function getMinifiedPath(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  return path.join(dir, `${base}.min${ext}`);
}

async function processFile(filePath, type) {
  let minifiedContent;
  if (type === 'js') {
    minifiedContent = await minifyJS(filePath);
  } else if (type === 'css') {
    minifiedContent = minifyCSS(filePath);
  }
  
  const minPath = getMinifiedPath(filePath);
  fs.writeFileSync(minPath, minifiedContent, 'utf8');
  console.log(`Minified: ${toForwardSlash(filePath)} -> ${toForwardSlash(minPath)}`);
  return minPath;
}

function parseVersion(versionStr) {
  const match = versionStr.match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3])
  };
}

function incrementVersion(version) {
  if (!version) return { major: 1, minor: 0, patch: 1 };
  return {
    ...version,
    patch: version.patch + 1
  };
}

function versionToString(version) {
  return `${version.major}.${version.minor}.${version.patch}`;
}

function updateHTMLReferences(modifiedFiles) {
  let html = fs.readFileSync(HTML_FILE, 'utf8');
  const originalToMinMap = new Map();
  
  for (const file of modifiedFiles) {
    const relativePath = toForwardSlash(path.relative(PROJECT_ROOT, file));
    const minPath = toForwardSlash(getMinifiedPath(relativePath));
    originalToMinMap.set(relativePath, minPath);
  }
  
  for (const [originalPath, minPath] of originalToMinMap) {
    const escapedOriginalPath = originalPath.replace(/\./g, '\\.');
    const pattern = new RegExp(escapedOriginalPath + '(\\?v=[^"\']*)?', 'g');
    html = html.replace(pattern, (match, versionPart) => {
      if (versionPart) {
        const currentVersion = parseVersion(versionPart.substring(3));
        const newVersion = incrementVersion(currentVersion);
        const newVersionStr = versionToString(newVersion);
        console.log(`Updated version: ${originalPath}${versionPart} -> ${minPath}?v=${newVersionStr}`);
        return `${minPath}?v=${newVersionStr}`;
      }
      console.log(`Updated reference: ${originalPath} -> ${minPath}`);
      return minPath;
    });
  }
  
  fs.writeFileSync(HTML_FILE, html, 'utf8');
}

async function main() {
  const modifiedFiles = process.argv.slice(2);
  const jsFiles = [];
  const cssFiles = [];
  
  for (const file of modifiedFiles) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(fullPath)) continue;
    
    const ext = path.extname(file).toLowerCase();
    if (ext === '.js') {
      jsFiles.push(fullPath);
    } else if (ext === '.css') {
      cssFiles.push(fullPath);
    }
  }
  
  console.log(`Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files to process`);
  
  for (const file of jsFiles) {
    await processFile(file, 'js');
  }
  
  for (const file of cssFiles) {
    await processFile(file, 'css');
  }
  
  updateHTMLReferences([...jsFiles, ...cssFiles]);
  
  console.log('Done!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
