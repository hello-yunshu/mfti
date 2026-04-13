// MFTI 主应用逻辑

const App = (() => {

  let currentQ = 0;
  let answers = [];
  let result = null;
  let currentLang = localStorage.getItem('mfti_lang') || 'zh';

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

  // 设置语言
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mfti_lang', lang);
    
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
    // 只在有翻译时才更新
    if (typeof TRANSLATIONS === 'undefined' || !TRANSLATIONS[currentLang]) {
      return;
    }
    
    document.title = t('pageTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('metaDescription'));
    }
    
    // 更新首页
    const landingSubtitle = document.querySelector('.landing-subtitle');
    if (landingSubtitle && t('subtitle')) landingSubtitle.textContent = t('subtitle');
    
    const landingDesc = document.querySelector('.landing-desc');
    if (landingDesc && t('description')) landingDesc.innerHTML = t('description');
    
    // 更新统计标签
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = ['statLabels.0', 'statLabels.1', 'statLabels.2', 'statLabels.3'];
    statLabels.forEach((el, i) => {
      const translated = t(statKeys[i]);
      if (translated) el.textContent = translated;
    });
    
    // 更新按钮
    const startBtn = document.querySelector('#page-landing .btn-primary');
    if (startBtn && t('startBtn')) startBtn.textContent = t('startBtn');
    
    const showResultBtn = document.getElementById('btn-show-result');
    if (showResultBtn && t('showResultBtn')) showResultBtn.textContent = t('showResultBtn');
    
    const disclaimerNote = document.querySelector('#page-landing p[style*="font-size:12px"]');
    if (disclaimerNote && t('disclaimerNote')) disclaimerNote.textContent = t('disclaimerNote');
    
    // 更新免责声明
    const modalTitle = document.querySelector('.modal-title');
    if (modalTitle && t('disclaimerTitle')) modalTitle.textContent = t('disclaimerTitle');
    
    const disclaimerText = document.querySelector('.disclaimer-text');
    if (disclaimerText) {
      const texts = t('disclaimerText');
      if (texts && Array.isArray(texts)) {
        disclaimerText.innerHTML = texts.map(p => `<p>${p}</p>`).join('');
      }
    }
    
    const disagreeBtn = document.querySelector('.modal-actions .btn-secondary');
    if (disagreeBtn && t('disagreeBtn')) disagreeBtn.textContent = t('disagreeBtn');
    
    const agreeBtn = document.querySelector('.modal-actions .btn-primary');
    if (agreeBtn && t('agreeBtn')) agreeBtn.textContent = t('agreeBtn');
    
    // 更新测试页按钮
    const btnPrev = document.getElementById('btn-prev');
    if (btnPrev && t('prevBtn')) btnPrev.textContent = t('prevBtn');
    
    const btnNext = document.getElementById('btn-next');
    if (btnNext && t('nextBtn')) btnNext.textContent = t('nextBtn');
    
    const btnSubmit = document.getElementById('btn-submit');
    if (btnSubmit && t('submitBtn')) btnSubmit.textContent = t('submitBtn');
    
    // 更新计算页面
    const calcSubtext = document.querySelector('.calc-subtext');
    if (calcSubtext && t('calcSubtext')) calcSubtext.textContent = t('calcSubtext');
    
    // 更新结果页
    const shareBtn = document.querySelector('.result-actions .btn-primary');
    if (shareBtn && t('shareBtn')) shareBtn.textContent = t('shareBtn');
    
    const retakeBtns = document.querySelectorAll('.result-actions .btn-secondary');
    if (retakeBtns[0] && t('retakeBtn')) retakeBtns[0].textContent = t('retakeBtn');
    if (retakeBtns[1] && t('allPersonalitiesBtn')) retakeBtns[1].textContent = t('allPersonalitiesBtn');
    
    const footerNote = document.querySelector('.result-footer-note');
    if (footerNote && t('footerNote')) footerNote.innerHTML = t('footerNote');
    
    // 更新所有人格页面
    const allPersTitle = document.querySelector('.all-personalities-header h1');
    if (allPersTitle && t('allPersonalitiesTitle')) allPersTitle.textContent = t('allPersonalitiesTitle');
    
    const allPersSubtitle = document.querySelector('.all-personalities-header .subtitle');
    if (allPersSubtitle && t('allPersonalitiesSubtitle')) allPersSubtitle.textContent = t('allPersonalitiesSubtitle');
    
    const backBtn = document.querySelector('.all-personalities-header .btn');
    if (backBtn && t('backBtn')) backBtn.textContent = t('backBtn');
    
    // 如果在答题页面，重新渲染当前题目以更新语言
    const quizPage = document.getElementById('page-quiz');
    if (quizPage && !quizPage.classList.contains('hidden')) {
      renderQuestion(currentQ);
    }
    
    // 如果在所有人格页面，重新渲染以更新标签
    const personalitiesGrid = document.getElementById('personalities-grid');
    if (personalitiesGrid) {
      renderAllPersonalities();
    }
    
    // 更新页脚
    const footerAuthorLabel = document.getElementById('footer-author-label');
    if (footerAuthorLabel && t('footerAuthor')) {
      footerAuthorLabel.textContent = t('footerAuthor');
    }
    
    // 如果在结果页面，重新渲染以更新标签
    const resultPage = document.getElementById('page-result');
    if (resultPage && result && !resultPage.classList.contains('hidden')) {
      renderResult(result);
    }
  }

  // 页面切换
  function showPage(id) {
    ['page-landing', 'page-disclaimer', 'page-quiz', 'page-calculating', 'page-result', 'page-all-personalities']
      .forEach(p => {
        const el = document.getElementById(p);
        if (el) el.classList.add('hidden');
      });
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // 更新进度
    const pct = Math.round((index / total) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('q-counter').textContent = `${index + 1} / ${total}`;
    document.getElementById('q-remain').textContent = `${t('remaining')} ${total - index} ${t('questionsLeft')}`;

    // 渲染题目
    document.getElementById('q-num').textContent = index + 1;
    document.getElementById('q-text').textContent = getQuestionText(q, 'text');

    // 渲染选项
    const optList = document.getElementById('options-list');
    optList.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-item' + (answers[index] && answers[index].label === opt.label ? ' selected' : '');
      btn.innerHTML = `
        <span class="option-label">${opt.label}</span>
        <span class="option-text">${getQuestionText(opt, 'text')}</span>
      `;
      btn.addEventListener('click', () => selectOption(index, opt, btn, optList));
      optList.appendChild(btn);
    });

    // 更新按钮状态
    updateNavButtons(index);

    // 动画刷新
    const card = document.getElementById('question-card');
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = '';
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

    btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';

    if (index === QUESTIONS.length - 1) {
      btnNext.classList.add('hidden');
      if (answers[index]) btnSubmit.classList.remove('hidden');
      else btnSubmit.classList.add('hidden');
    } else {
      btnNext.classList.remove('hidden');
      btnSubmit.classList.add('hidden');
      btnNext.disabled = !answers[index];
      btnNext.style.opacity = answers[index] ? '1' : '0.5';
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
      showToast(t('unansweredToast').replace('{count}', unanswered));
      return;
    }

    showPage('page-calculating');
    
    // 模拟计算时间（假装很厉害）
    const calcTexts = t('calcTexts');
    let calcIdx = 0;
    const calcEl = document.getElementById('calc-text');
    const interval = setInterval(() => {
      calcEl.textContent = calcTexts[calcIdx % calcTexts.length];
      calcIdx++;
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      result = MFTIEngine.calculate(answers);
      // 保存结果到localStorage
      localStorage.setItem('mfti_result', JSON.stringify(result));
      renderResult(result);
      showPage('page-result');
    }, 3200);
  }

  // 渲染结果
  function renderResult(res) {
    const p = res.personality;
    const norm = res.normalized;

    // 头像图片
    const avatarEl = document.getElementById('result-avatar');
    const avatarUrl = AVATARS[res.typeCode] || '';
    avatarEl.innerHTML = `<img src="${avatarUrl}?v=1.0.0" alt="${p.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    avatarEl.style.background = 'white';

    // 基本信息
    document.getElementById('result-code').textContent = p.code;
    document.getElementById('result-code').style.color = p.color;
    document.getElementById('result-name-zh').textContent = p.name;
    document.getElementById('result-name-en').textContent = p.nameEn;
    
    // 副标题多语言
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
    let labelKey;
    if (score > 70) {
      labelKey = 'high';
    } else if (score < 30) {
      labelKey = 'low';
    } else {
      labelKey = 'balanced';
    }
    const translated = t(`dimensions.${key}.${labelKey}`);
    return translated || MFTIEngine.getDimLabel(key, score);
  }

  // 获取翻译后的人格标签
  function getTranslatedTag(tag) {
    // 中文时返回原标签，英文时查找翻译
    if (currentLang === 'zh') {
      return tag;
    }
    // 在翻译数据中查找标签对应的英文
    if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.zh && TRANSLATIONS.zh.tags && TRANSLATIONS.zh.tags[tag]) {
      return TRANSLATIONS.zh.tags[tag];
    }
    return tag;
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
      const div = document.createElement('div');
      div.className = 'similar-item';
      div.innerHTML = `
        <span class="similar-emoji">${p.emoji}</span>
        <div class="similar-info">
          <span class="similar-name">${p.name}</span>
          <span class="similar-en">${p.nameEn}</span>
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
      toast.style.cssText = `
        position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
        background:#2C1A2E; color:white; padding:12px 24px; border-radius:99px;
        font-size:14px; font-weight:600; z-index:9999; box-shadow:0 8px 24px rgba(0,0,0,0.2);
        animation: toastIn 0.3s ease;
      `;
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
      navigator.share({ title: currentLang === 'en' ? 'MFTI My Test Result' : 'MFTI 我的测试结果', text }).catch(() => copyText(text));
    } else {
      copyText(text);
    }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(t('copiedToast'));
    }).catch(() => {
      showToast(t('copyFailedToast'));
    });
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
      
      // 头像图片
      const avatarUrl = AVATARS[code] || '';
      
      card.innerHTML = `
        <img src="${avatarUrl}?v=1.0.0" alt="${p.name}" class="personality-avatar">
        <div class="personality-code" style="color: ${p.color}">${p.code}</div>
        <div class="personality-name-zh">${p.name}</div>
        <div class="personality-name-en">${p.nameEn}</div>
        <div class="personality-subtitle">${getPersonalityText(p, 'subtitle')}</div>
        <div class="personality-tags">
          ${p.tags.map(tag => {
            const translatedTag = getTranslatedTag(tag);
            return `<span class="personality-tag">${translatedTag}</span>`;
          }).join('')}
        </div>
      `;
      
      grid.appendChild(card);
    });
  }

  // 显示首页
  function showLanding() {
    showPage('page-landing');
    // 检查是否有保存的结果
    const savedResult = localStorage.getItem('mfti_result');
    const resultBtn = document.getElementById('btn-show-result');
    if (savedResult && resultBtn) {
      resultBtn.classList.remove('hidden');
    } else if (resultBtn) {
      resultBtn.classList.add('hidden');
    }
  }

  // 查看上次结果
  function showSavedResult() {
    const savedResult = localStorage.getItem('mfti_result');
    if (savedResult) {
      result = JSON.parse(savedResult);
      // 从 PERSONALITIES 中重新获取完整的人格数据（包含英文翻译）
      if (result.typeCode && PERSONALITIES[result.typeCode]) {
        result.personality = PERSONALITIES[result.typeCode];
      }
      renderResult(result);
      showPage('page-result');
    }
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
    shareResult,
    showAllPersonalities,
    showLanding,
    showSavedResult,
    toggleLanguage,
    setLanguage
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  // 先显示首页
  App.showLanding();
  createSakuraPetals();
  
  // 等待一下，确保所有脚本都加载完成
  setTimeout(() => {
    // 初始化语言
    const savedLang = localStorage.getItem('mfti_lang') || 'zh';
    App.setLanguage(savedLang);
    
    // 绑定语言切换按钮
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.addEventListener('click', () => App.toggleLanguage());
    }
  }, 100);
});

// 生成飘落花瓣粒子
function createSakuraPetals() {
  const container = document.getElementById('sakura-petals');
  if (!container) return;
  
  const petalCount = 22;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    // 随机参数
    const left = Math.random() * 100;
    const size = 6 + Math.random() * 16;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 15;
    const driftX = (Math.random() - 0.5) * 150;
    
    // 连续旋转，每个阶段递增
    const startRotate = Math.random() * 360;
    const rotate1 = startRotate + 180 + Math.random() * 360;
    const rotate2 = rotate1 + 180 + Math.random() * 360;
    const rotate3 = rotate2 + 180 + Math.random() * 360;
    const rotate4 = rotate3 + 180 + Math.random() * 360;
    const rotate5 = rotate4 + 180 + Math.random() * 360;
    
    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift-x: ${driftX}px;
      --rotate1: ${rotate1}deg;
      --rotate2: ${rotate2}deg;
      --rotate3: ${rotate3}deg;
      --rotate4: ${rotate4}deg;
      --rotate5: ${rotate5}deg;
      filter: blur(${Math.random() > 0.75 ? 0.8 + Math.random() * 0.8 : 0}px);
    `;
    container.appendChild(petal);
  }
}
