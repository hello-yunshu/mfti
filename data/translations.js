// MFTI 多语言文案
// 题目、选项、角色描述分别在 questions.js / personalities.js 内部提供中英双语。

const TRANSLATIONS = {
  zh: {
    pageTitle: "MFTI — 轻松人格测试",
    metaDescription: "MFTI 是一个轻松的人格小测：39 道题，从审美偏好、社交能量、思考方式和行动节奏四个核心轴，匹配 16 种虚构角色。纯属娱乐，不构成心理或医学诊断。",
    subtitle: "Mildly Fun Type Indicator",
    description: "一份认真不到哪里去的人格小测。<br>39 道题，四个核心轴，十个画像维度。<br>匹配 16 种虚构角色，图一乐就好。",
    statLabels: ["虚构角色", "道测试题", "个维度", "分钟完成"],
    startBtn: "开始测试 →",
    showResultBtn: "查看上次结果",
    disclaimerNote: "点击前需阅读并同意免责声明 · 答案与结果默认只保存在当前页面",
    disclaimerTitle: "在进入测试前，请先看完这段话",
    disclaimerText: [
      "🎭 <strong>这是一个虚构角色人格小测，纯属娱乐，不构成心理、医学或任何专业诊断。</strong>",
      "🧩 结果描述的是你在<strong>审美偏好、社交能量、思考方式和行动节奏</strong>上的倾向，不是对你这个人的定义，也不代表能力高低。",
      "🌈 测试不会根据性别、性向、身体状态或关系状态推断你是谁。所有角色都是平等的虚构设定，没有「正常」与「不正常」之分。",
      "🔒 你的答案和结果默认只保存在当前浏览器会话里，不会自动上传。只有你主动点击「保存到本机」时，才会写入本地存储；随时可以删除。",
      "🎯 如果你最近情绪不太好，做测试可能并不能帮上忙。和信任的人聊聊，或联系专业支持，会比再做一遍测试更有用。",
      "💫 <strong>总之：轻松做，别当真，笑一笑，往前走。</strong>"
    ],
    disagreeBtn: "不同意，返回",
    agreeBtn: "我已阅读，同意进入",

    remaining: "还剩",
    questionsLeft: "题未答",
    prevBtn: "← 上一题",
    nextBtn: "下一题 →",
    submitBtn: "查看结果 ✨",
    backHomeAria: "返回首页",
    progressAria: "答题进度",

    portraitTitle: "🔍 角色画像",
    dimensionsTitle: "📊 你的十维画像",
    dimensionsHint: "前 4 条是核心轴，决定你的角色；后 6 条只用于丰富画像，不参与分型。",
    similarTitle: "🔮 你可能也会喜欢的角色",
    shareBtn: "📤 分享结果",
    copyBtn: "📋 复制结果",
    saveBtn: "💾 保存到本机",
    savedBtn: "✅ 已保存到本机",
    retakeBtn: "🔄 再测一次",
    allPersonalitiesBtn: "👥 查看所有角色",
    deleteResultBtn: "🗑 删除本机结果",
    footerNote: "MFTI · 轻松人格测试 · 虚构角色，仅供娱乐<br>结果不构成心理或医学诊断，也不适用于招聘、教育或医疗决策",

    balancedNote: "你的答案在四个核心轴上比较均衡，所以下面显示的是与你最接近的轻松角色，而不是一个「极鲜明」的固定画像。",
    boundaryNote: "你的答案在两种风格之间摇摆，另一个角色也很接近你。",

    shareTitle: "MFTI 测试结果",
    shareText: "{emoji} 我在 MFTI 测出了「{name}」（{code}）—— {subtitle}\n一个轻松的人格小测，图一乐就好。\nhttps://mfti.hey.run/",
    copiedToast: "结果已复制到剪贴板 📋",
    copyFailedToast: "复制失败，请手动选择文本",
    shareUnavailable: "当前浏览器不支持系统分享，可以点击「复制结果」",
    shareFailed: "分享没有完成，可以点击「复制结果」手动分享",
    unansweredToast: "还有 {count} 道题没有作答哦 👀",
    savedToast: "已保存到本机，下次可以继续查看",
    saveFailedToast: "无法保存，浏览器存储不可用",
    deletedToast: "已删除本机保存的结果",
    deleteFailedToast: "删除失败，浏览器存储不可用",
    legacySavedToast: "检测到旧版结果，新版算法已不适用，请删除后重新测试",
    brokenSavedToast: "本机保存的结果已损坏，可以删除后重新测试",

    allPersonalitiesTitle: "👥 所有 16 种 MFTI 虚构角色",
    allPersonalitiesSubtitle: "同一套审美、社交、思考与行动节奏，长出 16 种不同的样子",
    backBtn: "← 返回首页",
    footerAuthor: "作者：",

    dimensions: {
      IM: { name: "想象浓度", low: "务实派", high: "浪漫派", balanced: "均衡型" },
      SO: { name: "社交电量", low: "独处充电", high: "社交充电", balanced: "均衡型" },
      AN: { name: "分析倾向", low: "直觉随感", high: "分析求证", balanced: "均衡型" },
      PL: { name: "计划节奏", low: "即兴派", high: "计划派", balanced: "均衡型" },
      AE: { name: "审美投入", low: "轻装上阵", high: "认真经营", balanced: "均衡型" },
      CU: { name: "好奇探索", low: "聚焦当下", high: "四处探索", balanced: "均衡型" },
      EX: { name: "表达欲", low: "安静观众", high: "主动表达", balanced: "均衡型" },
      RT: { name: "仪式感", low: "随性", high: "讲究仪式", balanced: "均衡型" },
      HU: { name: "幽默值", low: "认真脸", high: "玩梗王", balanced: "均衡型" },
      MO: { name: "情绪浓度", low: "平稳", high: "感受丰富", balanced: "均衡型" }
    }
  },

  en: {
    pageTitle: "MFTI — A Lighthearted Personality Quiz",
    metaDescription: "MFTI is a lighthearted personality quiz: 39 questions across aesthetic taste, social energy, thinking style, and pacing, matched to 16 fictional characters. For fun only—not a psychological or medical assessment.",
    subtitle: "Mildly Fun Type Indicator",
    description: "A personality quiz that doesn't take itself too seriously.<br>39 questions, four core axes, ten portrait dimensions.<br>Matched to 16 fictional characters—just for fun.",
    statLabels: ["Characters", "Questions", "Dimensions", "Minutes"],
    startBtn: "Start →",
    showResultBtn: "View last result",
    disclaimerNote: "Please read and agree to the disclaimer first · Answers and results stay in this page by default",
    disclaimerTitle: "Before you start, please read this",
    disclaimerText: [
      "🎭 <strong>This is a fictional-character personality quiz for entertainment only. It is not a psychological, medical, or professional assessment.</strong>",
      "🧩 Results describe tendencies in <strong>aesthetic taste, social energy, thinking style, and pacing</strong>—not a definition of who you are, and not a measure of ability.",
      "🌈 The quiz does not infer who you are from gender, sexuality, body, or relationship status. All characters are equal fictional setups; there is no 'normal' versus 'abnormal'.",
      "🔒 Your answers and results stay in this browser session by default and are never uploaded automatically. Only when you click 'Save on this device' will they be written to local storage—and you can delete them anytime.",
      "🎯 If you've been feeling low lately, a quiz probably won't help. Talking to someone you trust, or reaching out for professional support, is more useful than taking it again.",
      "💫 <strong>In short: keep it light, don't take it seriously, smile, and move on.</strong>"
    ],
    disagreeBtn: "Disagree, go back",
    agreeBtn: "I've read it, let's go",

    remaining: "Remaining:",
    questionsLeft: "unanswered",
    prevBtn: "← Previous",
    nextBtn: "Next →",
    submitBtn: "See result ✨",
    backHomeAria: "Back to home",
    progressAria: "Quiz progress",

    portraitTitle: "🔍 Character Portrait",
    dimensionsTitle: "📊 Your ten dimensions",
    dimensionsHint: "The first four are core axes that determine your character; the last six enrich the portrait only.",
    similarTitle: "🔮 Characters you might also like",
    shareBtn: "📤 Share result",
    copyBtn: "📋 Copy result",
    saveBtn: "💾 Save on this device",
    savedBtn: "✅ Saved on this device",
    retakeBtn: "🔄 Take it again",
    allPersonalitiesBtn: "👥 View all characters",
    deleteResultBtn: "🗑 Delete local result",
    footerNote: "MFTI · A lighthearted personality quiz · Fictional characters, for fun<br>Not a psychological or medical assessment, and not for hiring, education, or medical decisions",

    balancedNote: "Your answers are fairly balanced across the four core axes, so this is the character closest to you—not a sharply defined fixed portrait.",
    boundaryNote: "Your answers sit between two styles; another character is also very close to you.",

    shareTitle: "MFTI Result",
    shareText: "{emoji} I got \"{name}\" ({code}) on MFTI — {subtitle}\nA lighthearted personality quiz. Just for fun.\nhttps://mfti.hey.run/",
    copiedToast: "Result copied to clipboard 📋",
    copyFailedToast: "Copy failed—please select the text manually",
    shareUnavailable: "This browser doesn't support system sharing—try 'Copy result'",
    shareFailed: "Sharing didn't finish—you can use 'Copy result' instead",
    unansweredToast: "{count} question(s) still unanswered 👀",
    savedToast: "Saved on this device—you can view it next time",
    saveFailedToast: "Couldn't save—browser storage is unavailable",
    deletedToast: "Local result deleted",
    deleteFailedToast: "Delete failed—browser storage is unavailable",
    legacySavedToast: "An older result was found. The new scoring doesn't apply to it—please delete it and retake the quiz.",
    brokenSavedToast: "The saved result is damaged. Delete it and take the quiz again.",

    allPersonalitiesTitle: "👥 All 16 MFTI characters",
    allPersonalitiesSubtitle: "One set of aesthetic, social, thinking, and pacing axes—sixteen different shapes",
    backBtn: "← Back to home",
    footerAuthor: "By ",

    dimensions: {
      IM: { name: "Imagination", low: "Grounded", high: "Romantic", balanced: "Balanced" },
      SO: { name: "Social Battery", low: "Charged Alone", high: "Charged by People", balanced: "Balanced" },
      AN: { name: "Analysis Bias", low: "Intuitive", high: "Analytical", balanced: "Balanced" },
      PL: { name: "Planning Rhythm", low: "Improviser", high: "Planner", balanced: "Balanced" },
      AE: { name: "Aesthetic Investment", low: "Low-Key", high: "Curated", balanced: "Balanced" },
      CU: { name: "Curiosity", low: "Focused", high: "Explorer", balanced: "Balanced" },
      EX: { name: "Expressiveness", low: "Quiet Audience", high: "Expressive", balanced: "Balanced" },
      RT: { name: "Ritual Sense", low: "Casual", high: "Ritualistic", balanced: "Balanced" },
      HU: { name: "Playfulness", low: "Straight Face", high: "Meme Lord", balanced: "Balanced" },
      MO: { name: "Emotional Intensity", low: "Steady", high: "Deeply Felt", balanced: "Balanced" }
    }
  }
};

if (typeof module !== "undefined") {
  module.exports = { TRANSLATIONS };
}
