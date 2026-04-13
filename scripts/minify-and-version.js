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
  const newPatch = version.patch + 1;
  if (newPatch > 10) {
    const newMinor = version.minor + 1;
    if (newMinor > 10) {
      return {
        major: version.major + 1,
        minor: 0,
        patch: 0
      };
    }
    return {
      major: version.major,
      minor: newMinor,
      patch: 0
    };
  }
  return {
    ...version,
    patch: newPatch
  };
}

function versionToString(version) {
  return `${version.major}.${version.minor}.${version.patch}`;
}

function updateHTMLReferences(modifiedFiles, incrementVersions = true) {
  let html = fs.readFileSync(HTML_FILE, 'utf8');
  
  for (const file of modifiedFiles) {
    const relativePath = toForwardSlash(path.relative(PROJECT_ROOT, file));
    const minPath = toForwardSlash(getMinifiedPath(relativePath));
    
    // 在 HTML 中查找 minified 文件的引用
    const escapedMinPath = minPath.replace(/\./g, '\\.');
    const pattern = new RegExp(escapedMinPath + '(\\?v=[^"\']*)?', 'g');
    
    html = html.replace(pattern, (match, versionPart) => {
      if (incrementVersions) {
        if (versionPart) {
          const currentVersion = parseVersion(versionPart.substring(3));
          const newVersion = incrementVersion(currentVersion);
          const newVersionStr = versionToString(newVersion);
          console.log(`Updated version: ${minPath}${versionPart} -> ${minPath}?v=${newVersionStr}`);
          return `${minPath}?v=${newVersionStr}`;
        }
        // 如果没有版本号，添加一个初始版本
        console.log(`Added version to: ${minPath} -> ${minPath}?v=1.0.1`);
        return `${minPath}?v=1.0.1`;
      } else {
        // 不递增版本号，保持原样
        if (versionPart) {
          console.log(`Skipped version update: ${minPath}${versionPart}`);
          return match;
        }
        console.log(`Skipped version update: ${minPath}`);
        return match;
      }
    });
  }
  
  fs.writeFileSync(HTML_FILE, html, 'utf8');
}

async function main() {
  const args = process.argv.slice(2);
  const jsFiles = [];
  const cssFiles = [];
  let incrementVersions = true;
  
  for (const arg of args) {
    if (arg === '--no-version') {
      incrementVersions = false;
      continue;
    }
    
    const fullPath = path.join(PROJECT_ROOT, arg);
    if (!fs.existsSync(fullPath)) continue;
    
    const ext = path.extname(arg).toLowerCase();
    if (ext === '.js') {
      jsFiles.push(fullPath);
    } else if (ext === '.css') {
      cssFiles.push(fullPath);
    }
  }
  
  console.log(`Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files to process`);
  console.log(`Increment versions: ${incrementVersions}`);
  
  for (const file of jsFiles) {
    await processFile(file, 'js');
  }
  
  for (const file of cssFiles) {
    await processFile(file, 'css');
  }
  
  updateHTMLReferences([...jsFiles, ...cssFiles], incrementVersions);
  
  console.log('Done!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
