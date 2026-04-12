// MFTI 计算引擎

const MFTIEngine = (() => {

  // 初始化分数容器
  function initScores() {
    return { PR: 0, SH: 0, AI: 0, EW: 0, CF: 0, DK: 0, TN: 0, MB: 0, GL: 0, XZ: 0 };
  }

  // 累加用户答案分数
  function calcRawScores(answers) {
    const scores = initScores();
    answers.forEach(answer => {
      if (!answer || !answer.score) return;
      Object.entries(answer.score).forEach(([dim, val]) => {
        if (scores[dim] !== undefined) scores[dim] += val;
      });
    });
    return scores;
  }

  // 归一化到 0-100
  function normalizeScores(rawScores) {
    const normalized = {};
    const MAX_RANGE = 12; // 保守估计，比实际大一点
    Object.entries(rawScores).forEach(([dim, val]) => {
      // 映射到 0-100，50为中性
      normalized[dim] = Math.max(0, Math.min(100, Math.round(50 + (val / MAX_RANGE) * 50)));
    });
    return normalized;
  }

  // 根据分数得出4字母类型
  function getTypeCode(normalized) {
    const p = normalized.PR > 50 ? 'P' : 'R';
    const s = normalized.SH > 50 ? 'S' : 'H';
    const a = normalized.AI > 50 ? 'A' : 'I';
    const e = normalized.EW > 50 ? 'E' : 'W';
    return `${p}${s}${a}${e}`;
  }

  // 相似度得分
  function getSimilarityScore(userNorm, personality) {
    const pDims = personality.dimensions;
    let totalDiff = 0;
    let count = 0;
    const coreKeys = ['PR', 'SH', 'AI', 'EW'];
    coreKeys.forEach(k => {
      if (userNorm[k] !== undefined && pDims[k] !== undefined) {
        totalDiff += Math.abs(userNorm[k] - pDims[k]);
        count++;
      }
    });
    return count > 0 ? Math.round(100 - (totalDiff / count)) : 0;
  }

  // 计算结果
  function calculate(answers) {
    const raw = calcRawScores(answers);
    const normalized = normalizeScores(raw);
    const typeCode = getTypeCode(normalized);
    
    // 找出匹配人格
    const personality = PERSONALITIES[typeCode];
    
    // 计算与所有类型的接近度（用于展示）
    const similarities = {};
    Object.entries(PERSONALITIES).forEach(([typeCode, p]) => {
      similarities[typeCode] = getSimilarityScore(normalized, p);
    });
    
    // 排序找出最接近的几个（包括当前人格）
    const sorted = Object.entries(similarities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return {
      typeCode,
      personality: personality || PERSONALITIES['RHWI'], // fallback
      normalized,
      raw,
      similarities,
      topMatches: sorted
    };
  }

  // 维度标签
  function getDimLabel(dim, score) {
    const d = DIMENSIONS[dim];
    if (!d) return '';
    if (score > 65) return d.high;
    if (score < 35) return d.low;
    return '均衡型';
  }

  return { calculate, getDimLabel, normalizeScores, getTypeCode };
})();
