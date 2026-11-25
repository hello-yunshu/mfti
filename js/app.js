"use strict";

// MFTI 主应用逻辑
// 结果默认只保存在当前会话内存中；用户明确点击「保存到本机」后才写入 localStorage。

const App = (() => {

  const STORAGE_RESULT_KEY = "mfti_result";
  const STORAGE_LANG_KEY = "mfti_lang";
  const CURRENT_SCHEMA = 2;
  const AUTO_ADVANCE_MS = 320;

  let currentQ = 0;
  let answers = [];
  let result = null;
  let resultSaved = false;
  let currentLang;
  let advanceTimer = null;
  let lastFocusedElement = null;
  let toastTimer = null;

  // ---------- 存储 ----------

  function safeGetStorage(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (e) {
      console.warn("Failed to read localStorage:", e);
      return defaultValue;
    }
  }

  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn("Failed to write localStorage:", e);
      return false;
    }
  }

  function safeRemoveStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn("Failed to remove localStorage:", e);
      return false;
    }
  }

  currentLang = safeGetStorage(STORAGE_LANG_KEY, "zh");

  // ---------- 语言 ----------

  function getPersonalityText(p, field) {
    const enField = field + "En";
    return currentLang === "en" && p[enField] ? p[enField] : p[field];
  }

  function getQuestionText(q, field) {
    const enField = field + "En";
    return currentLang === "en" && q[enField] ? q[enField] : q[field];
  }

  function getPersonalityNames(p) {
    return {
      primary: currentLang === "en" ? p.nameEn : p.name,
      secondary: currentLang === "en" ? p.name : p.nameEn
    };
  }

  function getPersonalityTags(p) {
    if (currentLang === "en" && Array.isArray(p.tagsEn) && p.tagsEn.length === p.tags.length) {
      return p.tagsEn;
    }
    return p.tags;
  }

  function t(key) {
    if (typeof TRANSLATIONS === "undefined" || !TRANSLATIONS[currentLang]) return "";
    const keys = key.split(".");
    let value = TRANSLATIONS[currentLang];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return "";
      }
    }
    return value;
  }

  function updateText(selectorOrEl, key) {
    const el = typeof selectorOrEl === "string" ? document.querySelector(selectorOrEl) : selectorOrEl;
    const translated = t(key);
    if (el && translated) el.textContent = translated;
  }

  function updateTexts(selector, keys) {
    document.querySelectorAll(selector).forEach((el, i) => {
      const translated = t(keys[i]);
      if (translated) el.textContent = translated;
    });
  }

  function updateHTML(selectorOrEl, key) {
    const el = typeof selectorOrEl === "string" ? document.querySelector(selectorOrEl) : selectorOrEl;
    const translated = t(key);
    if (el && translated) el.innerHTML = translated;
  }

  function updateParagraphs(selector, key) {
    const el = document.querySelector(selector);
    const texts = t(key);
    if (el && Array.isArray(texts)) {
      el.innerHTML = texts.map(p => `<p>${p}</p>`).join("");
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    safeSetStorage(STORAGE_LANG_KEY, lang);
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";

    const langBtn = document.getElementById("lang-switch");
    if (langBtn) {
      langBtn.textContent = lang === "zh" ? "🌐 English" : "🌐 中文";
      langBtn.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }

    if (typeof TRANSLATIONS !== "undefined") updateAllTexts();
  }

  function toggleLanguage() {
    clearAdvanceTimer();
    setLanguage(currentLang === "zh" ? "en" : "zh");
  }

  function updateAllTexts() {
    if (typeof TRANSLATIONS === "undefined" || !TRANSLATIONS[currentLang]) return;

    document.title = t("pageTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("metaDescription"));

    updateText(".landing-subtitle", "subtitle");
    updateHTML(".landing-desc", "description");
    updateTexts(".stat-label", ["statLabels.0", "statLabels.1", "statLabels.2", "statLabels.3"]);
    updateText("#btn-start", "startBtn");
    updateText("#btn-show-result", "showResultBtn");
    updateText(".landing-note", "disclaimerNote");

    updateText(".modal-title", "disclaimerTitle");
    updateParagraphs(".disclaimer-text", "disclaimerText");
    updateText(".modal-actions .btn-secondary", "disagreeBtn");
    updateText(".modal-actions .btn-primary", "agreeBtn");

    updateText("#btn-prev", "prevBtn");
    updateText("#btn-next", "nextBtn");
    updateText("#btn-submit", "submitBtn");

    const quizBrand = document.querySelector(".quiz-brand");
    if (quizBrand && t("backHomeAria")) quizBrand.setAttribute("aria-label", t("backHomeAria"));
    const progressWrap = document.getElementById("progress-wrap");
    if (progressWrap && t("progressAria")) progressWrap.setAttribute("aria-label", t("progressAria"));

    updateText("#btn-share", "shareBtn");
    updateText("#btn-copy", "copyBtn");
    updateText("#btn-save", "saveBtn");
    updateText("#btn-retake", "retakeBtn");
    updateText("#btn-delete-result", "deleteResultBtn");
    updateText("#btn-delete-result-page", "deleteResultBtn");
    updateText("#btn-all-personalities", "allPersonalitiesBtn");
    updateHTML(".result-footer-note", "footerNote");

    updateText(".all-personalities-header h1", "allPersonalitiesTitle");
    updateText(".all-personalities-header .subtitle", "allPersonalitiesSubtitle");
    updateText(".all-personalities-header .btn", "backBtn");

    const quizPage = document.getElementById("page-quiz");
    if (quizPage && !quizPage.classList.contains("hidden")) renderQuestion(currentQ);

    const personalitiesPage = document.getElementById("page-all-personalities");
    if (personalitiesPage && !personalitiesPage.classList.contains("hidden")) renderAllPersonalities();

    const footerAuthorLabel = document.getElementById("footer-author-label");
    if (footerAuthorLabel && t("footerAuthor")) {
      footerAuthorLabel.textContent = t("footerAuthor");
      footerAuthorLabel.classList.toggle("by-label", t("footerAuthor") === "By ");
    }

    const resultPage = document.getElementById("page-result");
    if (resultPage && result && !resultPage.classList.contains("hidden")) {
      renderResult(result);
    }

    updateLandingButtons();
  }

  function scrollToTop() {
    const reduce = typeof prefersReducedMotion === "function" && prefersReducedMotion();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  // ---------- 页面切换 ----------

  function showPage(id) {
    ["page-landing", "page-quiz", "page-result", "page-all-personalities"].forEach(p => {
      const el = document.getElementById(p);
      if (el) {
        el.classList.add("hidden");
        el.classList.remove("page-enter");
      }
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove("hidden");
      target.classList.add("page-enter");
      scrollToTop();
    }

    if (id === "page-landing") {
      resumeSakuraAnimation();
    } else {
      pauseSakuraAnimation();
    }
  }

  // ---------- 免责声明弹窗 ----------

  function getModal() {
    return document.getElementById("modal-disclaimer");
  }

  function showDisclaimer() {
    const modal = getModal();
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.remove("hidden");
    const firstButton = modal.querySelector(".modal-actions .btn-secondary");
    if (firstButton) firstButton.focus();
  }

  function hideDisclaimer() {
    const modal = getModal();
    if (!modal) return;
    modal.classList.add("hidden");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function agreeAndStart() {
    hideDisclaimer();
    startQuiz();
  }

  // ---------- 答题流程 ----------
  function clearAdvanceTimer() {
    if (advanceTimer !== null) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }

  function startQuiz() {
    clearAdvanceTimer();
    currentQ = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    showPage("page-quiz");
    renderQuestion(0);
    const firstOption = document.querySelector("#options-list .option-item");
    if (firstOption) firstOption.focus({ preventScroll: true });
  }

  function getAnsweredCount() {
    return answers.filter(a => a !== null).length;
  }

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    if (!q) return;
    const total = QUESTIONS.length;
    const answeredCount = getAnsweredCount();

    const progressFill = document.getElementById("progress-fill");
    if (progressFill) {
      progressFill.style.width = Math.round((answeredCount / total) * 100) + "%";
      progressFill.setAttribute("aria-valuenow", String(answeredCount));
      progressFill.setAttribute("aria-valuemax", String(total));
    }

    const qCounter = document.getElementById("q-counter");
    if (qCounter) qCounter.textContent = `${index + 1} / ${total}`;

    const qRemain = document.getElementById("q-remain");
    if (qRemain) {
      const remaining = t("remaining") || "还剩";
      const questionsLeft = t("questionsLeft") || "题";
      qRemain.textContent = `${remaining} ${total - answeredCount} ${questionsLeft}`;
    }

    const qNum = document.getElementById("q-num");
    if (qNum) qNum.textContent = index + 1;

    const qText = document.getElementById("q-text");
    if (qText) qText.textContent = getQuestionText(q, "text");

    const optList = document.getElementById("options-list");
    if (!optList) return;

    const existingBtns = optList.querySelectorAll(".option-item");
    const opts = q.options;

    if (existingBtns.length === opts.length) {
      opts.forEach((opt, i) => {
        const btn = existingBtns[i];
        const isSelected = Boolean(answers[index] && answers[index].label === opt.label);
        btn.className = "option-item" + (isSelected ? " selected" : "");
        btn.setAttribute("aria-checked", String(isSelected));
        const optionText = btn.querySelector(".option-text");
        if (optionText) optionText.textContent = getQuestionText(opt, "text");
        btn.onclick = () => selectOption(index, opt, btn, optList);
      });
    } else {
      optList.innerHTML = "";
      opts.forEach(opt => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-item" + (answers[index] && answers[index].label === opt.label ? " selected" : "");
        btn.setAttribute("role", "radio");
        btn.setAttribute("aria-checked", String(Boolean(answers[index] && answers[index].label === opt.label)));

        const label = document.createElement("span");
        label.className = "option-label";
        label.textContent = opt.label;

        const text = document.createElement("span");
        text.className = "option-text";
        text.textContent = getQuestionText(opt, "text");

        btn.appendChild(label);
        btn.appendChild(text);
        btn.addEventListener("click", () => selectOption(index, opt, btn, optList));
        optList.appendChild(btn);
      });
    }

    optList.setAttribute("role", "radiogroup");
    optList.setAttribute("aria-label", getQuestionText(q, "text"));

    if (!optList.dataset.keyboardReady) {
      optList.dataset.keyboardReady = "true";
      optList.addEventListener("keydown", handleOptionKeydown);
    }

    updateNavButtons(index);
  }

  // 方向键在选项间移动焦点，空格／回车沿用按钮原生行为完成选择
  function handleOptionKeydown(event) {
    const isArrow = event.key === "ArrowDown" || event.key === "ArrowRight"
      || event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!isArrow && event.key !== "Home" && event.key !== "End") return;

    const options = Array.from(event.currentTarget.querySelectorAll(".option-item"));
    const currentIndex = options.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;
    else if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (currentIndex + 1) % options.length;
    else nextIndex = (currentIndex - 1 + options.length) % options.length;

    event.preventDefault();
    options[nextIndex].focus();
  }

  function selectOption(qIndex, opt, btn, list) {
    // 防止题目已经切换后仍被旧闭包选中
    if (qIndex !== currentQ) return;

    list.querySelectorAll(".option-item").forEach(b => {
      b.classList.remove("selected");
      b.setAttribute("aria-checked", "false");
    });
    btn.classList.add("selected");
    btn.setAttribute("aria-checked", "true");
    answers[qIndex] = opt;

    updateNavButtons(qIndex);
    updateProgressOnly();

    clearAdvanceTimer();
    if (qIndex < QUESTIONS.length - 1) {
      advanceTimer = setTimeout(() => {
        advanceTimer = null;
        // 双重校验：期间没有切题、没有切换语言、该题仍有答案
        if (currentQ === qIndex && answers[qIndex]) nextQuestion();
      }, AUTO_ADVANCE_MS);
    }
  }

  function updateProgressOnly() {
    const total = QUESTIONS.length;
    const answeredCount = getAnsweredCount();
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) {
      progressFill.style.width = Math.round((answeredCount / total) * 100) + "%";
      progressFill.setAttribute("aria-valuenow", String(answeredCount));
    }
    const qRemain = document.getElementById("q-remain");
    if (qRemain) {
      const remaining = t("remaining") || "还剩";
      const questionsLeft = t("questionsLeft") || "题";
      qRemain.textContent = `${remaining} ${total - answeredCount} ${questionsLeft}`;
    }
  }

  function updateNavButtons(index) {
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const btnSubmit = document.getElementById("btn-submit");
    const isLast = index === QUESTIONS.length - 1;
    const hasAnswer = Boolean(answers[index]);

    if (btnPrev) btnPrev.style.visibility = index === 0 ? "hidden" : "visible";
    if (btnNext) {
      btnNext.classList.toggle("hidden", isLast);
      btnNext.disabled = !hasAnswer;
      btnNext.style.opacity = hasAnswer ? "1" : "0.5";
    }
    if (btnSubmit) {
      btnSubmit.classList.toggle("hidden", !isLast);
      btnSubmit.disabled = !hasAnswer;
      btnSubmit.style.opacity = hasAnswer ? "1" : "0.5";
    }
  }

  function prevQuestion() {
    clearAdvanceTimer();
    if (currentQ > 0) {
      currentQ--;
      renderQuestion(currentQ);
    }
  }

  function nextQuestion() {
    clearAdvanceTimer();
    if (!answers[currentQ]) return;
    if (currentQ < QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion(currentQ);
    }
  }

  // ---------- 提交与结果 ----------

  function submitQuiz() {
    clearAdvanceTimer();
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      const first = answers.findIndex(a => a === null);
      currentQ = first;
      renderQuestion(first);
      const toastMsg = t("unansweredToast");
      showToast(toastMsg ? toastMsg.replace("{count}", unanswered) : `还有 ${unanswered} 道题没有作答哦 👀`);
      return;
    }

    result = MFTIEngine.calculate(answers, {
      questions: QUESTIONS,
      personalities: PERSONALITIES,
      questionSetVersion: typeof QUESTION_SET_VERSION !== "undefined" ? QUESTION_SET_VERSION : "unknown"
    });
    resultSaved = false;

    renderResult(result);
    showPage("page-result");
    focusResult();
  }

  function focusResult() {
    const codeEl = document.getElementById("result-code");
    if (!codeEl) return;
    codeEl.setAttribute("tabindex", "-1");
    codeEl.focus({ preventScroll: true });
  }

  function renderResult(res) {
    if (!res || !res.personality) return;
    const p = res.personality;
    const norm = res.normalized;
    const names = getPersonalityNames(p);

    const avatarEl = document.getElementById("result-avatar");
    if (avatarEl) {
      const avatarUrl = AVATARS[res.typeCode] || "";
      avatarEl.innerHTML = "";
      if (avatarUrl) {
        const img = document.createElement("img");
        img.src = avatarUrl;
        img.alt = names.primary;
        img.loading = "lazy";
        img.style.cssText = "width:100%;height:100%;border-radius:50%;object-fit:cover;";
        avatarEl.appendChild(img);
      }
      avatarEl.style.background = "white";
    }

    const codeEl = document.getElementById("result-code");
    if (codeEl) {
      codeEl.textContent = p.code;
      codeEl.style.color = p.color;
    }
    const nameZh = document.getElementById("result-name-zh");
    if (nameZh) nameZh.textContent = names.primary;
    const nameEn = document.getElementById("result-name-en");
    if (nameEn) nameEn.textContent = names.secondary;
    const subtitle = document.getElementById("result-subtitle");
    if (subtitle) subtitle.textContent = getPersonalityText(p, "subtitle");

    const tagsEl = document.getElementById("result-tags");
    if (tagsEl) {
      tagsEl.innerHTML = "";
      getPersonalityTags(p).forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }

    const descEl = document.getElementById("result-desc");
    if (descEl) descEl.innerHTML = formatDesc(getPersonalityText(p, "description"));

    const descTitle = document.querySelector(".result-desc-card h3");
    if (descTitle) descTitle.textContent = t("portraitTitle");

    const dimTitle = document.querySelector(".dimensions-card h3");
    if (dimTitle) dimTitle.textContent = t("dimensionsTitle");
    updateText(".dimensions-hint", "dimensionsHint");

    const similarTitle = document.querySelector(".similar-section h3");
    if (similarTitle) similarTitle.textContent = t("similarTitle");

    renderResultNote(res);
    renderDimensions(norm);
    renderSimilar(res.topMatches, res.typeCode);
    updateSaveButton();
  }

  function renderResultNote(res) {
    const noteEl = document.getElementById("result-note");
    if (!noteEl) return;

    const parts = [];
    if (res.isBalanced) {
      const text = t("balancedNote");
      if (text) parts.push(text);
    } else if (res.isBoundary) {
      const text = t("boundaryNote");
      if (text) parts.push(text);
    }
    if (parts.length) {
      noteEl.textContent = parts.join(" ");
      noteEl.classList.remove("hidden");
    } else {
      noteEl.textContent = "";
      noteEl.classList.add("hidden");
    }
  }

  function formatDesc(text) {
    if (!text) return "";
    return text
      .trim()
      .split("\n")
      .map(line => {
        line = line.trim();
        if (!line) return "";
        line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        return `<p>${line}</p>`;
      })
      .filter(l => l)
      .join("");
  }

  function getTranslatedDimLabel(key, score) {
    const labelKey = score > 65 ? "high" : score < 35 ? "low" : "balanced";
    const translated = t(`dimensions.${key}.${labelKey}`);
    return translated || MFTIEngine.getDimLabel(key, score);
  }

  function renderDimensions(norm) {
    const container = document.getElementById("dimensions-list");
    if (!container) return;
    container.innerHTML = "";

    Object.entries(DIMENSIONS).forEach(([key]) => {
      const rawValue = norm[key];
      const score = Number.isFinite(Number(rawValue)) ? Math.round(Number(rawValue)) : 50;
      const label = getTranslatedDimLabel(key, score);
      const dimName = t(`dimensions.${key}.name`) || key;
      const row = document.createElement("div");
      row.className = "dimension-row";

      const labelEl = document.createElement("span");
      labelEl.className = "dim-label";
      labelEl.textContent = dimName;

      const barWrap = document.createElement("div");
      barWrap.className = "dim-bar-wrap";
      const barFill = document.createElement("div");
      barFill.className = "dim-bar-fill";
      barFill.style.width = "0%";
      barFill.dataset.target = String(score);
      barWrap.appendChild(barFill);

      const scoreEl = document.createElement("span");
      scoreEl.className = "dim-score";
      scoreEl.textContent = String(score);

      const descEl = document.createElement("span");
      descEl.className = "dim-desc";
      descEl.textContent = label;

      row.appendChild(labelEl);
      row.appendChild(barWrap);
      row.appendChild(scoreEl);
      row.appendChild(descEl);
      container.appendChild(row);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.querySelectorAll(".dim-bar-fill").forEach(bar => {
          bar.style.width = bar.dataset.target + "%";
        });
      });
    });
  }

  function renderSimilar(topMatches, currentCode) {
    const container = document.getElementById("similar-list");
    if (!container) return;
    container.innerHTML = "";

    (topMatches || []).forEach(match => {
      const typeCode = match.typeCode || match[0];
      if (!typeCode || typeCode === currentCode) return;
      const p = PERSONALITIES[typeCode];
      if (!p) return;

      const names = getPersonalityNames(p);
      const div = document.createElement("div");
      div.className = "similar-item";

      const emoji = document.createElement("span");
      emoji.className = "similar-emoji";
      emoji.textContent = p.emoji;

      const info = document.createElement("div");
      info.className = "similar-info";
      const name = document.createElement("span");
      name.className = "similar-name";
      name.textContent = names.primary;
      const en = document.createElement("span");
      en.className = "similar-en";
      en.textContent = names.secondary;
      info.appendChild(name);
      info.appendChild(en);

      div.appendChild(emoji);
      div.appendChild(info);
      container.appendChild(div);
    });
  }

  // ---------- Toast ----------

  function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.display = "none"; }, 3200);
  }

  // ---------- 保存 / 删除 ----------

  function buildSavedPayload(res) {
    return {
      schemaVersion: CURRENT_SCHEMA,
      scoringVersion: res.scoringVersion,
      questionSetVersion: res.questionSetVersion,
      typeCode: res.typeCode,
      normalized: res.normalized,
      savedAt: new Date().toISOString(),
      lang: currentLang
    };
  }

  function saveResult() {
    if (!result) return;
    const ok = safeSetStorage(STORAGE_RESULT_KEY, JSON.stringify(buildSavedPayload(result)));
    if (ok) resultSaved = true;
    showToast(ok ? (t("savedToast") || "已保存到本机") : (t("saveFailedToast") || "无法保存，浏览器存储不可用"));
    updateLandingButtons();
    updateSaveButton();
  }

  function deleteSavedResult() {
    const ok = safeRemoveStorage(STORAGE_RESULT_KEY);
    if (ok) resultSaved = false;
    showToast(ok ? (t("deletedToast") || "已删除本机保存的结果") : (t("deleteFailedToast") || "删除失败"));
    updateLandingButtons();
    updateSaveButton();
  }

  function updateSaveButton() {
    const saveBtn = document.getElementById("btn-save");
    if (!saveBtn) return;
    const isSaved = Boolean(result && resultSaved);
    saveBtn.disabled = isSaved;
    saveBtn.textContent = isSaved ? (t("savedBtn") || "已保存到本机") : (t("saveBtn") || "保存到本机");
  }

  function hasAnySavedData() {
    return Boolean(safeGetStorage(STORAGE_RESULT_KEY, null));
  }

  function updateLandingButtons() {
    const resultBtn = document.getElementById("btn-show-result");
    if (resultBtn) resultBtn.classList.toggle("hidden", !hasAnySavedData());

    const deleteBtn = document.getElementById("btn-delete-result");
    if (deleteBtn) deleteBtn.classList.toggle("hidden", !hasAnySavedData());
  }

  // ---------- 重新测试 / 返回 ----------

  function retake() {
    clearAdvanceTimer();
    currentQ = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    result = null;
    resultSaved = false;
    showPage("page-landing");
    resumeSakuraAnimation();
    updateLandingButtons();
  }

  function backToLanding() {
    clearAdvanceTimer();
    showPage("page-landing");
    resumeSakuraAnimation();
    updateLandingButtons();
  }

  // ---------- 分享 ----------

  function buildShareText() {
    if (!result) return "";
    const p = result.personality;
    const name = getPersonalityText(p, "name");
    const subtitle = getPersonalityText(p, "subtitle");
    return (t("shareText") || "")
      .replace("{name}", name)
      .replace("{code}", p.code)
      .replace("{emoji}", p.emoji)
      .replace("{subtitle}", subtitle);
  }

  function shareResult() {
    const text = buildShareText();
    if (!text) return;

    if (!navigator.share) {
      showToast(t("shareUnavailable") || "当前浏览器不支持系统分享，可以点击「复制结果」");
      return;
    }

    const shareTitle = t("shareTitle") || (currentLang === "en" ? "MFTI Result" : "MFTI 测试结果");
    try {
      const sharePromise = navigator.share({ title: shareTitle, text });
      if (sharePromise && typeof sharePromise.catch === "function") {
        sharePromise.catch(error => {
          // 用户主动取消：不复制、不打扰
          if (error && error.name === "AbortError") return;
          showToast(t("shareFailed") || "分享没有完成，可以点击「复制结果」手动分享");
        });
      }
    } catch (error) {
      showToast(t("shareFailed") || "分享没有完成，可以点击「复制结果」手动分享");
    }
  }

  // 只有用户明确点击「复制结果」才写入剪贴板
  function copyResult() {
    const text = buildShareText();
    if (!text) return;
    copyText(text);
  }

  function copyText(text) {
    const successMsg = t("copiedToast") || "结果已复制到剪贴板 📋";
    const failMsg = t("copyFailedToast") || "复制失败，请手动选择文本";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg))
        .catch(() => fallbackCopy(text, successMsg, failMsg));
    } else {
      fallbackCopy(text, successMsg, failMsg);
    }
  }

  function fallbackCopy(text, successMsg, failMsg) {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(successful ? successMsg : failMsg);
    } catch (e) {
      console.warn("Failed to copy text:", e);
      showToast(failMsg);
    }
  }

  // ---------- 展示所有人格 ----------

  function showAllPersonalities() {
    showPage("page-all-personalities");
    renderAllPersonalities();
  }

  function renderAllPersonalities() {
    const grid = document.getElementById("personalities-grid");
    if (!grid) return;
    grid.innerHTML = "";

    Object.entries(PERSONALITIES).forEach(([code, p]) => {
      const card = document.createElement("div");
      card.className = "personality-card";

      const avatarUrl = AVATARS[code] || "";
      const names = getPersonalityNames(p);

      if (avatarUrl) {
        const img = document.createElement("img");
        img.src = avatarUrl;
        img.alt = names.primary;
        img.loading = "lazy";
        img.className = "personality-avatar";
        card.appendChild(img);
      }

      const codeEl = document.createElement("div");
      codeEl.className = "personality-code";
      codeEl.style.color = p.color;
      codeEl.textContent = p.code;
      card.appendChild(codeEl);

      const nameZh = document.createElement("div");
      nameZh.className = "personality-name-zh";
      nameZh.textContent = names.primary;
      card.appendChild(nameZh);

      const nameEn = document.createElement("div");
      nameEn.className = "personality-name-en";
      nameEn.textContent = names.secondary;
      card.appendChild(nameEn);

      const subtitle = document.createElement("div");
      subtitle.className = "personality-subtitle";
      subtitle.textContent = getPersonalityText(p, "subtitle");
      card.appendChild(subtitle);

      const tags = document.createElement("div");
      tags.className = "personality-tags";
      getPersonalityTags(p).forEach(tag => {
        const span = document.createElement("span");
        span.className = "personality-tag";
        span.textContent = tag;
        tags.appendChild(span);
      });
      card.appendChild(tags);

      grid.appendChild(card);
    });
  }

  // ---------- 首页 ----------

  function showLanding() {
    showPage("page-landing");
    updateLandingButtons();
    restartSakuraAnimation();
  }

  function showSavedResult() {
    const saved = safeGetStorage(STORAGE_RESULT_KEY, null);
    if (!saved) return;

    let parsed;
    try {
      parsed = JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse saved result:", e);
      showToast(t("brokenSavedToast") || "本机保存的结果已损坏，可以删除后重新测试");
      return;
    }

    if (!parsed || parsed.schemaVersion !== CURRENT_SCHEMA) {
      showToast(t("legacySavedToast") || "检测到旧版结果，新版算法已不适用，请删除后重新测试");
      return;
    }

    const personality = parsed.typeCode ? PERSONALITIES[parsed.typeCode] : null;
    const hasAllDimensions = parsed.normalized
      && typeof parsed.normalized === "object"
      && MFTIEngine.DIM_KEYS.every(key => Number.isFinite(Number(parsed.normalized[key])));
    if (!personality || !hasAllDimensions) {
      showToast(t("brokenSavedToast") || "本机保存的结果已损坏，可以删除后重新测试");
      return;
    }

    // 用保存的画像分数重建展示数据；不把旧版或损坏数据直接当新版结果。
    const ranked = MFTIEngine.rankPersonalities(parsed.normalized, PERSONALITIES)
      .filter(item => item.typeCode !== parsed.typeCode)
      .slice(0, 3)
      .map(item => ({ typeCode: item.typeCode, distance: Math.round(item.distance) }));

    result = {
      schemaVersion: CURRENT_SCHEMA,
      scoringVersion: parsed.scoringVersion || MFTIEngine.SCORING_VERSION,
      questionSetVersion: parsed.questionSetVersion || "unknown",
      typeCode: parsed.typeCode,
      personality,
      normalized: parsed.normalized,
      topMatches: ranked,
      isBalanced: MFTIEngine.isBalanced(parsed.normalized),
      isBoundary: false
    };
    resultSaved = true;

    renderResult(result);
    showPage("page-result");
    focusResult();
  }

  function getCurrentLanguage() {
    return currentLang;
  }

  // ---------- 公开 API ----------

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
    copyResult,
    saveResult,
    deleteSavedResult,
    showAllPersonalities,
    showLanding,
    showSavedResult,
    toggleLanguage,
    setLanguage,
    getCurrentLanguage
  };
})();

// ---------- 樱花粒子 ----------

let sakuraPetals = [];
let sakuraAnimationPaused = false;

function prefersReducedMotion() {
  return typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createSakuraPetals() {
  const container = document.getElementById("sakura-petals");
  if (!container) return;

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

  const petalCount = prefersReducedMotion() ? 0 : 18;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "sakura-petal";

    const left = Math.random() * 100;
    const size = 6 + Math.random() * 16;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * 18;
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

function pauseSakuraAnimation() {
  if (sakuraAnimationPaused) return;
  sakuraPetals.forEach(petal => { petal.style.animationPlayState = "paused"; });
  const logo = document.querySelector(".landing-logo");
  if (logo) logo.style.animationPlayState = "paused";
  document.querySelectorAll(".petal-1, .petal-veins, .stamen").forEach(el => {
    el.style.animationPlayState = "paused";
  });
  sakuraAnimationPaused = true;
}

function resumeSakuraAnimation() {
  if (!sakuraAnimationPaused) return;
  sakuraPetals.forEach(petal => { petal.style.animationPlayState = "running"; });
  const logo = document.querySelector(".landing-logo");
  if (logo) logo.style.animationPlayState = "running";
  document.querySelectorAll(".petal-1, .petal-veins, .stamen").forEach(el => {
    el.style.animationPlayState = "running";
  });
  sakuraAnimationPaused = false;
}

function restartSakuraAnimation() {
  const logo = document.querySelector(".landing-logo");
  if (!logo) return;
  const parent = logo.parentNode;
  const nextSibling = logo.nextSibling;
  parent.removeChild(logo);
  parent.insertBefore(logo, nextSibling);
}

// ---------- 初始化 ----------

document.addEventListener("DOMContentLoaded", () => {
  App.showLanding();
  createSakuraPetals();

  setTimeout(() => {
    App.setLanguage(App.getCurrentLanguage ? App.getCurrentLanguage() : "zh");

    const langBtn = document.getElementById("lang-switch");
    if (langBtn) langBtn.addEventListener("click", () => App.toggleLanguage());

    const modal = document.getElementById("modal-disclaimer");
    if (modal) modal.addEventListener("keydown", (event) => {
      const activeModal = document.getElementById("modal-disclaimer");
      if (!activeModal || activeModal.classList.contains("hidden")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        App.hideDisclaimer();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(activeModal.querySelectorAll("button:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }, 50);
});
