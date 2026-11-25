// MFTI 计算引擎（确定性、纯前端、可单测）
//
// 分类只用四个核心轴：
//   IM 想象浓度  -> 第 1 位 P(想象) / R(务实)
//   SO 社交电量  -> 第 2 位 S(社交) / H(独处)
//   AN 分析倾向  -> 第 3 位 A(分析) / W(直觉)
//   PL 计划节奏  -> 第 4 位 E(计划) / I(即兴)
//
// 其余六个维度只用于结果页画像，不参与分型。

const MFTIEngine = (() => {

  const SCHEMA_VERSION = 2;
  const SCORING_VERSION = "2.0.0";

  const CORE_AXES = [
    { key: "IM", high: "P", low: "R" },
    { key: "SO", high: "S", low: "H" },
    { key: "AN", high: "A", low: "W" },
    { key: "PL", high: "E", low: "I" }
  ];

  const AUX_KEYS = ["AE", "CU", "EX", "RT", "HU", "MO"];
  const DIM_KEYS = [...CORE_AXES.map(a => a.key), ...AUX_KEYS];

  // 全 B 等均衡答案的判定阈值（核心轴与 50 的最大差值）
  const BALANCED_THRESHOLD = 8;
  // 与第二接近角色差距小于该值时，提示「两边都像」
  const BOUNDARY_THRESHOLD = 12;

  function emptyScores() {
    const scores = {};
    DIM_KEYS.forEach(k => { scores[k] = 0; });
    return scores;
  }

  function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  // 累加答案分数，并同时计算「已作答题目」的可达范围。
  // 未作答 / 不适用 / 未知题目不会贡献负分，也不会把范围算进去。
  function calcScores(answers, questions) {
    const raw = emptyScores();
    const min = emptyScores();
    const max = emptyScores();
    const list = Array.isArray(answers) ? answers : [];
    let answered = 0;

    list.forEach((answer, index) => {
      const question = questions[index];
      if (!question || !Array.isArray(question.options) || !answer) return;
      if (!answer.score || typeof answer.score !== "object") return;
      answered += 1;

      DIM_KEYS.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(answer.score, key)) {
          raw[key] += toNumber(answer.score[key]);
        }

        let low = Infinity;
        let high = -Infinity;
        question.options.forEach(option => {
          const value = option && option.score ? toNumber(option.score[key]) : 0;
          if (value < low) low = value;
          if (value > high) high = value;
        });
        if (Number.isFinite(low)) min[key] += low;
        if (Number.isFinite(high)) max[key] += high;
      });
    });

    return { raw, min, max, answered };
  }

  // 按实际可达范围归一化到 0-100。
  // 中间选项在所有核心轴上计 0 分，因此以 0 为中性基线：
  // 正向得分映射到 50-100，负向得分映射到 0-50，避免不对称选项把「中间」推偏。
  function normalizeScores(raw, min, max) {
    const normalized = {};
    DIM_KEYS.forEach(key => {
      const low = toNumber(min[key]);
      const high = toNumber(max[key]);
      const value = toNumber(raw[key]);
      const positiveRange = Math.max(0, high);
      const negativeRange = Math.min(0, low);

      if (value >= 0) {
        normalized[key] = positiveRange > 0
          ? Math.round(50 + (Math.min(value, positiveRange) / positiveRange) * 50)
          : 50;
      } else {
        normalized[key] = negativeRange < 0
          ? Math.round(50 - (Math.min(Math.abs(value), Math.abs(negativeRange)) / Math.abs(negativeRange)) * 50)
          : 50;
      }
      normalized[key] = Math.max(0, Math.min(100, normalized[key]));
    });
    return normalized;
  }

  // 只根据核心轴生成四字母代码
  function getTypeCode(normalized) {
    return CORE_AXES
      .map(axis => (toNumber(normalized[axis.key]) >= 50 ? axis.high : axis.low))
      .join("");
  }

  // 角色模板距离：核心轴权重 1，辅助画像权重 0.35
  function personalityDistance(normalized, personality) {
    const template = personality && personality.dimensions ? personality.dimensions : {};
    let distance = 0;
    CORE_AXES.forEach(axis => {
      distance += Math.abs(toNumber(normalized[axis.key]) - toNumber(template[axis.key]));
    });
    AUX_KEYS.forEach(key => {
      distance += Math.abs(toNumber(normalized[key]) - toNumber(template[key])) * 0.35;
    });
    return distance;
  }

  function rankPersonalities(normalized, personalities) {
    return Object.entries(personalities || {})
      .map(([typeCode, personality]) => ({
        typeCode,
        personality,
        distance: personalityDistance(normalized, personality)
      }))
      .sort((a, b) => {
        if (a.distance !== b.distance) return a.distance - b.distance;
        return a.typeCode.localeCompare(b.typeCode);
      });
  }

  function isBalanced(normalized) {
    return CORE_AXES.every(axis => Math.abs(toNumber(normalized[axis.key]) - 50) <= BALANCED_THRESHOLD);
  }

  // 主入口
  // answers: 与 QUESTIONS 同序的选项对象数组（可为 null）
  // options: { questions, personalities, questionSetVersion }
  function calculate(answers, options = {}) {
    const questions = options.questions || (typeof QUESTIONS !== "undefined" ? QUESTIONS : []);
    const personalities = options.personalities || (typeof PERSONALITIES !== "undefined" ? PERSONALITIES : {});
    const questionSetVersion = options.questionSetVersion
      || (typeof QUESTION_SET_VERSION !== "undefined" ? QUESTION_SET_VERSION : "unknown");

    const { raw, min, max, answered } = calcScores(answers, questions);
    const normalized = normalizeScores(raw, min, max);
    const balanced = isBalanced(normalized);
    const ranked = rankPersonalities(normalized, personalities);

    const letters = getTypeCode(normalized);
    let chosen = balanced ? ranked[0] : null;

    if (!chosen) {
      const exact = personalities[letters];
      if (exact) {
        chosen = { typeCode: letters, personality: exact, distance: personalityDistance(normalized, exact) };
      } else {
        chosen = ranked[0] || null;
      }
    }

    const others = ranked.filter(item => !chosen || item.typeCode !== chosen.typeCode);
    const topMatches = others.slice(0, 3).map(item => ({
      typeCode: item.typeCode,
      distance: Math.round(item.distance)
    }));

    const isBoundary = Boolean(
      chosen && others.length && Math.abs(others[0].distance - chosen.distance) <= BOUNDARY_THRESHOLD
    );

    return {
      schemaVersion: SCHEMA_VERSION,
      scoringVersion: SCORING_VERSION,
      questionSetVersion,
      typeCode: chosen ? chosen.typeCode : letters,
      personality: chosen ? chosen.personality : null,
      normalized,
      raw,
      ranges: { min, max },
      answeredCount: answered,
      totalQuestions: Array.isArray(questions) ? questions.length : 0,
      isBalanced: balanced,
      isBoundary,
      topMatches
    };
  }

  function getDimLabel(dim, score) {
    const definition = DIMENSIONS[dim];
    if (!definition) return "";
    if (score > 65) return definition.high;
    if (score < 35) return definition.low;
    return "均衡型";
  }

  return {
    SCHEMA_VERSION,
    SCORING_VERSION,
    CORE_AXES,
    AUX_KEYS,
    DIM_KEYS,
    calculate,
    getDimLabel,
    getTypeCode,
    normalizeScores,
    calcScores,
    rankPersonalities,
    personalityDistance,
    isBalanced
  };
})();

if (typeof module !== "undefined") {
  module.exports = { MFTIEngine };
}
