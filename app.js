/* ================================================================
   HifzFlow — Quran Memorization Revision Engine (Phase 1 Expansion)
   Surahs 63–114 Scope, 9-Point Scale, Dual-Track SM-2, & Analytics
   ================================================================ */

/* ============ 3-COLOR RATING SCALE CONFIG ============ */
export const RATING_SCALE = [
  { level: 1, label: "Weak", icon: "🔴", pct: 30, iv: 1, class: "lvl-weak", color: "#e05656" },
  { level: 2, label: "Medium", icon: "🟡", pct: 65, iv: 4, class: "lvl-medium", color: "#eab308" },
  { level: 3, label: "Strong", icon: "🟢", pct: 100, iv: 14, class: "lvl-strong", color: "#167566" }
];

export function cleanArName(name) {
  if (!name) return "";
  return name.replace(/^سُورَةُ\s*/g, '').replace(/^سورة\s*/g, '').trim();
}

export function removeArabicDiacritics(text) {
  if (!text) return "";
  return text.replace(/[\u064B-\u0653\u0670\u0654\u0655]/g, "").trim();
}

/**
 * Build a proportional CSS gradient for a surah block based on
 * the weak / medium / strong ayah counts.
 * Returns { background, border, shadow } CSS value strings.
 */
export function buildProportionalGradient(weakCount, medCount, strongCount, isDark = true) {
  const total = weakCount + medCount + strongCount;
  if (total === 0) return null; // untouched

  const wPct = (weakCount / total) * 100;
  const mPct = (medCount / total) * 100;
  const sPct = (strongCount / total) * 100;

  // Color definitions (dark mode / light mode)
  const colors = isDark ? {
    weak:   { r: 255, g: 60,  b: 60  },
    medium: { r: 255, g: 255, b: 0   },
    strong: { r: 0,   g: 200, b: 0   }
  } : {
    weak:   { r: 255, g: 60,  b: 60  },
    medium: { r: 255, g: 255, b: 0   },
    strong: { r: 0,   g: 200, b: 0   }
  };

  const opacity = isDark ? 0.45 : 0.25;

  // Build gradient stops for smooth blending
  const activeStops = [];
  let pos = 0;

  if (wPct > 0) {
    const c = colors.weak;
    const center = pos + wPct / 2;
    activeStops.push({ color: `rgba(${c.r},${c.g},${c.b},${opacity})`, pct: center });
    pos += wPct;
  }
  if (mPct > 0) {
    const c = colors.medium;
    const center = pos + mPct / 2;
    activeStops.push({ color: `rgba(${c.r},${c.g},${c.b},${opacity})`, pct: center });
    pos += mPct;
  }
  if (sPct > 0) {
    const c = colors.strong;
    const center = pos + sPct / 2;
    activeStops.push({ color: `rgba(${c.r},${c.g},${c.b},${opacity})`, pct: center });
    pos += sPct;
  }

  const stops = [];
  if (activeStops.length > 0) {
    stops.push(`${activeStops[0].color} 0%`);
    for (const stop of activeStops) {
      stops.push(`${stop.color} ${stop.pct}%`);
    }
    stops.push(`${activeStops[activeStops.length - 1].color} 100%`);
  }

  const background = `linear-gradient(to bottom, ${stops.join(', ')})`;

  // Border & shadow: blend the dominant color with proportional weighting
  const blendR = Math.round((weakCount * colors.weak.r + medCount * colors.medium.r + strongCount * colors.strong.r) / total);
  const blendG = Math.round((weakCount * colors.weak.g + medCount * colors.medium.g + strongCount * colors.strong.g) / total);
  const blendB = Math.round((weakCount * colors.weak.b + medCount * colors.medium.b + strongCount * colors.strong.b) / total);

  const border = `1.5px solid rgba(${blendR},${blendG},${blendB},${isDark ? 0.55 : 0.45})`;
  const shadow = `0 4px 16px rgba(${blendR},${blendG},${blendB},${isDark ? 0.25 : 0.15})`;

  return { background, border, shadow };
}

export function cleanEnName(name) {
  if (!name) return "";
  let s = name.replace(/^surah\s+/i, '').trim();
  s = s.replace(/^(Al|An|At|As|Az|Ad|Ar|Ash|Ath|Aa|Al-)\b[- ]?/i, '');
  s = s.replace(/^(Al|An|At|As|Az|Ad|Ar|Ash|Ath)-/i, '');
  return s.trim();
}

export function ratingToStrength(lvl) {
  const item = RATING_SCALE.find(r => r.level === lvl);
  return item ? item.pct : 30;
}

export function strengthToRating(pct, assignedLvl = null) {
  if (assignedLvl) {
    if ([1, 2, 3].includes(assignedLvl)) return assignedLvl;
    if (assignedLvl >= 7) return 3; // Legacy 9-point strong -> Lvl 3 (Strong 🟢)
    if (assignedLvl >= 4) return 2; // Legacy 9-point medium -> Lvl 2 (Medium 🟡)
    if (assignedLvl >= 1) return 1; // Legacy 9-point weak -> Lvl 1 (Weak 🔴)
  }
  if (pct === null) return 1;
  if (pct < 50) return 1;
  if (pct < 80) return 2;
  return 3;
}

/* ============ WISDOM DATA ============ */
export const WISDOM = [
  { tag: "On Patience", t: "\"O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.\"", s: "Qur'an 2:153" },
  { tag: "On Steadiness", t: "\"The most beloved deeds to Allah are the most consistent, even if small.\"", s: "Sahih al-Bukhari 6464" },
  { tag: "On the Qur'an", t: "\"The example of the one who recites the Qur'an is that of a citron — its fragrance is sweet and its taste is sweet.\"", s: "Sahih al-Bukhari 7560" },
  { tag: "On Review", t: "\"Keep revisiting the Qur'an, for it slips away from memory more easily than camels escape their ropes.\"", s: "Sahih al-Bukhari 5033" },
  { tag: "On Ease", t: "\"Allah intends for you ease and does not intend for you hardship.\"", s: "Qur'an 2:185" },
  { tag: "On Knowledge", t: "\"Read! And your Lord is the Most Generous. Who has taught by the pen.\"", s: "Qur'an 96:3-5" },
  { tag: "On Progress", t: "\"You returned to an ayah that was difficult. That is progress.\"", s: "Hifz Mindset" }
];

/* ============ DATASET & STATE MANAGEMENT ============ */
export let QURAN_DATA = {};
const KEY = "hifzflow-v1.1";

let S = {
  memorized: {}, // surah_num -> boolean or ayah_map
  stats: {},     // "surah:ayah" -> { a: { lvl, iv, last }, m: { lvl, iv, last } }
  logs: [],      // recitation logs: [{ date, who, notes }]
  streak: 0,
  lastDay: null,
  today: { day: "", done: 0 },
  theme: "dark",
  zoom: 1,
  onboarded: false,
  dailyGoal: 10,
  cycleDays: 30
};

// Async Dataset Loader
export async function loadQuranDataset() {
  try {
    const res = await fetch('./data/quran_63_114.json?v=1.5.1');
    if (res.ok) {
      QURAN_DATA = await res.json();
      console.log("Quran Dataset (Surahs 63-114) loaded successfully with keys:", Object.keys(QURAN_DATA).length);
    } else {
      console.error("Failed to load quran_63_114.json, HTTP status:", res.status);
    }
  } catch (err) {
    console.warn("Falling back to local cache or basic dataset", err);
  }
}

export function applyArabicFont(fontFamily) {
  if (fontFamily) {
    document.documentElement.style.setProperty('--font-arabic', fontFamily);
  }
}

// Load state from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      S = { ...S, ...parsed };
      if (!S.today) S.today = { day: "", done: 0 };
      if (!S.dailyGoal) S.dailyGoal = 10;
      if (!S.cycleDays) S.cycleDays = 30;
      if (!S.arabicFont) S.arabicFont = "'Scheherazade New', serif";
      if (!S.logs) S.logs = [];
      if (!S.reminders) S.reminders = { enabled: false, time: "08:00", lastFired: null };
    }
    if (!S.arabicFont) S.arabicFont = "'Scheherazade New', serif";
    applyArabicFont(S.arabicFont);
  } catch (e) {
    console.error("Failed to load local storage state", e);
  }
}

let syncDebounceTimer = null;
export function syncWithCloudflare() {
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(async () => {
    try {
      const chipBadge = document.getElementById('chipSyncStatus');
      if (chipBadge) chipBadge.textContent = 'Syncing...';

      const payload = {
        userId: S.user?.id || 'guest',
        data: {
          memorized: S.memorized,
          stats: S.stats,
          logs: S.logs,
          streak: S.streak,
          settings: { dailyGoal: S.dailyGoal, cycleDays: S.cycleDays }
        }
      };

      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (chipBadge) {
          chipBadge.textContent = S.user?.email ? 'Synced 🟢' : 'Local 🟡';
          chipBadge.className = `sync-badge ${S.user?.email ? 'synced' : ''}`;
        }
      }
    } catch (err) {
      console.warn("Cloudflare background sync offline/failed", err);
    }
  }, 1200);
}

export function saveState() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
    syncWithCloudflare();
  } catch (e) {
    console.error("Failed to save state to local storage", e);
  }
}

const idOf = (sn, ai) => `${sn}:${ai}`;

// Get stats block
export function getStatBlock(id, track) {
  if (!S.stats[id]) S.stats[id] = { a: null, m: null };
  if (!S.stats[id][track]) {
    S.stats[id][track] = { lvl: 1, iv: 0, last: 0 };
  }
  return S.stats[id][track];
}

// Retention Curve Calculation (0 to 100%)
export function calculateStrength(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return null;
  const elapsedDays = (Date.now() - st.last) / 86400000;
  const basePct = ratingToStrength(st.lvl);
  const halfLife = Math.max(st.iv, 0.1);
  return Math.max(0, Math.round(basePct * Math.exp(-elapsedDays / halfLife)));
}

export function getCombinedStrength(id) {
  const parts = id.split(':');
  const sNum = parseInt(parts[0]);
  const a = calculateStrength(id, 'a');
  const m = calculateStrength(id, 'm');
  if (a === null && m === null) {
    if (isSurahMemorized(sNum)) return 100;
    return null;
  }
  const aVal = a ?? 100;
  const mVal = m ?? 100;
  return Math.round((aVal + mVal) / 2);
}

// 9-Point Scale Rating Update
export function setAyahRating(id, track, ratingLevel) {
  const st = getStatBlock(id, track);
  const scaleInfo = RATING_SCALE.find(r => r.level === ratingLevel) || RATING_SCALE[0];
  
  st.lvl = ratingLevel;
  st.iv = scaleInfo.iv;
  st.last = Date.now();
  saveState();
}

// Check if Ayah is due or fading
export function isAyahDue(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return true;
  const strVal = calculateStrength(id, track);
  return strVal === null || strVal < 70;
}

// Get Flat list of all ayahs from loaded Quran dataset
export function getFlatAyahs() {
  const list = [];
  for (const sNum in QURAN_DATA) {
    const s = QURAN_DATA[sNum];
    if (!s || !s.ayahs) continue;
    s.ayahs.forEach((ay, idx) => {
      list.push({
        s,
        id: idOf(s.n, idx),
        ai: idx,
        ar: ay.ar,
        en: ay.en
      });
    });
  }
  return list;
}

export function getMemorizedAyahs() {
  return getFlatAyahs().filter(x => isSurahMemorized(x.s.n));
}

export function isSurahMemorized(sNum) {
  return !!S.memorized[sNum];
}

export function getSurahRollup(sNum) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah || !surah.ayahs) return { status: "Not Started", memCount: 0, total: 0, pct: 0, avgStr: 0, strengthClass: "", weakCount: 0, medCount: 0, strongCount: 0 };
  
  const total = surah.ayahs.length;
  let memCount = 0;
  let sumCorrectWords = 0;
  let sumAyahWordCount = 0;
  let testedCount = 0;
  let weakCount = 0;
  let medCount = 0;
  let strongCount = 0;
  
  surah.ayahs.forEach((ay, idx) => {
    const id = idOf(sNum, idx);
    const st = S.stats[id]?.a;
    const arStr = calculateStrength(id, 'a');
    
    if (arStr !== null || (st && st.lvl)) {
      memCount++;
      testedCount++;
      
      const lvl = st?.lvl || (arStr >= 70 ? 3 : (arStr >= 40 ? 2 : 1));
      const ayahWordCount = ay.ar ? ay.ar.trim().split(/\s+/).filter(Boolean).length : 1;
      const mistakes = lvl === 3 ? 0 : (lvl === 2 ? 1 : 2);
      const correctWords = Math.max(0, ayahWordCount - mistakes);
      
      sumCorrectWords += correctWords;
      sumAyahWordCount += ayahWordCount;
      
      if (lvl === 3) strongCount++;
      else if (lvl === 2) medCount++;
      else weakCount++;
    }
  });
  
  const isKnown = isSurahMemorized(sNum);
  const status = !isKnown && memCount === 0 ? "Not Started" : (memCount === total || isKnown ? "Complete" : "Partial");
  const avgStr = sumAyahWordCount > 0 ? Math.round((sumCorrectWords / sumAyahWordCount) * 100) : (isKnown ? 100 : 0);
  const pct = isKnown ? 100 : Math.round((memCount / total) * 100);
  
  // If surah is memorized but no individual ayah stats, treat all as strong
  if (isKnown && testedCount === 0) {
    strongCount = total;
  }
  
  let strengthClass = "";
  if (isKnown) {
    if (avgStr >= 80) strengthClass = "card-strong cell-strong";
    else if (avgStr >= 50) strengthClass = "card-medium cell-medium";
    else strengthClass = "card-weak cell-weak";
  }
  
  return { status, memCount: isKnown ? total : memCount, total, pct, avgStr, strengthClass, weakCount, medCount, strongCount };
}

// Bulk mark entire surah as memorized
export function bulkMarkSurahMemorized(sNum, level = 3) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah || !surah.ayahs) return;
  
  S.memorized[sNum] = true;
  surah.ayahs.forEach((_, idx) => {
    const id = idOf(sNum, idx);
    setAyahRating(id, 'a', level);
    setAyahRating(id, 'm', level);
  });
  saveState();
}

/* ============ PREFERENCES APPLIER ============ */
function applyPreferences() {
  document.documentElement.dataset.theme = S.theme;
  document.documentElement.style.setProperty('--fz', S.zoom);
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.textContent = S.theme === 'dark' ? '☾' : '☀';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', S.theme === 'dark' ? '#070d0b' : '#f4f6f1');
  }
  document.querySelectorAll('#zoomer button').forEach(b => {
    b.classList.toggle('on', parseFloat(b.dataset.z) === S.zoom);
  });
  
  const verDiv = document.getElementById('appVersion');
  if (verDiv) {
    verDiv.textContent = `v1.6.9 (updated 2026-07-24 19:39)`;  
  }
  const settVerBadge = document.getElementById('settingsVerBadge');
  if (settVerBadge) {
    settVerBadge.textContent = `v1.6.9`;
  }
}

/* ============ STREAK MANAGEMENT ============ */
const TODAY_STRING = new Date().toDateString();
function verifyDailyStreak() {
  if (S.today.day !== TODAY_STRING) {
    S.today = { day: TODAY_STRING, done: 0 };
  }
  const yesterdayString = new Date(Date.now() - 86400000).toDateString();
  if (S.lastDay !== TODAY_STRING) {
    if (S.lastDay === yesterdayString) {
      S.streak++;
    } else if (S.lastDay !== null) {
      S.streak = 1;
    } else {
      S.streak = 0;
    }
    S.lastDay = TODAY_STRING;
  }
  saveState();
}

/* ============ UI NAVIGATION (5 MAIN TABS) ============ */
export function go(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const currentView = document.getElementById(`v-${viewId}`);
  if (currentView) currentView.classList.add('active');
  
  document.querySelectorAll('nav .nav-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.v === viewId);
  });
  
  if (viewId === 'home') renderHome();
  if (viewId === 'revise') renderRevise();
  if (viewId === 'quran') renderQuran();
  if (viewId === 'history') renderHistory();
  if (viewId === 'settings') renderSettings();
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function toast(msg) {
  const toastBox = document.getElementById('toast');
  if (!toastBox) return;
  toastBox.textContent = msg;
  toastBox.classList.add('show');
  clearTimeout(toastBox._timer);
  toastBox._timer = setTimeout(() => {
    toastBox.classList.remove('show');
  }, 2200);
}

function getDaysAgo(st) {
  if (!st || !st.last) return 'never';
  const elapsedDays = (Date.now() - st.last) / 86400000;
  return elapsedDays < 0.1 ? 'today' : `${elapsedDays.toFixed(1)}d ago`;
}

function cellBg(v) {
  if (v === null) return '';
  if (v >= 80) return '#2fae72';
  if (v >= 55) return '#6fbf5a';
  if (v >= 35) return '#cfc64d';
  if (v >= 18) return '#e8a24d';
  return '#e05656';
}

/* ============ 1. RENDER HOME VIEW ============ */
function renderHome() {
  const dayIndex = new Date().getDate() % WISDOM.length;
  const wisdom = WISDOM[dayIndex];
  
  const tag = document.getElementById('wisTag');
  const text = document.getElementById('wisText');
  const src = document.getElementById('wisSrc');
  
  if (tag) tag.textContent = wisdom.tag;
  if (text) text.textContent = wisdom.t;
  if (src) src.textContent = wisdom.s;
  
  const memorized = getMemorizedAyahs();
  const totalScopeAyahs = getFlatAyahs().length;
  const coveragePct = totalScopeAyahs ? Math.round((memorized.length / totalScopeAyahs) * 100) : 0;
  
  let weakCount = 0;
  let dueArabic = 0;
  let dueMeaning = 0;
  
  memorized.forEach(ayah => {
    const combinedStr = getCombinedStrength(ayah.id);
    if (combinedStr !== null && combinedStr < 40) weakCount++;
    if (isAyahDue(ayah.id, 'a')) dueArabic++;
    if (isAyahDue(ayah.id, 'm')) dueMeaning++;
  });
  
  const streakBox = document.getElementById('stStreak');
  const strongBox = document.getElementById('stStrong');
  const weakBox = document.getElementById('stWeak');
  
  if (streakBox) streakBox.textContent = `${S.streak} 🔥`;
  if (strongBox) strongBox.textContent = `${coveragePct}%`;
  if (weakBox) weakBox.textContent = weakCount;
  
  const doneCount = S.today.day === TODAY_STRING ? S.today.done : 0;
  const goalTarget = S.dailyGoal || 10;
  
  const ringTxt = document.getElementById('ringTxt');
  const ringFg = document.getElementById('ringFg');
  
  if (ringTxt) ringTxt.textContent = `${doneCount}/${goalTarget}`;
  if (ringFg) {
    const circum = 201;
    const offset = circum * (1 - Math.min(1, doneCount / goalTarget));
    ringFg.style.strokeDashoffset = offset;
  }
  
  const pillAr = document.getElementById('pillAr');
  const pillEn = document.getElementById('pillEn');
  if (pillAr) pillAr.textContent = `${dueArabic} Arabic due`;
  if (pillEn) pillEn.textContent = `${dueMeaning} meaning due`;
  
  // Render Surah Heatmap Grid (Surahs 63-114)
  const grid = document.getElementById('surahHeatmapGrid');
  if (grid) {
    const isDark = document.documentElement.dataset.theme !== 'light';
    let gridHtml = '';
    for (let sNum = 63; sNum <= 114; sNum++) {
      const surah = QURAN_DATA[sNum];
      if (!surah) continue;
      
      const rollup = getSurahRollup(sNum);
      const isKnown = S.memorized[sNum];
      const enNameClean = cleanEnName(surah.name);
      const arNameClean = cleanArName(surah.ar);
      const arNameNoVowels = removeArabicDiacritics(arNameClean);
      
      let inlineStyle = '';
      let cellClass = 'hm-cell';
      
      if (isKnown || rollup.memCount > 0) {
        const grad = buildProportionalGradient(rollup.weakCount, rollup.medCount, rollup.strongCount, isDark);
        if (grad) {
          inlineStyle = `background:${grad.background};border:${grad.border};box-shadow:${grad.shadow};`;
          cellClass = 'hm-cell hm-colored';
        }
      } else {
        cellClass = 'hm-cell untouched';
      }
      
      gridHtml += `
        <button class="${cellClass}" style="${inlineStyle}" onclick="openSurahDetail(${sNum})">
          <span class="hm-num">${sNum}</span>
          <span class="hm-ar">${arNameNoVowels}</span>
          <b class="hm-en">${enNameClean}</b>
          <span class="hm-count">${rollup.memCount}/${rollup.total}</span>
          <span class="tip">
            <span class="row"><b>Avg Strength:</b> <span>${rollup.avgStr}%</span></span>
            <span class="row"><b>🔴 Weak:</b> <span>${rollup.weakCount}</span></span>
            <span class="row"><b>🟡 Medium:</b> <span>${rollup.medCount}</span></span>
            <span class="row"><b>🟢 Strong:</b> <span>${rollup.strongCount}</span></span>
          </span>
        </button>
      `;
    }
    grid.innerHTML = gridHtml;
  }
}

export function toggleReviseGroup(sNum) {
  const el = document.getElementById(`revise-group-${sNum}`);
  if (el) {
    el.classList.toggle('expanded');
  }
}
window.toggleReviseGroup = toggleReviseGroup;

/* ============ 2. RENDER REVISE VIEW (Intelligent Queue) ============ */
function renderRevise() {
  const container = document.getElementById('revisionQueueList');
  if (!container) return;
  
  const memorized = getMemorizedAyahs();
  if (!memorized.length) {
    container.innerHTML = `
      <div class="empty">
        <span class="big">⚡</span>
        Your revision queue is empty.<br>Go to the <b>Quran</b> tab and mark Surahs you have memorized to build your queue.
      </div>
    `;
    return;
  }
  
  // Group all memorized ayahs by Surah
  const groupsMap = new Map();
  memorized.forEach(ayah => {
    const sNum = ayah.s.n;
    if (!groupsMap.has(sNum)) {
      groupsMap.set(sNum, {
        surah: ayah.s,
        items: []
      });
    }
    const combined = getCombinedStrength(ayah.id) ?? 0;
    groupsMap.get(sNum).items.push({
      ...ayah,
      combined,
      sa: calculateStrength(ayah.id, 'a'),
      sm: calculateStrength(ayah.id, 'm')
    });
  });
  
  const groups = [];
  groupsMap.forEach((grp) => {
    // Sort items within group weakest first
    grp.items.sort((a, b) => a.combined - b.combined);
    const avgGrpStr = Math.round(grp.items.reduce((acc, curr) => acc + curr.combined, 0) / grp.items.length);
    grp.avgGrpStr = avgGrpStr;
    // Do not show Surahs that are 90% - 100%
    if (avgGrpStr < 90) {
      groups.push(grp);
    }
  });
  
  // Show the weakest Surah first (ascending avgGrpStr)
  groups.sort((a, b) => a.avgGrpStr - b.avgGrpStr);
  
  if (!groups.length) {
    container.innerHTML = `
      <div class="empty" style="padding: 30px 20px;">
        <span class="big">🎉</span>
        <b style="font-size:1.1rem;color:var(--gold);">All Revision Goals Met!</b><br>
        <span style="font-size:0.85rem;color:var(--ink2);margin-top:6px;display:block;">All your memorized Surahs are currently at 90%+ strength. Keep up the excellent work!</span>
      </div>
    `;
    return;
  }
  
  const totalQueuedVerses = groups.reduce((acc, g) => acc + g.items.length, 0);
  
  let html = `
    <div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:0.75rem;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:0.08em;">
        ${groups.length} Surahs Needing Revision (${totalQueuedVerses} Verses)
      </span>
      <button class="cta" style="width:auto;padding:8px 16px;font-size:0.8rem;" onclick="startPracticeSession()">
        Revise All →
      </button>
    </div>
  `;
  
  groups.forEach((grp) => {
    const sNum = grp.surah.n;
    const surahAr = grp.surah.ar;
    const surahName = grp.surah.name;
    const grpCol = cellBg(grp.avgGrpStr);
    
    // Collapsed by default (no 'expanded' class)
    html += `
      <div class="revise-group-card" id="revise-group-${sNum}">
        <div class="group-header">
          <div class="gh-left" onclick="startSurahRevision(${sNum}); event.stopPropagation();" title="Tap name to revise this Surah">
            <span class="gh-ar">${cleanArName(surahAr)}</span>
            <div class="gh-info">
              <b class="gh-title">${cleanEnName(surahName)}</b>
              <span class="gh-sub">${grp.items.length} ${grp.items.length === 1 ? 'verse' : 'verses'} · Tap name to revise ⚡</span>
            </div>
          </div>
          <div class="gh-right" onclick="toggleReviseGroup(${sNum}); event.stopPropagation();" title="Tap triangle to expand/collapse">
            <span class="strength-dot" style="background:${grpCol}1c;color:${grpCol}">${grp.avgGrpStr}%</span>
            <span class="chevron-ic">▼</span>
          </div>
        </div>
        <div class="group-body">
          <div class="group-body-inner">
            ${grp.items.map(item => {
              const col = cellBg(item.combined);
              const ratingLvl = strengthToRating(item.combined);
              const scaleObj = RATING_SCALE.find(r => r.level === ratingLvl) || RATING_SCALE[0];
              
              return `
                <div class="due-item" onclick="openAyahSheet('${item.id}')">
                  <span class="strength-dot" style="background:${col}1c;color:${col}">${item.combined}%</span>
                  <span style="flex:1;min-width:0;">
                    <span class="ref">${cleanEnName(item.s.name)} · ${item.ai + 1}</span>
                    <span class="ar-line">${item.ar}</span>
                  </span>
                  <span class="why">
                    <span class="lvl-badge ${scaleObj.class}">${scaleObj.label}</span>
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

/* ============ 3. RENDER QURAN BROWSER VIEW ============ */
let activeQuranFilter = 'all';
let quranSearchQuery = '';

function renderQuran() {
  const container = document.getElementById('quranSurahList');
  if (!container) return;
  
  let html = '';
  
  for (let sNum = 63; sNum <= 114; sNum++) {
    const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
    if (!surah) continue;
    
    // Apply filters
    if (activeQuranFilter === 'juz28' && surah.juz !== 28) continue;
    if (activeQuranFilter === 'juz29' && surah.juz !== 29) continue;
    if (activeQuranFilter === 'juz30' && surah.juz !== 30) continue;
    if (activeQuranFilter === 'known' && !S.memorized[sNum]) continue;
    
    if (quranSearchQuery.trim() !== '') {
      const q = quranSearchQuery.toLowerCase();
      const matchNum = surah.n.toString() === q;
      const matchName = surah.name.toLowerCase().includes(q);
      const matchAr = surah.ar.includes(q);
      if (!matchNum && !matchName && !matchAr) continue;
    }
    
    const rollup = getSurahRollup(sNum);
    const isKnown = S.memorized[sNum];
    const enNameClean = cleanEnName(surah.name);
    const arNameClean = cleanArName(surah.ar);
    
    html += `
      <div class="surah-card ${isKnown ? rollup.strengthClass : ''}">
        <div class="surah-top">
          <span class="surah-num">
            <svg viewBox="0 0 40 40"><path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            ${surah.n}
          </span>
          <div class="surah-meta">
            <b>${enNameClean}</b>
            <span>${surah.en} · ${surah.ayahs.length} Ayahs · Juz ${surah.juz}</span>
          </div>
          <span class="surah-arname">${arNameClean}</span>
          <button class="know-toggle ${isKnown ? 'on' : ''}" onclick="toggleSurahMemorized(${surah.n})">
            ${isKnown ? '✓ Known' : 'I know this'}
          </button>
        </div>
        ${isKnown ? `
          <div class="prog-track">
            <div class="prog-fill" style="width:${rollup.pct}%"></div>
          </div>
          <div class="prog-labels">
            <span>Progress: ${rollup.memCount}/${rollup.total} ayahs</span>
            <span>Avg Strength: ${rollup.avgStr}%</span>
          </div>
        ` : ''}
        <div style="margin-top:10px;display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;" onclick="openSurahDetail(${surah.n})">
            Ayah List &amp; Ratings →
          </button>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html || `<div class="empty" style="margin-top:20px"><span class="big">🔍</span>No surahs found matching filter.</div>`;
}

export function toggleSurahMemorized(sNum) {
  if (S.memorized[sNum]) {
    delete S.memorized[sNum];
  } else {
    bulkMarkSurahMemorized(sNum, 3);
  }
  saveState();
  renderQuran();
  renderHome();
  toast(S.memorized[sNum] ? "Surah marked as memorized! ✦" : "Removed surah from memorized tracking");
}

/* ============ 4. RENDER HISTORY VIEW (Logs) ============ */
function renderHistory() {
  const container = document.getElementById('historyLogList');
  if (!container) return;
  
  if (!S.logs || S.logs.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <span class="big">📖</span>
        No recitation logs recorded yet.<br>Click <b>"Log a Recitation Session"</b> above to record who you recited to.
      </div>
    `;
    return;
  }
  
  container.innerHTML = S.logs.map(log => `
    <div class="log-item">
      <div>
        <span class="who">Recited to: ${log.who}</span>
        <div style="font-size:0.85rem;font-weight:700;margin-top:4px;color:var(--ink)">${log.notes}</div>
        <small style="font-size:0.68rem;color:var(--ink3)">${log.date}</small>
      </div>
    </div>
  `).join('');
}

/* ============ 5. RENDER INSIGHTS VIEW (Analytics) ============ */
function renderInsights() {
  const container = document.getElementById('insightsContent');
  if (!container) return;
  
  const memorized = getMemorizedAyahs();
  const totalScope = getFlatAyahs().length;
  const coveragePct = totalScope ? Math.round((memorized.length / totalScope) * 100) : 0;
  
  // Rating breakdown distribution
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  memorized.forEach(ayah => {
    const comb = getCombinedStrength(ayah.id);
    const r = strengthToRating(comb);
    dist[r]++;
  });
  
  container.innerHTML = `
    <div class="insight-card">
      <h3 style="font-size:0.95rem;font-weight:800;">MVP Range Coverage (Surahs 63–114)</h3>
      <div style="font-size:2rem;font-weight:800;color:var(--acc);margin:10px 0 4px;">${coveragePct}%</div>
      <p style="font-size:0.78rem;color:var(--ink2);line-height:1.5;">${memorized.length} of ${totalScope} verses tracked across Juz 28–30.</p>
    </div>
    
    <div class="insight-card">
      <h3 style="font-size:0.95rem;font-weight:800;">Strength Distribution (3 Colors)</h3>
      <div class="chart-bar-container">
        ${RATING_SCALE.map(r => {
          const cnt = dist[r.level] || 0;
          const barPct = memorized.length ? Math.round((cnt / memorized.length) * 100) : 0;
          return `
            <div class="chart-row">
              <span class="lbl" style="color:${r.color}">${r.icon} ${r.label}</span>
              <div class="track"><i style="width:${barPct}%;background:${r.color};"></i></div>
              <span style="width:30px;text-align:right;">${cnt}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ============ 6. RENDER SETTINGS VIEW ============ */
function renderSettings() {
  renderInsights();
  
  const goalSelect = document.getElementById('goalSelect');
  const cycleSelect = document.getElementById('cycleSelect');
  const fontSelect = document.getElementById('fontSelect');
  const remindersToggle = document.getElementById('remindersToggle');
  const reminderTimeInput = document.getElementById('reminderTimeInput');
  
  if (goalSelect) goalSelect.value = S.dailyGoal || 10;
  if (cycleSelect) cycleSelect.value = S.cycleDays || 30;
  if (fontSelect) fontSelect.value = S.arabicFont || "'Scheherazade New', serif";
  if (remindersToggle) remindersToggle.checked = !!S.reminders?.enabled;
  if (reminderTimeInput) reminderTimeInput.value = S.reminders?.time || "08:00";
}

/* ============ REMINDERS & NOTIFICATION ENGINE ============ */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    toast("Notifications not supported on this browser");
    return false;
  }
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  toast("Notifications blocked in browser settings");
  return false;
}

export function sendNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: 'hifz-reminder'
    });
  }
}

export async function sendTestReminder() {
  const granted = await requestNotificationPermission();
  if (granted) {
    sendNotification(
      "HifzFlow — Guard Your Memorization ✦",
      "Success! Your daily revision reminders are active. Keep up the strong progress!"
    );
    toast("Test notification sent! 🔔");
  }
}
window.sendTestReminder = sendTestReminder;

export function checkReminderAlarms() {
  if (!S.reminders?.enabled) return;
  
  const now = new Date();
  const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  if (currentHM === S.reminders.time && S.reminders.lastFired !== TODAY_STRING) {
    S.reminders.lastFired = TODAY_STRING;
    saveState();
    
    const memorized = getMemorizedAyahs();
    let weakCount = 0;
    memorized.forEach(ayah => {
      const comb = getCombinedStrength(ayah.id);
      if (comb !== null && comb < 40) weakCount++;
    });
    
    sendNotification(
      "Daily Hifz Revision Time ✦",
      weakCount > 0 
        ? `You have ${weakCount} weak verses ready for review. Tap to start your quick session!`
        : `Time for your daily hifz review — keep your memorization strong!`
    );
  }
}

/* ============ AYAH RATING DETAIL DIALOG & INTERACTION ============ */
export function closeSurahDetail() {
  saveState();
  renderHome();
  renderQuran();
  renderRevise();
  const dlg = document.getElementById('dlgAyahDetail');
  if (dlg) {
    try {
      if (dlg.open) dlg.close();
    } catch (e) {
      dlg.removeAttribute('open');
      dlg.style.display = 'none';
    }
  }
}
window.closeSurahDetail = closeSurahDetail;

export function openSurahDetail(sNum, scrollToIndex = null) {
  const surah = QURAN_DATA[sNum];
  if (!surah) return;
  
  const content = document.getElementById('ayahSheetContent');
  if (!content) return;
  
  const arClean = cleanArName(surah.ar);
  const enClean = cleanEnName(surah.name);

  content.innerHTML = `
    <div class="grab"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <button class="btn-secondary" style="padding:8px 16px;font-size:0.82rem;font-weight:800;display:flex;align-items:center;gap:6px;cursor:pointer;border-radius:8px;" onclick="closeSurahDetail()">
        ← Back to Previous Screen
      </button>
      <button class="close-top" style="position:static;font-size:1.2rem;padding:6px 12px;cursor:pointer;" onclick="closeSurahDetail()">✕</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
      <span class="ref">${enClean} · ${surah.n}</span>
      <button class="know-toggle ${S.memorized[sNum] ? 'on' : ''}" onclick="toggleSurahMemorized(${surah.n}); openSurahDetail(${surah.n});">
        ${S.memorized[sNum] ? '✓ Known' : 'I know this Surah'}
      </button>
    </div>
    <h2 style="font-size:1.35rem;font-weight:800;margin-top:8px;display:flex;align-items:center;gap:10px;">
      <span>${enClean}</span>
      <span class="ar" style="font-family:var(--font-arabic);color:var(--gold);">${arClean}</span>
    </h2>
    <p style="font-size:0.78rem;color:var(--ink2);margin-bottom:14px;">${surah.en} · ${surah.ayahs.length} Ayahs · Juz ${surah.juz}</p>

    <div style="margin-bottom:12px;padding:8px 12px;background:var(--bg2);border-radius:8px;font-size:0.72rem;color:var(--ink2);display:flex;align-items:center;justify-content:space-between;">
      <span>💡 Tap Arabic or English text box to cycle rating:</span>
      <span style="font-weight:800;color:var(--ink)">🔴 Weak → 🟡 Med → 🟢 Strong</span>
    </div>
    
    <div class="ayah-list-detail">
      ${surah.ayahs.map((ay, idx) => {
        const id = idOf(sNum, idx);
        const aSt = S.stats[id]?.a;
        const mSt = S.stats[id]?.m;
        const aLvl = aSt?.lvl || (aSt ? strengthToRating(calculateStrength(id, 'a')) : null);
        const mLvl = mSt?.lvl || (mSt ? strengthToRating(calculateStrength(id, 'm')) : null);
        const aScale = aLvl ? (RATING_SCALE.find(r => r.level === aLvl) || RATING_SCALE[0]) : null;
        const mScale = mLvl ? (RATING_SCALE.find(r => r.level === mLvl) || RATING_SCALE[0]) : null;
        
        const arBg = aScale ? `${aScale.color}22` : 'var(--card2)';
        const enBg = mScale ? `${mScale.color}1b` : 'var(--card2)';
        const arBorder = aScale ? `2px solid ${aScale.color}aa` : '2px solid var(--line)';
        const enBorder = mScale ? `2px solid ${mScale.color}88` : '2px solid var(--line)';
        
        return `
          <div id="ayah-card-${sNum}-${idx}" style="padding:14px 0;border-bottom:1px solid var(--line);scroll-margin-top:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:0.75rem;font-weight:800;color:var(--gold);">Ayah ${idx + 1}</span>
            </div>
            
            <!-- Tap Arabic Text to Cycle Rating -->
            <div id="ayah-ar-${sNum}-${idx}" 
                 class="ar-big" 
                 onclick="toggleAyahTrack(${sNum}, ${idx}, 'a'); event.stopPropagation();" 
                 style="font-size:1.45rem;line-height:2;margin:0 0 8px;padding:12px 16px;border-radius:12px;background:${arBg};border:${arBorder};transition:all 0.25s ease;cursor:pointer;position:relative;user-select:none;">
              <span>${ay.ar}</span>
              <span id="ar-icon-${sNum}-${idx}" class="rating-icon-tag" style="position:absolute;top:6px;left:8px;font-size:0.8rem;">${aScale ? aScale.icon : ''}</span>
            </div>

            <!-- Tap English Text to Cycle Rating -->
            <div id="ayah-en-${sNum}-${idx}" 
                 class="en-big" 
                 onclick="toggleAyahTrack(${sNum}, ${idx}, 'm'); event.stopPropagation();" 
                 style="font-size:0.9rem;padding:10px 14px;border-radius:10px;background:${enBg};border:${enBorder};transition:all 0.25s ease;cursor:pointer;position:relative;user-select:none;">
              <span>${ay.en}</span>
              <span id="en-icon-${sNum}-${idx}" class="rating-icon-tag" style="position:absolute;top:6px;right:8px;font-size:0.8rem;">${mScale ? mScale.icon : ''}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line);">
      <button class="btn-secondary" style="width:100%;padding:12px;font-size:0.88rem;font-weight:800;cursor:pointer;border-radius:10px;" onclick="closeSurahDetail()">
        ← Back to Previous Screen
      </button>
    </div>
  `;
  
  const dlg = document.getElementById('dlgAyahDetail');
  if (dlg) {
    dlg.style.display = '';
    if (!dlg.open) dlg.showModal();
  }

  const sheetContent = document.getElementById('ayahSheetContent');
  if (sheetContent) {
    sheetContent.onclick = (e) => e.stopPropagation();
  }

  if (scrollToIndex !== null) {
    setTimeout(() => {
      const targetCard = document.getElementById(`ayah-card-${sNum}-${scrollToIndex}`);
      if (targetCard && sheetContent) {
        const cardTop = targetCard.offsetTop;
        sheetContent.scrollTo({ top: cardTop - 60, behavior: 'smooth' });
      }
    }, 100);
  }
}

export function toggleAyahTrack(sNum, idx, track) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah) return;
  
  const id = idOf(sNum, idx);
  const st = getStatBlock(id, track);
  
  // Cycle: null/unrated (0) -> 1 (Weak 🔴) -> 2 (Medium 🟡) -> 3 (Strong 🟢) -> 1 ...
  let nextLvl = 1;
  if (st.lvl === 1) nextLvl = 2;
  else if (st.lvl === 2) nextLvl = 3;
  else if (st.lvl === 3) nextLvl = 1;
  
  setAyahRating(id, track, nextLvl);
  
  const scale = RATING_SCALE.find(r => r.level === nextLvl) || RATING_SCALE[0];
  const elemId = track === 'a' ? `ayah-ar-${sNum}-${idx}` : `ayah-en-${sNum}-${idx}`;
  const iconId = track === 'a' ? `ar-icon-${sNum}-${idx}` : `en-icon-${sNum}-${idx}`;
  
  const el = document.getElementById(elemId);
  const iconEl = document.getElementById(iconId);
  
  if (el) {
    el.style.background = `${scale.color}22`;
    el.style.border = `2px solid ${scale.color}aa`;
    el.style.boxShadow = `0 4px 14px ${scale.color}25`;
  }
  if (iconEl) {
    iconEl.textContent = scale.icon;
  }

  // Scroll to next ayah within sheet-content after a 1 second delay for rating flow
  const nextIdx = idx + 1;
  const hasNext = nextIdx < surah.ayahs.length;
  if (hasNext) {
    setTimeout(() => {
      const nextCard = document.getElementById(`ayah-card-${sNum}-${nextIdx}`);
      const sheetContent = document.getElementById('ayahSheetContent');
      if (nextCard && sheetContent) {
        const cardTop = nextCard.offsetTop;
        sheetContent.scrollTo({ top: cardTop - 60, behavior: 'smooth' });
      }
    }, 1000);
  }
}
window.toggleAyahTrack = toggleAyahTrack;
window.rateAyahTrack = toggleAyahTrack;
window.rateAyahAndNext = toggleAyahTrack;

export function openAyahSheet(id) {
  const parts = id.split(':');
  if (parts.length === 2) {
    openSurahDetail(parseInt(parts[0]));
  }
}

/* ============ PRACTICE RUNNER ============ */
let practiceQueue = [];
let practiceIndex = 0;
let practiceMode = 'dual';

export function openSessionConfig() {
  const memorized = getMemorizedAyahs();
  if (!memorized.length) {
    toast("Mark memorized surahs in Quran tab first");
    go('quran');
    return;
  }
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.showModal();
}

function startPracticeSession() {
  const activeSizeBtn = document.querySelector('#sessSizeSelect button.active');
  const size = activeSizeBtn ? parseInt(activeSizeBtn.dataset.val) : 10;
  
  const memorized = getMemorizedAyahs();
  practiceQueue = memorized.map(x => ({ ...x, combined: getCombinedStrength(x.id) ?? 0 }))
    .sort((a, b) => a.combined - b.combined)
    .slice(0, size);
    
  practiceIndex = 0;
  verifyDailyStreak();
  
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.close();
  
  document.getElementById('practice').classList.add('open');
  renderPracticeCard();
}

export function startSurahRevision(sNum) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah || !surah.ayahs) return;
  
  const ayahs = surah.ayahs.map((ay, idx) => ({
    s: surah,
    id: idOf(surah.n, idx),
    ai: idx,
    ar: ay.ar,
    en: ay.en,
    combined: getCombinedStrength(idOf(surah.n, idx)) ?? 0
  }));
  
  practiceQueue = ayahs;
  practiceIndex = 0;
  verifyDailyStreak();
  
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.close();
  
  document.getElementById('practice').classList.add('open');
  renderPracticeCard();
  toast(`Revising ${cleanEnName(surah.name)}`);
}

export function endSession(finished) {
  document.getElementById('practice').classList.remove('open');
  renderHome();
  if (finished !== false) toast("Session completed! ✦");
}

function renderPracticeCard() {
  const ayah = practiceQueue[practiceIndex];
  const total = practiceQueue.length;
  
  const pFill = document.getElementById('pFill');
  const pCount = document.getElementById('pCount');
  const pBody = document.getElementById('pBody');
  
  if (pFill) pFill.style.width = `${(practiceIndex / total) * 100}%`;
  if (pCount) pCount.textContent = `${practiceIndex + 1}/${total}`;
  
  if (pBody) {
    if (pBody._revealTimer) clearTimeout(pBody._revealTimer);
    
    pBody.innerHTML = `
      <span class="phase-chip recite">① Recite from Memory</span>
      <div class="p-card">
        <span class="p-ref">
          <span class="p-ref-ar">${cleanArName(ayah.s.ar)}</span>
          <span>${cleanEnName(ayah.s.name)} ${ayah.s.n}:${ayah.ai + 1}</span>
        </span>
        <p class="p-prompt">Recite aloud from memory</p>
        <div class="hidden-text revealed" id="hidTextReveal" style="min-height: 80px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">
          <span class="hm-en" id="prTrans" style="font-size: 0.95rem; color: var(--ink2);">${ayah.en}</span>
          <span class="reveal-ar" id="prArabic" style="min-height: 40px; display: block;"></span>
        </div>
      </div>
      <div class="grade-row" id="practiceGradeRow">
        ${RATING_SCALE.map((r, i) => `
          <button class="grade g${i + 1}" onclick="gradePractice(${r.level})">
            ${r.icon} ${r.label}
          </button>
        `).join('')}
      </div>
      <button class="btn-secondary" style="margin-top:16px;width:100%;font-size:0.8rem;padding:8px 14px;" onclick="endSession(true)">
        ✓ Finish Revision Early
      </button>
    `;
    
    const arEl = document.getElementById('prArabic');
    const fullText = ayah.ar;
    
    // Cut delay by 70% (30% of original): 300ms min, 45,000ms max for longest ayah (1194 chars)
    const maxChars = 1194;
    const fraction = Math.min(1, (fullText.length || 1) / maxChars);
    const initialDelay = 300 + fraction * (45000 - 300);
    
    // Typewriter animation: displaying letters a little slower (approx 65ms per char)
    const typeSpeed = Math.max(65, Math.min(110, 4500 / (fullText.length || 1)));
    let charIdx = 0;
    
    function startTyping() {
      const currentAyah = practiceQueue[practiceIndex];
      if (!currentAyah || currentAyah.id !== ayah.id || !arEl) return;
      
      if (charIdx <= fullText.length) {
        arEl.textContent = fullText.substring(0, charIdx);
        charIdx++;
        pBody._revealTimer = setTimeout(startTyping, typeSpeed);
      }
    }
    
    pBody._revealTimer = setTimeout(startTyping, initialDelay);
  }
}

function gradePractice(level) {
  const ayah = practiceQueue[practiceIndex];
  setAyahRating(ayah.id, 'a', level);
  setAyahRating(ayah.id, 'm', level);
  
  S.today.done++;
  saveState();
  
  if (practiceIndex + 1 >= practiceQueue.length) {
    endSession(true);
  } else {
    practiceIndex++;
    renderPracticeCard();
  }
}

/* ============ DEVELOPER TOOLS ============ */
function simulateDay() {
  let count = 0;
  for (const id in S.stats) {
    if (S.stats[id].a && S.stats[id].a.last) { S.stats[id].a.last -= 86400000; count++; }
    if (S.stats[id].m && S.stats[id].m.last) { S.stats[id].m.last -= 86400000; count++; }
  }
  saveState();
  renderHome();
  toast(`Simulated +1 day. Decayed ${count} active tracks. ⚡`);
}

function exportState() {
  const dataStr = JSON.stringify(S, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hifzflow_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  toast("Progress backup file downloaded! ✦");
}

function importState(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (parsed) {
        S = { ...S, ...parsed };
        saveState();
        applyPreferences();
        renderHome();
        toast("Progress successfully imported! ✦");
      }
    } catch (err) {
      toast("Error parsing backup JSON file");
    }
  };
  reader.readAsText(file);
}

function resetApplication() {
  if (confirm("Reset all hifz records forever?")) {
    localStorage.removeItem(KEY);
    window.location.reload();
  }
}

export async function clearAppCacheAndReload() {
  toast("Clearing cache & loading latest version... 🔄");
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
  } catch (err) {
    console.warn("Error purging SW cache", err);
  }
  setTimeout(() => {
    window.location.href = window.location.origin + window.location.pathname + '?reload=' + Date.now();
  }, 400);
}
window.clearAppCacheAndReload = clearAppCacheAndReload;

/* ============ KEYBOARD SHORTCUTS & HELP SYSTEM ============ */
export function handleKeyDown(e) {
  // Ignore inside text input elements
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
  if (e.target.isContentEditable) return;

  const practiceModal = document.getElementById('practice');
  const isPracticeOpen = practiceModal && practiceModal.classList.contains('open');
  const helpDialog = document.getElementById('dlgHelp');
  const ayahDetailDialog = document.getElementById('dlgAyahDetail');

  // Help dialog toggle ('?' or 'Shift + /')
  if (e.key === '?' || (e.shiftKey && e.key === '/')) {
    e.preventDefault();
    if (helpDialog) {
      if (helpDialog.open) helpDialog.close();
      else helpDialog.showModal();
    }
    return;
  }

  // Escape key closes help modal, ayah detail modal, or practice session
  if (e.key === 'Escape') {
    if (ayahDetailDialog && ayahDetailDialog.open) {
      ayahDetailDialog.close();
      return;
    }
    if (helpDialog && helpDialog.open) {
      helpDialog.close();
      return;
    }
    if (isPracticeOpen) {
      endSession(false);
      return;
    }
  }

  // Practice session specific shortcuts
  if (isPracticeOpen) {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      const revealTrigger = document.getElementById('hidTextReveal');
      if (revealTrigger && !revealTrigger.classList.contains('revealed')) {
        revealTrigger.click();
      }
      return;
    }

    if (['1', 'j', 'J', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      gradePractice(1);
      return;
    }

    if (['2', 'k', 'K', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      gradePractice(2);
      return;
    }

    if (['3', 'l', 'L', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      gradePractice(3);
      return;
    }
    return;
  }

  // Global tab navigation shortcuts
  if (e.key === '1' || e.key === 'h' || e.key === 'H') { go('home'); }
  else if (e.key === '2' || e.key === 'r' || e.key === 'R') { go('revise'); }
  else if (e.key === '3' || e.key === 'q' || e.key === 'Q') { go('quran'); }
  else if (e.key === '4' || e.key === 'l' || e.key === 'L') { go('history'); }
  else if (e.key === '5' || e.key === 's' || e.key === 'S') { go('settings'); }
}

/* ============ EVENT LISTENERS & BOOTSTRAP ============ */
function setupEventListeners() {
  document.addEventListener('keydown', handleKeyDown);

  // Tap outside modal card (backdrop click) to save & close ratings screen
  // For dlgAyahDetail, sheet-content stops propagation so only true backdrop clicks close it
  const dlgAyah = document.getElementById('dlgAyahDetail');
  if (dlgAyah) {
    dlgAyah.addEventListener('click', (e) => {
      const rect = document.getElementById('ayahSheetContent')?.getBoundingClientRect();
      if (rect) {
        const isOutside = (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom);
        if (isOutside) {
          closeSurahDetail();
        }
      }
    });
  }

  ['dlgHelp', 'dlgAuth', 'dlgAddLog', 'dlgSessionConfig'].forEach(dlgId => {
    const dlg = document.getElementById(dlgId);
    if (dlg) {
      dlg.addEventListener('click', (e) => {
        if (e.target === dlg) {
          saveState();
          dlg.close();
        }
      });
    }
  });

  const helpBtn = document.getElementById('helpBtn');
  if (helpBtn) helpBtn.onclick = () => document.getElementById('dlgHelp').showModal();

  document.querySelectorAll('nav .nav-btn').forEach(btn => {
    btn.onclick = () => go(btn.dataset.v);
  });
  
  const ctaStart = document.getElementById('ctaStart');
  if (ctaStart) ctaStart.onclick = () => openSessionConfig();
  
  const shareWisdom = document.getElementById('shareWisdom');
  if (shareWisdom) {
    shareWisdom.onclick = () => {
      const text = document.getElementById('wisText')?.textContent || '';
      const src = document.getElementById('wisSrc')?.textContent || '';
      if (text) {
        navigator.clipboard.writeText(`${text} — ${src}`);
        toast("Wisdom quote copied to clipboard! ✦");
      }
    };
  }
  
  document.querySelectorAll('#sessSizeSelect button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sessSizeSelect button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
  
  document.querySelectorAll('#sessModeSelect button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sessModeSelect button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
  
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      S.theme = S.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyPreferences();
    };
  }
  
  document.querySelectorAll('#zoomer button').forEach(btn => {
    btn.onclick = () => {
      S.zoom = parseFloat(btn.dataset.z);
      saveState();
      applyPreferences();
    };
  });
  
  const libSearch = document.getElementById('libSearch');
  if (libSearch) {
    libSearch.oninput = (e) => {
      quranSearchQuery = e.target.value;
      renderQuran();
    };
  }
  
  document.querySelectorAll('#libFilters .filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#libFilters .filter-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      activeQuranFilter = btn.dataset.filter;
      renderQuran();
    };
  });
  
  const btnLaunch = document.getElementById('btnLaunchSession');
  if (btnLaunch) btnLaunch.onclick = () => startPracticeSession();
  
  const cycleSelect = document.getElementById('cycleSelect');
  if (cycleSelect) {
    cycleSelect.onchange = (e) => {
      S.cycleDays = parseInt(e.target.value);
      saveState();
      toast(`Coverage cycle set to ${S.cycleDays} days`);
    };
  }
  
  const goalSelect = document.getElementById('goalSelect');
  if (goalSelect) {
    goalSelect.onchange = (e) => {
      S.dailyGoal = parseInt(e.target.value);
      saveState();
      renderHome();
      toast(`Daily goal set to ${S.dailyGoal} reviews`);
    };
  }
  
  const fontSelect = document.getElementById('fontSelect');
  if (fontSelect) {
    fontSelect.onchange = (e) => {
      S.arabicFont = e.target.value;
      saveState();
      applyArabicFont(S.arabicFont);
      toast("Quranic font updated");
    };
  }
  
  const btnExport = document.getElementById('btnExport');
  if (btnExport) btnExport.onclick = () => exportState();
  
  const importFile = document.getElementById('importFile');
  if (importFile) importFile.onchange = (e) => importState(e);
  
  const btnSimulateDay = document.getElementById('btnSimulateDay');
  if (btnSimulateDay) btnSimulateDay.onclick = () => simulateDay();
  
  const btnReset = document.getElementById('btnReset');
  if (btnReset) btnReset.onclick = () => resetApplication();

  const btnClearCache = document.getElementById('btnClearCache');
  if (btnClearCache) btnClearCache.onclick = () => clearAppCacheAndReload();
  
  const btnAddLog = document.getElementById('btnAddLog');
  if (btnAddLog) {
    btnAddLog.onclick = () => {
      const dlg = document.getElementById('dlgAddLog');
      if (dlg) dlg.showModal();
    };
  }
  
  const btnSaveLog = document.getElementById('btnSaveLog');
  if (btnSaveLog) {
    btnSaveLog.onclick = () => {
      const who = document.getElementById('logWhoInput').value.trim();
      const notes = document.getElementById('logNotesInput').value.trim();
      if (!who || !notes) { toast("Please enter details"); return; }
      
      if (!S.logs) S.logs = [];
      S.logs.unshift({ date: new Date().toLocaleDateString(), who, notes });
      saveState();
      
      const dlg = document.getElementById('dlgAddLog');
      if (dlg) dlg.close();
      renderHistory();
      toast("Recitation log saved! ✦");
    };
  }
  
  // Onboarding CTA button listener
  const obBtn = document.querySelector('#onboard .ob-foot button');
  if (obBtn) {
    obBtn.onclick = () => {
      finishOnboard();
    };
  }

  // Cloudflare Auth button listeners
  const btnGoogle = document.getElementById('btnGoogleAuth');
  if (btnGoogle) btnGoogle.onclick = () => loginWithGoogle();

  const btnEmail = document.getElementById('btnEmailAuth');
  if (btnEmail) {
    btnEmail.onclick = () => {
      const email = document.getElementById('authEmailInput').value.trim();
      if (!email || !email.includes('@')) { toast("Please enter a valid email"); return; }
      loginWithEmail(email);
    };
  }

  const btnSignOut = document.getElementById('btnSignOut');
  if (btnSignOut) btnSignOut.onclick = () => signOutUser();

  // Reminder Settings listeners
  const remindersToggle = document.getElementById('remindersToggle');
  if (remindersToggle) {
    remindersToggle.onchange = async (e) => {
      if (e.target.checked) {
        const granted = await requestNotificationPermission();
        if (!granted) { e.target.checked = false; return; }
        if (!S.reminders) S.reminders = { enabled: true, time: "08:00" };
        S.reminders.enabled = true;
        toast("Daily reminders enabled! 🔔");
      } else {
        if (S.reminders) S.reminders.enabled = false;
        toast("Daily reminders disabled");
      }
      saveState();
    };
  }

  const reminderTimeInput = document.getElementById('reminderTimeInput');
  if (reminderTimeInput) {
    reminderTimeInput.onchange = (e) => {
      if (!S.reminders) S.reminders = { enabled: false, time: "08:00" };
      S.reminders.time = e.target.value;
      saveState();
      toast(`Reminder time set to ${e.target.value}`);
    };
  }

  const btnTestReminder = document.getElementById('btnTestReminder');
  if (btnTestReminder) btnTestReminder.onclick = () => sendTestReminder();
}

export function updateAuthUI() {
  const chipAvatar = document.getElementById('chipAvatar');
  const chipSyncStatus = document.getElementById('chipSyncStatus');
  const signedOutState = document.getElementById('authSignedOutState');
  const signedInState = document.getElementById('authSignedInState');
  const displayAvatar = document.getElementById('authDisplayAvatar');
  const displayName = document.getElementById('authDisplayName');
  const displayEmail = document.getElementById('authDisplayEmail');

  if (S.user && S.user.email) {
    if (chipAvatar) chipAvatar.textContent = '🟢';
    if (chipSyncStatus) { chipSyncStatus.textContent = 'Synced 🟢'; chipSyncStatus.className = 'sync-badge synced'; }
    if (signedOutState) signedOutState.style.display = 'none';
    if (signedInState) signedInState.style.display = 'block';
    if (displayAvatar) displayAvatar.textContent = '👤';
    if (displayName) displayName.textContent = S.user.name || S.user.email.split('@')[0];
    if (displayEmail) displayEmail.textContent = S.user.email;
  } else {
    if (chipAvatar) chipAvatar.textContent = '👤';
    if (chipSyncStatus) { chipSyncStatus.textContent = 'Guest'; chipSyncStatus.className = 'sync-badge'; }
    if (signedOutState) signedOutState.style.display = 'block';
    if (signedInState) signedInState.style.display = 'none';
  }
}

export function openAuthModal() {
  updateAuthUI();
  const dlg = document.getElementById('dlgAuth');
  if (dlg) dlg.showModal();
}
window.openAuthModal = openAuthModal;

export async function loginWithEmail(email) {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login_email', email })
    });
    const data = await res.json();
    if (data.success) {
      S.user = data.user;
      saveState();
      updateAuthUI();
      const dlg = document.getElementById('dlgAuth');
      if (dlg) dlg.close();
      toast(`Signed in as ${S.user.email}! ✦`);
    } else {
      toast(data.error || "Login failed");
    }
  } catch (err) {
    toast("Network error during login");
  }
}

export async function loginWithGoogle() {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login_google', email: 'user@gmail.com', name: 'Quran Student' })
    });
    const data = await res.json();
    if (data.success) {
      S.user = data.user;
      saveState();
      updateAuthUI();
      const dlg = document.getElementById('dlgAuth');
      if (dlg) dlg.close();
      toast("Signed in with Google! ✦");
    }
  } catch (err) {
    toast("Network error during Google sign-in");
  }
}

export function signOutUser() {
  S.user = { id: "guest", email: null, name: null, provider: null };
  saveState();
  updateAuthUI();
  const dlg = document.getElementById('dlgAuth');
  if (dlg) dlg.close();
  toast("Signed out");
}

export function renderOnboardList() {
  const obList = document.getElementById('obList');
  if (!obList) return;
  
  let html = '';
  for (let sNum = 63; sNum <= 114; sNum++) {
    const surah = QURAN_DATA[sNum];
    if (!surah) continue;
    const isKnown = !!S.memorized[sNum];
    
    html += `
      <div class="surah-card">
        <div class="surah-top">
          <span class="surah-num">
            <svg viewBox="0 0 40 40"><path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            ${surah.n}
          </span>
          <div class="surah-meta">
            <b>${surah.name}</b>
            <span>${surah.en} · ${surah.ayahs.length} Ayahs</span>
          </div>
          <span class="surah-arname">${surah.ar}</span>
          <button class="know-toggle ${isKnown ? 'on' : ''}" data-sn="${surah.n}">
            ${isKnown ? '✓ Known' : 'I know this'}
          </button>
        </div>
      </div>
    `;
  }
  
  obList.innerHTML = html;
  
  obList.querySelectorAll('.know-toggle').forEach(btn => {
    btn.onclick = () => {
      const sNum = parseInt(btn.dataset.sn);
      if (S.memorized[sNum]) {
        delete S.memorized[sNum];
        btn.classList.remove('on');
        btn.textContent = 'I know this';
      } else {
        bulkMarkSurahMemorized(sNum, 3);
        btn.classList.add('on');
        btn.textContent = '✓ Known';
      }
      saveState();
    };
  });
}

export function finishOnboard() {
  S.onboarded = true;
  saveState();
  const obOverlay = document.getElementById('onboard');
  if (obOverlay) obOverlay.classList.remove('open');
  go('home');
  toast("Bismillah — Your revision map is ready! ✦");
}
window.finishOnboard = finishOnboard;

async function boot() {
  loadState();
  applyPreferences();
  verifyDailyStreak();
  setupEventListeners();
  updateAuthUI();
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW reg error:', err));
  }
  
  await loadQuranDataset();
  
  if (!S.onboarded) {
    const obOverlay = document.getElementById('onboard');
    if (obOverlay) obOverlay.classList.add('open');
    renderOnboardList();
  } else {
    go('home');
  }
  
  setInterval(() => {
    const activeBtn = document.querySelector('nav .nav-btn.on');
    if (activeBtn) {
      const viewId = activeBtn.dataset.v;
      if (viewId === 'home') renderHome();
    }
    checkReminderAlarms();
  }, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
  boot();
});

// Attach all global handlers for inline HTML onclick attributes
window.go = go;
window.toast = toast;
window.openSurahDetail = openSurahDetail;
window.openAyahSheet = openAyahSheet;
window.toggleSurahMemorized = toggleSurahMemorized;
window.bulkMarkSurahMemorized = bulkMarkSurahMemorized;
window.setAyahRating = setAyahRating;
window.startPracticeSession = startPracticeSession;
window.startSurahRevision = startSurahRevision;
window.endSession = endSession;
window.openSessionConfig = openSessionConfig;
window.gradePractice = gradePractice;
window.finishOnboard = finishOnboard;
window.openAuthModal = openAuthModal;
window.loginWithGoogle = loginWithGoogle;
window.loginWithEmail = loginWithEmail;
window.signOutUser = signOutUser;
window.clearAppCacheAndReload = clearAppCacheAndReload;
window.closeSurahDetail = closeSurahDetail;

