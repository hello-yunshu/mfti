// MFTI 主应用逻辑

const App = (() => {

  let currentQ = 0;
  let answers = new Array(30).fill(null);
  let result = null;

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
    document.getElementById('q-remain').textContent = `还剩 ${total - index} 题`;

    // 渲染题目
    document.getElementById('q-num').textContent = index + 1;
    document.getElementById('q-text').textContent = q.text;

    // 渲染选项
    const optList = document.getElementById('options-list');
    optList.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-item' + (answers[index] && answers[index].label === opt.label ? ' selected' : '');
      btn.innerHTML = `
        <span class="option-label">${opt.label}</span>
        <span class="option-text">${opt.text}</span>
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
      showToast(`还有 ${unanswered} 道题没有作答哦 👀`);
      return;
    }

    showPage('page-calculating');
    
    // 模拟计算时间（假装很厉害）
    const calcTexts = [
      '正在分析您的心理画像...',
      '校准粉色梦境指数...',
      '检测深柜深度...',
      '评估社牛系数...',
      '正在输出人格报告...'
    ];
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
    document.getElementById('result-subtitle').textContent = p.subtitle;

    // 标签
    const tagsEl = document.getElementById('result-tags');
    tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // 人格描述（支持简单markdown: **粗体** 和换行）
    const descEl = document.getElementById('result-desc');
    descEl.innerHTML = formatDesc(p.description);

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

  function renderDimensions(norm) {
    const container = document.getElementById('dimensions-list');
    container.innerHTML = '';

    Object.entries(DIMENSIONS).forEach(([key, dim]) => {
      const score = norm[key] || 50;
      const label = MFTIEngine.getDimLabel(key, score);
      const row = document.createElement('div');
      row.className = 'dimension-row';
      row.innerHTML = `
        <span class="dim-label">${dim.name}</span>
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
    const text = `我是MFTI的「${p.name}」(${p.code}) ${p.emoji}\n"${p.subtitle}"\n快来测测你是哪种类型！`;
    if (navigator.share) {
      navigator.share({ title: 'MFTI 我的测试结果', text }).catch(() => copyText(text));
    } else {
      copyText(text);
    }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('结果已复制到剪贴板 📋');
    }).catch(() => {
      showToast('请手动截图分享哦~');
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
        <div class="personality-subtitle">${p.subtitle}</div>
        <div class="personality-tags">
          ${p.tags.map(tag => `<span class="personality-tag">${tag}</span>`).join('')}
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
    showSavedResult
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  App.showLanding();
});
