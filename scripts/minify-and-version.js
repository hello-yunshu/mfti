const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { minify } = require("terser");
const CleanCSS = require("clean-css");

const PROJECT_ROOT = path.join(__dirname, "..");
const HTML_FILE = path.join(PROJECT_ROOT, "index.html");

const ALL_SOURCES = [
  "data/translations.js",
  "data/personalities.js",
  "data/questions.js",
  "data/avatars.js",
  "js/engine.js",
  "js/app.js",
  "css/base.css",
  "css/quiz.css",
  "css/result.css"
];

function toForwardSlash(p) {
  return p.replace(/\\/g, "/");
}

async function minifyJS(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const result = await minify(content, { compress: true, mangle: true });
  if (!result || typeof result.code !== "string") {
    throw new Error(`Terser did not return code for ${filePath}`);
  }
  return result.code;
}

function minifyCSS(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const result = new CleanCSS().minify(content);
  if (result.errors && result.errors.length > 0) {
    throw new Error(`CleanCSS failed for ${filePath}: ${result.errors.join("; ")}`);
  }
  return result.styles;
}

function getMinifiedPath(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  return path.join(dir, `${base}.min${ext}`);
}

function contentHash(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

async function processFile(relativePath) {
  const filePath = path.join(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Source file not found: ${relativePath}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  const minified = ext === ".js" ? await minifyJS(filePath) : minifyCSS(filePath);
  const minPath = getMinifiedPath(filePath);
  fs.writeFileSync(minPath, minified, "utf8");

  console.log(`Minified: ${toForwardSlash(relativePath)} -> ${toForwardSlash(path.relative(PROJECT_ROOT, minPath))}`);
  return {
    minRelativePath: toForwardSlash(path.relative(PROJECT_ROOT, minPath)),
    hash: contentHash(minified)
  };
}

function updateHTMLReferences(processedFiles) {
  let html = fs.readFileSync(HTML_FILE, "utf8");
  let missing = [];

  processedFiles.forEach(({ minRelativePath, hash }) => {
    if (!html.includes(minRelativePath)) {
      missing.push(minRelativePath);
      return;
    }
    const escaped = minRelativePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped + "(\\?v=[^\"']*)?", "g");
    html = html.replace(pattern, `${minRelativePath}?v=${hash}`);
  });

  if (missing.length) {
    throw new Error(`index.html does not reference: ${missing.join(", ")}`);
  }

  fs.writeFileSync(HTML_FILE, html, "utf8");
  console.log("Updated index.html asset versions.");
}

async function main() {
  const args = process.argv.slice(2).filter(arg => arg !== "--all");
  const files = args.length ? args : ALL_SOURCES;

  console.log(`Processing ${files.length} source files...`);
  const processed = [];
  for (const file of files) {
    processed.push(await processFile(file));
  }
  updateHTMLReferences(processed);
  console.log("Done!");
}

main().catch(err => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
