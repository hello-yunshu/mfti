const test = require("node:test");
const assert = require("node:assert/strict");

const { QUESTIONS, QUESTION_SET_VERSION } = require("../data/questions.js");
const { PERSONALITIES } = require("../data/personalities.js");
const { MFTIEngine } = require("../js/engine.js");

const CORE_KEYS = ["IM", "SO", "AN", "PL"];
const ALL_KEYS = [...CORE_KEYS, "AE", "CU", "EX", "RT", "HU", "MO"];

function calculate(answers) {
  return MFTIEngine.calculate(answers, {
    questions: QUESTIONS,
    personalities: PERSONALITIES,
    questionSetVersion: QUESTION_SET_VERSION
  });
}

function allB() {
  return QUESTIONS.map(question => question.options[1]);
}

// 按目标编码，为每道题选择最能把四个核心轴推向目标方向的选项
function answersForCode(code) {
  const targets = {
    IM: code[0] === "P" ? 1 : -1,
    SO: code[1] === "S" ? 1 : -1,
    AN: code[2] === "A" ? 1 : -1,
    PL: code[3] === "E" ? 1 : -1
  };

  return QUESTIONS.map(question => {
    let best = question.options[1];
    let bestScore = -Infinity;
    question.options.forEach(option => {
      let score = 0;
      CORE_KEYS.forEach(key => { score += (option.score[key] || 0) * targets[key]; });
      if (score > bestScore) {
        bestScore = score;
        best = option;
      }
    });
    return best;
  });
}

test("全选 B 得到均衡结果，而不是极鲜明画像", () => {
  const result = calculate(allB());
  assert.equal(result.isBalanced, true);
  assert.ok(result.personality);
  CORE_KEYS.forEach(key => {
    assert.equal(result.normalized[key], 50, `${key} 应为中性 50`);
  });
  assert.match(result.typeCode, /^[PR][SH][AW][EI]$/);
});

test("16 种角色都可以通过作答到达", () => {
  Object.keys(PERSONALITIES).forEach(code => {
    const result = calculate(answersForCode(code));
    assert.equal(result.typeCode, code, `目标 ${code}，实际 ${result.typeCode}`);
    assert.equal(result.personality.name, PERSONALITIES[code].name);
    assert.equal(result.isBalanced, false);
  });
});

test("单独修改第 39 题不影响分型或核心分数", () => {
  const answers = allB();
  const base = calculate(answers);
  const last = QUESTIONS[38];

  last.options.forEach((option, index) => {
    if (index === 1) return;
    const changed = answers.slice();
    changed[38] = option;
    const next = calculate(changed);
    assert.equal(next.typeCode, base.typeCode);
    CORE_KEYS.forEach(key => {
      assert.equal(next.normalized[key], base.normalized[key], `${key} 不应变化`);
    });
  });
});

test("跳过题目不会产生 NaN、越界或负分惩罚", () => {
  const answers = allB();
  answers[4] = null;
  answers[17] = null;
  const result = calculate(answers);
  ALL_KEYS.forEach(key => {
    assert.ok(Number.isFinite(result.normalized[key]), `${key} 不是有限数字`);
    assert.ok(result.normalized[key] >= 0 && result.normalized[key] <= 100, `${key} 越界`);
  });
  assert.ok(result.answeredCount < QUESTIONS.length);
});

test("空答案和异常输入不会抛错", () => {
  [undefined, null, [], [null, null], "bad", 42].forEach(input => {
    const result = calculate(input);
    assert.ok(result.personality, `输入 ${String(input)} 时应有回退角色`);
    ALL_KEYS.forEach(key => {
      assert.equal(result.normalized[key], 50);
    });
    assert.equal(result.isBalanced, true);
  });
});

test("未知计分键与非法值不会污染结果", () => {
  const answers = allB();
  answers[0] = { label: "X", score: { IM: "oops", NOPE: 100, SO: Infinity } };
  const result = calculate(answers);
  ALL_KEYS.forEach(key => {
    assert.ok(Number.isFinite(result.normalized[key]));
    assert.ok(result.normalized[key] >= 0 && result.normalized[key] <= 100);
  });
});

test("计分是确定性的", () => {
  const answers = answersForCode("PSAE");
  const a = calculate(answers);
  const b = calculate(answers);
  assert.deepEqual(a.normalized, b.normalized);
  assert.equal(a.typeCode, b.typeCode);
  assert.deepEqual(a.topMatches, b.topMatches);
});

test("相近角色最多三个，且不包含当前角色，也不提供伪精确百分比", () => {
  Object.keys(PERSONALITIES).forEach(code => {
    const result = calculate(answersForCode(code));
    assert.ok(result.topMatches.length <= 3);
    assert.ok(result.topMatches.every(item => item.typeCode !== code));
    assert.ok(result.topMatches.every(item => !Object.prototype.hasOwnProperty.call(item, "percent")));
    const distances = result.topMatches.map(item => item.distance);
    assert.deepEqual(distances, distances.slice().sort((x, y) => x - y));
  });
});

test("分型只由四个核心轴决定", () => {
  const result = calculate(answersForCode("RHAE"));
  const shuffled = { ...result.normalized, AE: 0, CU: 100, EX: 0, RT: 100, HU: 0, MO: 100 };
  assert.equal(MFTIEngine.getTypeCode(shuffled), result.typeCode);
});

test("归一化会按可达范围缩放并处理零范围", () => {
  const normalized = MFTIEngine.normalizeScores(
    { IM: 0, SO: 0, AN: 0, PL: 0, AE: 0, CU: 0, EX: 0, RT: 0, HU: 0, MO: 0 },
    { IM: -10, SO: 0, AN: 0, PL: 0, AE: 0, CU: 0, EX: 0, RT: 0, HU: 0, MO: 0 },
    { IM: 10, SO: 0, AN: 0, PL: 0, AE: 0, CU: 0, EX: 0, RT: 0, HU: 0, MO: 0 }
  );
  assert.equal(normalized.IM, 50);
  assert.equal(normalized.SO, 50);
});

test("版本信息被写入结果，便于识别旧版存档", () => {
  const result = calculate(allB());
  assert.equal(result.schemaVersion, 2);
  assert.equal(result.scoringVersion, MFTIEngine.SCORING_VERSION);
  assert.equal(result.questionSetVersion, QUESTION_SET_VERSION);
});
