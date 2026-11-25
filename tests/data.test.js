const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { QUESTIONS, QUESTION_SET_VERSION } = require("../data/questions.js");
const { PERSONALITIES, DIMENSIONS } = require("../data/personalities.js");
const { TRANSLATIONS } = require("../data/translations.js");
const { AVATARS } = require("../data/avatars.js");

const ROOT = path.join(__dirname, "..");
const CORE_KEYS = ["IM", "SO", "AN", "PL"];
const AUX_KEYS = ["AE", "CU", "EX", "RT", "HU", "MO"];
const ALL_KEYS = [...CORE_KEYS, ...AUX_KEYS];
const CHAPTERS = ["daily", "taste", "social", "future"];

function allScores(question) {
  return question.options.flatMap(option => Object.entries(option.score || {}));
}

test("题库共有 39 道题，章节分布为 9/10/10/10", () => {
  assert.equal(QUESTIONS.length, 39);
  const counts = {};
  CHAPTERS.forEach(chapter => {
    counts[chapter] = QUESTIONS.filter(q => q.chapter === chapter).length;
  });
  assert.deepEqual(counts, { daily: 9, taste: 10, social: 10, future: 10 });
});

test("题目 ID 连续且唯一", () => {
  const ids = QUESTIONS.map(q => q.id);
  assert.deepEqual(ids, Array.from({ length: 39 }, (_, i) => i + 1));
  assert.equal(new Set(ids).size, 39);
});

test("每道题都有三个选项、唯一标签和中英双语", () => {
  QUESTIONS.forEach(question => {
    assert.equal(question.options.length, 3, `Q${question.id} 选项数量`);
    assert.deepEqual(question.options.map(o => o.label), ["A", "B", "C"]);
    assert.ok(question.text.trim().length > 0, `Q${question.id} 中文题干`);
    assert.ok(question.textEn.trim().length > 0, `Q${question.id} 英文题干`);
    question.options.forEach(option => {
      assert.ok(option.text.trim().length > 0, `Q${question.id}${option.label} 中文选项`);
      assert.ok(option.textEn.trim().length > 0, `Q${question.id}${option.label} 英文选项`);
    });
  });
});

test("计分键只使用允许的十个维度，且数值有限", () => {
  QUESTIONS.forEach(question => {
    allScores(question).forEach(([key, value]) => {
      assert.ok(ALL_KEYS.includes(key), `Q${question.id} 出现未知计分键 ${key}`);
      assert.ok(Number.isFinite(value), `Q${question.id} 的 ${key} 不是有限数字`);
    });
  });
});

test("四个核心轴都得到足够题目的支持", () => {
  CORE_KEYS.forEach(key => {
    const measured = QUESTIONS.filter(question =>
      question.options.some(option => Object.prototype.hasOwnProperty.call(option.score || {}, key))
    );
    assert.ok(measured.length >= 6, `${key} 只被 ${measured.length} 道题测量`);
  });
});

test("第 39 题不参与任何计分", () => {
  const last = QUESTIONS[38];
  assert.equal(last.id, 39);
  last.options.forEach(option => {
    assert.deepEqual(option.score, {});
  });
});

test("16 种角色齐全，键名与四字母编码一一对应", () => {
  const codes = Object.keys(PERSONALITIES);
  assert.equal(codes.length, 16);

  const expected = [];
  ["P", "R"].forEach(a => ["S", "H"].forEach(b => ["A", "W"].forEach(c => ["E", "I"].forEach(d => {
    expected.push(a + b + c + d);
  }))));

  assert.deepEqual(codes.sort(), expected.sort());
  codes.forEach(code => {
    const p = PERSONALITIES[code];
    assert.ok(p.name && p.nameEn, `${code} 缺少中英文名`);
    assert.ok(p.description && p.descriptionEn, `${code} 缺少中英文描述`);
    assert.ok(p.subtitle && p.subtitleEn, `${code} 缺少中英文副标题`);
    assert.ok(Array.isArray(p.tags) && p.tags.length === 4, `${code} 标签数量`);
    assert.deepEqual(p.tags.length, p.tagsEn.length, `${code} 中英标签数量不一致`);
  });
});

test("每个角色的十维模板完整且取值在 0-100", () => {
  Object.entries(PERSONALITIES).forEach(([code, p]) => {
    ALL_KEYS.forEach(key => {
      assert.ok(Number.isFinite(p.dimensions[key]), `${code} 缺少维度 ${key}`);
      assert.ok(p.dimensions[key] >= 0 && p.dimensions[key] <= 100, `${code} 的 ${key} 越界`);
    });
    CORE_KEYS.forEach(key => {
      const letter = code[CORE_KEYS.indexOf(key)];
      const high = { IM: "P", SO: "S", AN: "A", PL: "E" }[key];
      const expected = letter === high ? "high" : "low";
      const value = p.dimensions[key];
      if (expected === "high") assert.ok(value > 50, `${code} 的 ${key} 应与高位字母一致`);
      else assert.ok(value < 50, `${code} 的 ${key} 应与低位字母一致`);
    });
  });
});

test("十个画像维度都有中英文说明", () => {
  assert.deepEqual(Object.keys(DIMENSIONS).sort(), ALL_KEYS.slice().sort());
  const zhDims = TRANSLATIONS.zh.dimensions;
  const enDims = TRANSLATIONS.en.dimensions;
  ALL_KEYS.forEach(key => {
    assert.ok(zhDims[key] && zhDims[key].name && zhDims[key].low && zhDims[key].high, `zh.${key}`);
    assert.ok(enDims[key] && enDims[key].name && enDims[key].low && enDims[key].high, `en.${key}`);
  });
});

test("头像映射覆盖全部 16 种角色且文件存在", () => {
  assert.deepEqual(Object.keys(AVATARS).sort(), Object.keys(PERSONALITIES).sort());
  Object.values(AVATARS).forEach(relative => {
    const full = path.join(ROOT, relative.replace(/^\.\//, ""));
    assert.ok(fs.existsSync(full), `头像不存在：${relative}`);
  });
});

test("中英文翻译结构一致", () => {
  function shape(value) {
    if (Array.isArray(value)) return value.map(shape);
    if (value && typeof value === "object") {
      return Object.keys(value).sort().map(key => [key, shape(value[key])]);
    }
    return typeof value;
  }
  assert.deepEqual(shape(TRANSLATIONS.zh), shape(TRANSLATIONS.en));
});

test("题库版本号存在且格式正确", () => {
  assert.match(QUESTION_SET_VERSION, /^\d{4}-\d{2}-v\d+$/);
});
