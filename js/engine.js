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

  // 每个维度的实际分数范围（基于题目分析）
  // key: [min, max] — 用于更精确的归一化
  const DIM_RANGES = {
    PR: [-10, 14],  SH: [-9, 11],   AI: [-6, 7],   EW: [-11, 9],
    CF: [-6, 9],    DK: [-5, 5],    TN: [-7, 15],  MB: [-6, 6],
    GL: [-4, 10],   XZ: [-7, 7]
  };

  // 归一化到 0-100（使用每个维度的实际范围线性映射）
  function normalizeScores(rawScores) {
    const normalized = {};
    Object.entries(rawScores).forEach(([dim, val]) => {
      const [min, max] = DIM_RANGES[dim] || [-8, 8];
      const range = Math.max(max - min, 1);
      // 线性映射 min→0, max→100
      const norm = ((val - min) / range) * 100;
      normalized[dim] = Math.max(0, Math.min(100, Math.round(norm)));
    });
    return normalized;
  }

  // 根据分数得出4字母类型
  // 编码规则: P/R(PR) + S/H(SH) + A/W(AI) + E/I(EW)
  // A=颜值焦虑(AI>50) W=心态平和(AI<50) E=有出柜行为(EW>50) I=未出柜(EW<50)
  function getTypeCode(normalized) {
    const p = normalized.PR > 50 ? 'P' : 'R';
    const s = normalized.SH > 50 ? 'S' : 'H';
    const a = normalized.AI > 50 ? 'A' : 'W';
    const e = normalized.EW > 50 ? 'E' : 'I';
    return `${p}${s}${a}${e}`;
  }

  // 计算4字母编码差异
  function calcLetterDiff(code1, code2) {
    let diff = 0;
    for (let i = 0; i < 4; i++) {
      if (code1[i] !== code2[i]) diff++;
    }
    return diff;
  }

  // 相似度得分（4字母编码优先 + 维度距离微调）
  // 核心思路：4字母编码决定人格大类，相似度排序必须先尊重编码差异
  // 基础分按字母差异分层：差0→100, 差1→80, 差2→60, 差3→40, 差4→20
  // 核心维度(PR/SH/AI/EW)距离用于同层排序，辅助维度微调
  function getSimilarityScore(userCode, userNorm, targetCode, personality) {
    const pDims = personality.dimensions;
    const coreKeys = ['PR', 'SH', 'AI', 'EW'];
    const auxKeys = ['CF', 'DK', 'TN', 'MB', 'GL', 'XZ'];

    // 计算字母差异
    const letterDiff = calcLetterDiff(userCode, targetCode);

    // 基础分：按字母差异分层
    const baseScore = 100 - letterDiff * 20;

    // 核心维度微调（同层内排序，最多扣14分）
    let coreDiff = 0;
    coreKeys.forEach(k => {
      if (userNorm[k] !== undefined && pDims[k] !== undefined) {
        coreDiff += Math.abs(userNorm[k] - pDims[k]);
      }
    });
    const corePenalty = (coreDiff / 400) * 14;

    // 辅助维度微调（最多扣6分）
    let auxDiff = 0;
    let auxCount = 0;
    auxKeys.forEach(k => {
      if (userNorm[k] !== undefined && pDims[k] !== undefined) {
        auxDiff += Math.abs(userNorm[k] - pDims[k]);
        auxCount++;
      }
    });
    const auxAvg = auxCount > 0 ? auxDiff / auxCount : 0;
    const auxPenalty = (auxAvg / 100) * 6;

    return Math.round(Math.max(0, Math.min(100, baseScore - corePenalty - auxPenalty)));
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
    Object.entries(PERSONALITIES).forEach(([targetCode, p]) => {
      similarities[targetCode] = getSimilarityScore(typeCode, normalized, targetCode, p);
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
    if (score > 70) return d.high;
    if (score < 30) return d.low;
    return '均衡型';
  }

  return { calculate, getDimLabel, normalizeScores, getTypeCode };
})();
