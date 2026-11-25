const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = path.join(__dirname, "..");
const read = relative => fs.readFileSync(path.join(ROOT, relative), "utf8");

const html = read("index.html");
const app = read("js/app.js");
const engine = read("js/engine.js");
const questions = read("data/questions.js");
const personalities = read("data/personalities.js");
const translations = read("data/translations.js");
const readme = read("README.md");

test("页面允许缩放，不锁定 maximum-scale 或 user-scalable", () => {
  assert.ok(!/maximum-scale/i.test(html));
  assert.ok(!/user-scalable\s*=\s*no/i.test(html));
  assert.match(html, /name="viewport"[^>]*width=device-width/);
});

test("结果页操作与关键节点齐全", () => {
  const ids = [
    "page-landing", "page-quiz", "page-result", "page-all-personalities",
    "modal-disclaimer", "progress-wrap", "options-list", "q-counter", "q-remain",
    "result-code", "result-note", "result-desc", "dimensions-list", "similar-list",
    "btn-share", "btn-copy", "btn-save", "btn-retake", "btn-delete-result",
    "btn-all-personalities", "btn-show-result"
  ];
  ids.forEach(id => {
    assert.ok(html.includes(`id="${id}"`), `缺少 #${id}`);
  });
});

test("已移除无意义的计算动画与身份预设文案", () => {
  assert.ok(!html.includes("page-calculating"));
  assert.ok(!html.includes("正在分析"));
  assert.ok(!html.includes("AI正在"));
  [html, readme, questions, personalities].forEach(source => {
    assert.ok(!source.includes("男娘"), "仍出现「男娘」");
    assert.ok(!source.includes("MTF"), "仍出现 MTF");
  });
  assert.ok(!/科学性/.test(readme));
});

test("免责声明是无障碍对话框，并说明非诊断与本地存储", () => {
  assert.match(html, /id="modal-disclaimer"[^>]*role="dialog"[^>]*aria-modal="true"/);
  assert.match(html, /aria-labelledby="modal-title"/);
  assert.ok(html.includes("不构成心理、医学或任何专业诊断"));
  assert.ok(html.includes("不会自动上传"));
  assert.ok(html.includes("随时可以删除"));
});

test("题库与角色文本不根据性别、性向或身体推断", () => {
  const sources = [questions, personalities];
  const forbidden = ["女孩子", "女孩", "少女", "萝莉", "仙子", "男生", "性别", "性向", "跨性别", "出柜", "身体状态"];
  sources.forEach(source => {
    forbidden.forEach(word => {
      assert.ok(!source.includes(word), `题库/角色文本出现身份推断词：${word}`);
    });
  });
});

test("选项具备 radiogroup / radio 语义，进度条可被读屏识别", () => {
  assert.match(html, /id="options-list"[^>]*role="radiogroup"/);
  assert.match(html, /id="progress-wrap"[^>]*role="progressbar"/);
  assert.match(app, /setAttribute\("role", "radio"\)/);
  assert.match(app, /aria-checked/);
});

test("自动跳题计时器会在切题、切换语言和重新测试时清理", () => {
  assert.match(app, /clearAdvanceTimer\(\)/);
  assert.match(app, /if \(currentQ === qIndex && answers\[qIndex\]\)/);
  assert.match(app, /function nextQuestion[\s\S]*?clearAdvanceTimer\(\)/);
  assert.match(app, /function toggleLanguage[\s\S]*?clearAdvanceTimer\(\)/);
  assert.match(app, /function retake[\s\S]*?clearAdvanceTimer\(\)/);
});

test("分享取消时不复制、不报错，只有显式点击才复制", () => {
  assert.match(app, /error\.name === "AbortError"/);
  assert.match(app, /function copyResult\(\)/);
  assert.match(html, /id="btn-copy"/);
});

test("提交结果不会自动写入 localStorage", () => {
  const match = app.match(/function submitQuiz\(\) \{[\s\S]*?\n  \}/);
  assert.ok(match, "找不到 submitQuiz");
  assert.ok(!match[0].includes("saveResult("));
  assert.ok(!match[0].includes("safeSetStorage("));
});

test("显式保存只写入最小结果，不保存答案原文", () => {
  const match = app.match(/function buildSavedPayload\(res\) \{[\s\S]*?\n  \}/);
  assert.ok(match, "找不到 buildSavedPayload");
  const body = match[0];
  assert.ok(body.includes("schemaVersion"));
  assert.ok(body.includes("scoringVersion"));
  assert.ok(body.includes("questionSetVersion"));
  assert.ok(body.includes("typeCode"));
  assert.ok(body.includes("normalized"));
  assert.ok(!body.includes("answers"));
});

test("旧版存档不会被当作新版结果展示", () => {
  assert.match(app, /parsed\.schemaVersion !== CURRENT_SCHEMA/);
  assert.match(app, /legacySavedToast/);
});

test("结果页不显示伪精确百分比", () => {
  assert.ok(!/similar.*%/.test(app));
  assert.ok(!app.includes("percent"));
});

test("尊重 prefers-reduced-motion", () => {
  assert.ok(app.includes("prefers-reduced-motion: reduce"));
  assert.ok(read("css/quiz.css").includes("prefers-reduced-motion: reduce"));
});

test("app.js 使用的每个静态翻译键都存在", () => {
  const keys = new Set();
  const regex = /\bt\("([^"]+)"\)/g;
  let match;
  while ((match = regex.exec(app))) {
    keys.add(match[1]);
  }
  assert.ok(keys.size > 20);

  function lookup(lang, key) {
    return key.split(".").reduce((value, part) => (value && value[part] !== undefined ? value[part] : undefined), translationsObject(lang));
  }
  function translationsObject(lang) {
    return lang === "zh" ? TRANSLATIONS.zh : TRANSLATIONS.en;
  }
  const { TRANSLATIONS } = require("../data/translations.js");

  keys.forEach(key => {
    assert.ok(lookup("zh", key) !== undefined, `缺少中文翻译：${key}`);
    assert.ok(lookup("en", key) !== undefined, `缺少英文翻译：${key}`);
  });
});

test("index.html 只引用本地压缩资源，且版本哈希与内容一致", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+\.min\.(?:js|css))\?v=([a-f0-9]+)"/g)];
  assert.ok(refs.length >= 9, `压缩资源引用数量异常：${refs.length}`);

  refs.forEach(([, relative, hash]) => {
    const file = path.join(ROOT, relative);
    assert.ok(fs.existsSync(file), `资源不存在：${relative}`);
    const actual = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 10);
    assert.equal(hash, actual, `${relative} 的版本哈希过期`);
  });

  assert.ok(!/(?:src|href)="https?:\/\/[^"]+\.(?:js|css)/.test(html), "不应引用外部 JS/CSS");
});

test("README 说明新模型、隐私、测试与许可证", () => {
  ["39", "16", "IM", "SO", "AN", "PL", "不会自动上传", "npm test", "GPL-3.0"].forEach(keyword => {
    assert.ok(readme.includes(keyword), `README 缺少：${keyword}`);
  });
  assert.ok(!readme.includes("出柜"));
});

test("CI 只读、锁定 Action SHA，并校验生成物一致性", () => {
  const workflowDir = path.join(ROOT, ".github/workflows");
  const files = fs.readdirSync(workflowDir).filter(file => /\.ya?ml$/.test(file));
  assert.ok(files.length >= 1);
  const sources = files.map(file => fs.readFileSync(path.join(workflowDir, file), "utf8"));

  sources.forEach(source => {
    assert.match(source, /permissions:\s*\n\s*contents:\s*read/);
    assert.ok(!source.includes("git push"), "CI 不应自动推送");
    assert.ok(!source.includes("github-actions[bot]"), "CI 不应以机器人身份提交");
    assert.ok(source.includes("npm ci"));
    assert.ok(source.includes("npm test"));
    assert.ok(source.includes("npm run build"));
    assert.ok(source.includes("git diff --exit-code"));
    const uses = [...source.matchAll(/uses:\s*([^\s#]+)/g)].map(m => m[1]);
    uses.forEach(action => {
      assert.match(action, /@[0-9a-f]{40}$/, `Action 未锁定完整 SHA：${action}`);
    });
  });
});

test("版本常量在应用与引擎之间一致", () => {
  assert.match(engine, /SCHEMA_VERSION = 2/);
  assert.match(app, /CURRENT_SCHEMA = 2/);
  assert.match(engine, /SCORING_VERSION = "2\.0\.0"/);
});
