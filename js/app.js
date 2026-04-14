'use strict';

// MFTI 主应用逻辑

const App = (() => {

  let currentQ = 0;
  let answers = [];
  let result = null;
  let currentLang;

  // 安全地获取 localStorage 值
  function safeGetStorage(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (e) {
      console.warn('Failed to get from localStorage:', e);
      return defaultValue;
    }
  }

  // 安全地设置 localStorage 值
  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('Failed to set to localStorage:', e);
      return false;
    }
  }

  // 初始化当前语言
  currentLang = safeGetStorage('mfti_lang', 'zh');

  // 获取多语言人格数据
  function getPersonalityText(p, field) {
    const enField = field + 'En';
    return currentLang === 'en' && p[enField] ? p[enField] : p[field];
  }

  // 获取多语言题目数据
  function getQuestionText(q, field) {
    const enField = field + 'En';
    return currentLang === 'en' && q[enField] ? q[enField] : q[field];
  }

  // 获取人格名称（按语言优先级）
  function getPersonalityNames(p) {
    return {
      primary: currentLang === 'en' ? p.nameEn : p.name,
      secondary: currentLang === 'en' ? p.name : p.nameEn
    };
  }

  // 辅助：更新单个元素文本
  function updateText(selectorOrEl, key) {
    const el = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl;
    const translated = t(key);
    if (el && translated) {
      el.textContent = translated;
    }
  }

  // 辅助：更新多个元素文本
  function updateTexts(selector, keys) {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      const translated = t(keys[i]);
      if (translated) el.textContent = translated;
    });
  }

  // 辅助：更新元素 HTML
  function updateHTML(selectorOrEl, key) {
    const el = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl;
    const translated = t(key);
    if (el && translated) {
      el.innerHTML = translated;
    }
  }

  // 辅助：更新多个段落
  function updateParagraphs(selector, key) {
    const el = document.querySelector(selector);
    const texts = t(key);
    if (el && texts && Array.isArray(texts)) {
      el.innerHTML = texts.map(p => `<p>${p}</p>`).join('');
    }
  }

  // 设置语言
  function setLanguage(lang) {
    currentLang = lang;
    safeSetStorage('mfti_lang', lang);
    
    // 更新语言切换按钮
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.textContent = lang === 'zh' ? '🌐 English' : '🌐 中文';
    }
    
    // 只有在 TRANSLATIONS 可用时才更新其他内容
    if (typeof TRANSLATIONS !== 'undefined') {
      updateAllTexts();
    }
  }

  // 切换语言
  function toggleLanguage() {
    setLanguage(currentLang === 'zh' ? 'en' : 'zh');
  }

  // 获取当前语言的翻译
  function t(key) {
    // 如果 TRANSLATIONS 还未加载，返回空字符串或默认值
    if (typeof TRANSLATIONS === 'undefined' || !TRANSLATIONS[currentLang]) {
      return '';
    }
    const keys = key.split('.');
    let value = TRANSLATIONS[currentLang];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return '';
      }
    }
    return value;
  }

  // 更新所有文本内容
  function updateAllTexts() {
    if (typeof TRANSLATIONS === 'undefined' || !TRANSLATIONS[currentLang]) return;
    
    document.title = t('pageTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));
    
    // 更新首页
    updateText('.landing-subtitle', 'subtitle');
    updateHTML('.landing-desc', 'description');
    updateTexts('.stat-label', ['statLabels.0', 'statLabels.1', 'statLabels.2', 'statLabels.3']);
    updateText('#page-landing .btn-primary', 'startBtn');
    updateText('#btn-show-result', 'showResultBtn');
    updateText('#page-landing p[style*="font-size:12px"]', 'disclaimerNote');
    
    // 更新免责声明
    updateText('.modal-title', 'disclaimerTitle');
    updateParagraphs('.disclaimer-text', 'disclaimerText');
    updateText('.modal-actions .btn-secondary', 'disagreeBtn');
    updateText('.modal-actions .btn-primary', 'agreeBtn');
    
    // 更新测试页按钮
    updateText('#btn-prev', 'prevBtn');
    updateText('#btn-next', 'nextBtn');
    updateText('#btn-submit', 'submitBtn');
    
    // 更新计算页面
    updateText('.calc-subtext', 'calcSubtext');
    // 初始化计算文本为第一个翻译
    const calcEl = document.getElementById('calc-text');
    const calcTexts = t('calcTexts');
    if (calcEl && calcTexts && calcTexts.length > 0) {
      calcEl.textContent = calcTexts[0];
    }
    
    // 更新结果页
    updateText('.result-actions .btn-primary', 'shareBtn');
    const retakeBtns = document.querySelectorAll('.result-actions .btn-secondary');
    if (retakeBtns[0]) updateText(retakeBtns[0], 'retakeBtn');
    if (retakeBtns[1]) updateText(retakeBtns[1], 'allPersonalitiesBtn');
    updateHTML('.result-footer-note', 'footerNote');
    
    // 更新所有人格页面
    updateText('.all-personalities-header h1', 'allPersonalitiesTitle');
    updateText('.all-personalities-header .subtitle', 'allPersonalitiesSubtitle');
    updateText('.all-personalities-header .btn', 'backBtn');
    
    // 条件性重新渲染
    const quizPage = document.getElementById('page-quiz');
    if (quizPage && !quizPage.classList.contains('hidden')) renderQuestion(currentQ);
    
    const personalitiesPage = document.getElementById('page-all-personalities');
    if (personalitiesPage && !personalitiesPage.classList.contains('hidden')) renderAllPersonalities();
    
    // 更新页脚
    const footerAuthorLabel = document.getElementById('footer-author-label');
    if (footerAuthorLabel && t('footerAuthor')) {
      footerAuthorLabel.textContent = t('footerAuthor');
      footerAuthorLabel.classList.toggle('by-label', t('footerAuthor') === 'By ');
    }
    
    const resultPage = document.getElementById('page-result');
    if (resultPage && result && !resultPage.classList.contains('hidden')) {
      renderResult(result);
    }
  }

  function showPage(id) {
    ['page-landing', 'page-disclaimer', 'page-quiz', 'page-calculating', 'page-result', 'page-all-personalities']
      .forEach(p => {
        const el = document.getElementById(p);
        if (el) {
          el.classList.add('hidden');
          el.classList.remove('page-enter');
        }
      });
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('page-enter');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 控制樱花动画
    if (id === 'page-landing') {
      resumeSakuraAnimation();
    } else {
      pauseSakuraAnimation();
    }
  }

  // 免责声明
  function showDisclaimer() {
    document.getElementById('modal-disclaimer').classList.remove('hidden');
  }

  function hideDisclaimer() {
    document.getElementById('modal-disclaimer').classList.add('hidden');
  }

  function agreeAndStart() {
    hideDisclaimer();
    startQuiz();
  }

  // 测试流程
  function startQuiz() {
    currentQ = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    showPage('page-quiz');
    renderQuestion(0);
  }

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    const total = QUESTIONS.length;

    const pct = Math.round(((index + 1) / total) * 100);
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = pct + '%';
    
    const qCounter = document.getElementById('q-counter');
    if (qCounter) qCounter.textContent = `${index + 1} / ${total}`;
    
    const qRemain = document.getElementById('q-remain');
    if (qRemain) {
      const remaining = t('remaining') || '还剩';
      const questionsLeft = t('questionsLeft') || '题';
      qRemain.textContent = `${remaining} ${total - index} ${questionsLeft}`;
    }

    const qNum = document.getElementById('q-num');
    if (qNum) qNum.textContent = index + 1;
    
    const qText = document.getElementById('q-text');
    if (qText) qText.textContent = getQuestionText(q, 'text');

    const optList = document.getElementById('options-list');
    if (!optList) return;
    
    const existingBtns = optList.querySelectorAll('.option-item');
    const opts = q.options;

    if (existingBtns.length === opts.length) {
      opts.forEach((opt, i) => {
        const btn = existingBtns[i];
        const isSelected = answers[index] && answers[index].label === opt.label;
        btn.className = 'option-item' + (isSelected ? ' selected' : '');
        const optionText = btn.querySelector('.option-text');
        if (optionText) optionText.textContent = getQuestionText(opt, 'text');
        btn.onclick = () => selectOption(index, opt, btn, optList);
      });
    } else {
      optList.innerHTML = '';
      opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-item' + (answers[index] && answers[index].label === opt.label ? ' selected' : '');
        btn.innerHTML = `
          <span class="option-label">${opt.label}</span>
          <span class="option-text">${getQuestionText(opt, 'text')}</span>
        `;
        btn.addEventListener('click', () => selectOption(index, opt, btn, optList));
        optList.appendChild(btn);
      });
    }

    updateNavButtons(index);
  }

  function selectOption(qIndex, opt, btn, list) {
    // 清除其他选中
    list.querySelectorAll('.option-item').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    answers[qIndex] = opt;
    updateNavButtons(qIndex);

    // 自动前进（300ms后）
    if (qIndex < QUESTIONS.length - 1) {
      setTimeout(() => nextQuestion(), 380);
    } else {
      document.getElementById('btn-submit').classList.remove('hidden');
      document.getElementById('btn-next').classList.add('hidden');
    }
  }

  function updateNavButtons(index) {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const isLast = index === QUESTIONS.length - 1;
    const hasAnswer = !!answers[index];

    btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
    btnNext.classList.toggle('hidden', isLast);
    btnSubmit.classList.toggle('hidden', !isLast || !hasAnswer);

    if (!isLast) {
      btnNext.disabled = !hasAnswer;
      btnNext.style.opacity = hasAnswer ? '1' : '0.5';
    }
  }

  function prevQuestion() {
    if (currentQ > 0) {
      currentQ--;
      renderQuestion(currentQ);
    }
  }

  function nextQuestion() {
    if (!answers[currentQ]) return;
    if (currentQ < QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion(currentQ);
    }
  }

  // 提交计算
  function submitQuiz() {
    // 检查是否全部回答
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      // 跳转到第一道未答的题
      const first = answers.findIndex(a => a === null);
      currentQ = first;
      renderQuestion(first);
      const toastMsg = t('unansweredToast');
      showToast(toastMsg ? toastMsg.replace('{count}', unanswered) : `还有 ${unanswered} 道题没有作答哦 👀`);
      return;
    }

    showPage('page-calculating');
    
    // 模拟计算时间（假装很厉害）
    const calcTexts = t('calcTexts') || ['正在分析...', '请稍候...'];
    let calcIdx = 0;
    const calcEl = document.getElementById('calc-text');
    const interval = calcEl ? setInterval(() => {
      calcEl.textContent = calcTexts[calcIdx % calcTexts.length];
      calcIdx++;
    }, 600) : null;

    setTimeout(() => {
      if (interval) clearInterval(interval);
      result = MFTIEngine.calculate(answers);
      // 保存结果到localStorage
      safeSetStorage('mfti_result', JSON.stringify(result));
      renderResult(result);
      showPage('page-result');
    }, 3200);
  }

  // 渲染结果
  function renderResult(res) {
    const p = res.personality;
    const norm = res.normalized;
    const names = getPersonalityNames(p);

    // 头像图片
    const avatarEl = document.getElementById('result-avatar');
    const avatarUrl = AVATARS[res.typeCode] || '';
    avatarEl.innerHTML = `<img src="${avatarUrl}?v=1.0.0" alt="${p.name}" loading="lazy" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    avatarEl.style.background = 'white';

    // 基本信息
    document.getElementById('result-code').textContent = p.code;
    document.getElementById('result-code').style.color = p.color;
    document.getElementById('result-name-zh').textContent = names.primary;
    document.getElementById('result-name-en').textContent = names.secondary;
    document.getElementById('result-subtitle').textContent = getPersonalityText(p, 'subtitle');

    // 标签
    const tagsEl = document.getElementById('result-tags');
    tagsEl.innerHTML = p.tags.map(t => {
      const translatedTag = getTranslatedTag(t);
      return `<span class="tag">${translatedTag}</span>`;
    }).join('');

    // 人格描述多语言（支持简单markdown: **粗体** 和换行）
    const descEl = document.getElementById('result-desc');
    descEl.innerHTML = formatDesc(getPersonalityText(p, 'description'));

    // 更新描述标题
    const descTitle = document.querySelector('.result-desc-card h3');
    if (descTitle) descTitle.textContent = t('portraitTitle');

    // 维度得分标题
    const dimTitle = document.querySelector('.dimensions-card h3');
    if (dimTitle) dimTitle.textContent = t('dimensionsTitle');

    // 相近人格标题
    const similarTitle = document.querySelector('.similar-section h3');
    if (similarTitle) similarTitle.textContent = t('similarTitle');

    // 维度得分
    renderDimensions(norm);

    // 相近人格
    renderSimilar(res.topMatches, res.typeCode);
  }

  function formatDesc(text) {
    return text
      .trim()
      .split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return '';
        // **粗体**
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<p>${line}</p>`;
      })
      .filter(l => l)
      .join('');
  }

  // 获取多语言维度标签
  function getTranslatedDimLabel(key, score) {
    const labelKey = score > 70 ? 'high' : score < 30 ? 'low' : 'balanced';
    const translated = t(`dimensions.${key}.${labelKey}`);
    return translated || MFTIEngine.getDimLabel(key, score);
  }

  // 获取翻译后的人格标签
  function getTranslatedTag(tag) {
    if (currentLang === 'zh') return tag;
    if (typeof TRANSLATIONS === 'undefined' || !TRANSLATIONS.zh || !TRANSLATIONS.zh.tags) return tag;
    // 先精确匹配，没有则尝试去空格匹配
    return TRANSLATIONS.zh.tags[tag] || TRANSLATIONS.zh.tags[tag.replace(/\s+/g, '')] || tag;
  }

  function renderDimensions(norm) {
    const container = document.getElementById('dimensions-list');
    container.innerHTML = '';

    Object.entries(DIMENSIONS).forEach(([key, dim]) => {
      const score = norm[key] || 50;
      const label = getTranslatedDimLabel(key, score);
      const dimName = t(`dimensions.${key}.name`);
      const row = document.createElement('div');
      row.className = 'dimension-row';
      row.innerHTML = `
        <span class="dim-label">${dimName}</span>
        <div class="dim-bar-wrap">
          <div class="dim-bar-fill" style="width: 0%" data-target="${score}"></div>
        </div>
        <span class="dim-score">${score}</span>
        <span class="dim-desc">${label}</span>
      `;
      container.appendChild(row);
    });

    // 动画加载进度条
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.querySelectorAll('.dim-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.target + '%';
        });
      });
    });
  }

  function renderSimilar(topMatches, currentCode) {
    const container = document.getElementById('similar-list');
    container.innerHTML = '';
    topMatches.forEach(([typeCode, score]) => {
      if (typeCode === currentCode) return;
      const p = PERSONALITIES[typeCode];
      if (!p) return;

      const names = getPersonalityNames(p);
      const div = document.createElement('div');
      div.className = 'similar-item';
      div.innerHTML = `
        <span class="similar-emoji">${p.emoji}</span>
        <div class="similar-info">
          <span class="similar-name">${names.primary}</span>
          <span class="similar-en">${names.secondary}</span>
        </div>
        <span class="similar-score" style="color:${p.color}">${score}%</span>
      `;
      container.appendChild(div);
    });
  }

  // Toast 提示
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }

  // 重新测试
  function retake() {
    currentQ = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    result = null;
    showPage('page-landing');
    window.scrollTo({ top: 0 });
    restartSakuraAnimation();
  }

  function backToLanding() {
    showPage('page-landing');
    window.scrollTo({ top: 0 });
    restartSakuraAnimation();
  }

  // 分享
  function shareResult() {
    if (!result) return;
    const p = result.personality;
    // 人格名称和副标题多语言
    const name = getPersonalityText(p, 'name');
    const subtitle = getPersonalityText(p, 'subtitle');
    const text = t('shareText')
      .replace('{name}', name)
      .replace('{code}', p.code)
      .replace('{emoji}', p.emoji)
      .replace('{subtitle}', subtitle);
    if (navigator.share) {
      const shareTitle = t('shareTitle') || (currentLang === 'en' ? 'MFTI My Test Result' : 'MFTI 我的测试结果');
      navigator.share({ title: shareTitle, text }).catch(() => copyText(text));
    } else {
      copyText(text);
    }
  }

  function copyText(text) {
    const successMsg = t('copiedToast') || '结果已复制到剪贴板 📋';
    const failMsg = t('copyFailedToast') || '请手动截图分享哦~';
    
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg))
        .catch(() => fallbackCopy(text, successMsg, failMsg));
    } else {
      fallbackCopy(text, successMsg, failMsg);
    }
  }

  // 旧浏览器备用复制方法
  function fallbackCopy(text, successMsg, failMsg) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(successful ? successMsg : failMsg);
    } catch (e) {
      console.warn('Failed to copy text:', e);
      showToast(failMsg);
    }
  }

  // 显示所有人格
  function showAllPersonalities() {
    showPage('page-all-personalities');
    renderAllPersonalities();
  }

  function renderAllPersonalities() {
    const grid = document.getElementById('personalities-grid');
    grid.innerHTML = '';

    Object.entries(PERSONALITIES).forEach(([code, p]) => {
      const card = document.createElement('div');
      card.className = 'personality-card';

      const avatarUrl = AVATARS[code] || '';
      const names = getPersonalityNames(p);

      card.innerHTML = `
        <img src="${avatarUrl}?v=1.0.0" alt="${p.name}" loading="lazy" class="personality-avatar">
        <div class="personality-code" style="color: ${p.color}">${p.code}</div>
        <div class="personality-name-zh">${names.primary}</div>
        <div class="personality-name-en">${names.secondary}</div>
        <div class="personality-subtitle">${getPersonalityText(p, 'subtitle')}</div>
        <div class="personality-tags">
          ${p.tags.map(tag => `<span class="personality-tag">${getTranslatedTag(tag)}</span>`).join('')}
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // 重新启动大樱花动画
  function restartSakuraAnimation() {
    const logo = document.querySelector('.landing-logo');
    if (!logo) return;
    
    // 强制重绘以重新启动动画
    const parent = logo.parentNode;
    const nextSibling = logo.nextSibling;
    parent.removeChild(logo);
    parent.insertBefore(logo, nextSibling);
  }

  // 显示首页
  function showLanding() {
    showPage('page-landing');
    // 检查是否有保存的结果
    const savedResult = safeGetStorage('mfti_result', null);
    const resultBtn = document.getElementById('btn-show-result');
    if (savedResult && resultBtn) {
      resultBtn.classList.remove('hidden');
    } else if (resultBtn) {
      resultBtn.classList.add('hidden');
    }
    restartSakuraAnimation();
  }

  // 查看上次结果
  function showSavedResult() {
    try {
      const savedResult = safeGetStorage('mfti_result', null);
      if (savedResult) {
        result = JSON.parse(savedResult);
        // 从 PERSONALITIES 中重新获取完整的人格数据（包含英文翻译）
        if (result && result.typeCode && PERSONALITIES[result.typeCode]) {
          result.personality = PERSONALITIES[result.typeCode];
          renderResult(result);
          showPage('page-result');
        }
      }
    } catch (e) {
      console.warn('Failed to load saved result:', e);
    }
  }

  // 获取当前语言
  function getCurrentLanguage() {
    return currentLang;
  }

  // 公开 API
  return {
    showDisclaimer,
    hideDisclaimer,
    agreeAndStart,
    prevQuestion,
    nextQuestion,
    submitQuiz,
    retake,
    backToLanding,
    shareResult,
    showAllPersonalities,
    showLanding,
    showSavedResult,
    toggleLanguage,
    setLanguage,
    getCurrentLanguage
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  // 先显示首页
  App.showLanding();
  createSakuraPetals();
  
  // 等待一下，确保所有脚本都加载完成
  setTimeout(() => {
    // 初始化语言 - 这里不需要重新获取，App内部已经初始化过了
    // 但为了确保一致性，我们还是调用一下 setLanguage
    App.setLanguage(App.getCurrentLanguage ? App.getCurrentLanguage() : 'zh');
    
    // 绑定语言切换按钮
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.addEventListener('click', () => App.toggleLanguage());
    }
  }, 100);
});

let sakuraPetals = [];
let sakuraAnimationPaused = false;

// 生成飘落花瓣粒子
function createSakuraPetals() {
  const container = document.getElementById('sakura-petals');
  if (!container) return;

  // 生成连续旋转角度
  function generateRotations() {
    const start = Math.random() * 360;
    const dir = Math.random() > 0.5 ? 1 : -1;
    const rotations = [];
    let current = start;
    for (let i = 0; i < 5; i++) {
      current += dir * (180 + Math.random() * 360);
      rotations.push(current);
    }
    return rotations;
  }

  const petalCount = 18;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    const left = Math.random() * 100;
    const size = 6 + Math.random() * 16;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 15;
    const driftX = (Math.random() - 0.5) * 150;
    const [r1, r2, r3, r4, r5] = generateRotations();
    const blur = Math.random() > 0.75 ? 0.8 + Math.random() * 0.8 : 0;

    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift-x: ${driftX}px;
      --rotate1: ${r1}deg;
      --rotate2: ${r2}deg;
      --rotate3: ${r3}deg;
      --rotate4: ${r4}deg;
      --rotate5: ${r5}deg;
      filter: blur(${blur}px);
    `;
    container.appendChild(petal);
    sakuraPetals.push(petal);
  }
}

// 暂停樱花动画
function pauseSakuraAnimation() {
  if (sakuraAnimationPaused) return;
  sakuraPetals.forEach(petal => {
    petal.style.animationPlayState = 'paused';
  });
  sakuraAnimationPaused = true;
}

// 恢复樱花动画
function resumeSakuraAnimation() {
  if (!sakuraAnimationPaused) return;
  sakuraPetals.forEach(petal => {
    petal.style.animationPlayState = 'running';
  });
  sakuraAnimationPaused = false;
}
