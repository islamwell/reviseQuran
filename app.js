/* ================================================================
   HifzFlow — Spaced Repetition Quran Revision App
   Dual-track (Arabic + Meaning) Memory Tracking
   ================================================================ */

/* ============ QURAN DATA BANK ============ */
export const BANK = [
  {
    cat: "The Opener",
    id: "opener",
    surahs: [
      {
        n: 1,
        name: "Al-Fatihah",
        ar: "الفاتحة",
        en: "The Opener",
        ayahs: [
          ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "In the name of Allah, the Most Gracious, the Most Merciful."],
          ["الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "All praise is due to Allah, Lord of the worlds."],
          ["الرَّحْمَٰنِ الرَّحِيمِ", "The Most Gracious, the Most Merciful."],
          ["مَالِكِ يَوْمِ الدِّينِ", "Master of the Day of Judgement."],
          ["إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "You alone we worship, and You alone we ask for help."],
          ["اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Guide us along the Straight Path."],
          ["صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "The path of those You have blessed — not of those who earned Your anger, nor of those who went astray."]
        ]
      }
    ]
  },
  {
    cat: "Juz ʿAmma · Short Surahs",
    id: "short",
    surahs: [
      {
        n: 112,
        name: "Al-Ikhlas",
        ar: "الإخلاص",
        en: "The Sincerity",
        ayahs: [
          ["قُلْ هُوَ اللَّهُ أَحَدٌ", "Say: He is Allah, the One."],
          ["اللَّهُ الصَّمَدُ", "Allah, the Eternal Refuge."],
          ["لَمْ يَلِدْ وَلَمْ يُولَدْ", "He neither begets nor is born."],
          ["وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "And there is none comparable to Him."]
        ]
      },
      {
        n: 113,
        name: "Al-Falaq",
        ar: "الفلق",
        en: "The Daybreak",
        ayahs: [
          ["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "Say: I seek refuge in the Lord of daybreak,"],
          ["مِن شَرِّ مَا خَلَقَ", "from the evil of what He created,"],
          ["وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "and from the evil of darkness when it settles,"],
          ["وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "and from the evil of the blowers in knots,"],
          ["وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "and from the evil of an envier when he envies."]
        ]
      },
      {
        n: 114,
        name: "An-Nas",
        ar: "الناس",
        en: "Mankind",
        ayahs: [
          ["قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "Say: I seek refuge in the Lord of mankind,"],
          ["مَلِكِ النَّاسِ", "the Sovereign of mankind,"],
          ["إِلَٰهِ النَّاسِ", "the God of mankind,"],
          ["مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "from the evil of the retreating whisperer,"],
          ["الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "who whispers into the chests of mankind,"],
          ["مِنَ الْجِنَّةِ وَالنَّاسِ", "from among jinn and mankind."]
        ]
      },
      {
        n: 103,
        name: "Al-ʿAsr",
        ar: "العصر",
        en: "The Declining Day",
        ayahs: [
          ["وَالْعَصْرِ", "By time,"],
          ["إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "indeed, mankind is in loss,"],
          ["إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "except those who believe, do righteous deeds, and urge each other to truth and urge each other to patience."]
        ]
      },
      {
        n: 108,
        name: "Al-Kawthar",
        ar: "الكوثر",
        en: "The Abundance",
        ayahs: [
          ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "Indeed, We have granted you al-Kawthar."],
          ["فَصَلِّ لِرَبِّكَ وَانْحَرْ", "So pray to your Lord and sacrifice."],
          ["إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "Indeed, your enemy is the one cut off."]
        ]
      },
      {
        n: 110,
        name: "An-Nasr",
        ar: "النصر",
        en: "The Divine Support",
        ayahs: [
          ["إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "When the victory of Allah has come and the conquest,"],
          ["وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "and you see the people entering the religion of Allah in multitudes,"],
          ["فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", "then exalt Him with praise of your Lord and ask His forgiveness. Indeed, He is ever Accepting of repentance."]
        ]
      },
      {
        n: 97,
        name: "Al-Qadr",
        ar: "القدر",
        en: "The Night of Decree",
        ayahs: [
          ["إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", "Indeed, We sent it down during the Night of Decree."],
          ["وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", "And what can make you know what the Night of Decree is?"],
          ["لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", "The Night of Decree is better than a thousand months."],
          ["تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", "The angels and the Spirit descend therein by permission of their Lord for every matter."],
          ["سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", "Peace it is until the emergence of dawn."]
        ]
      },
      {
        n: 111,
        name: "Al-Masad",
        ar: "المسد",
        en: "The Palm Fiber",
        ayahs: [
          ["تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", "May the hands of Abu Lahab be ruined, and ruined is he."],
          ["مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", "His wealth will not avail him, nor what he earned."],
          ["سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", "He will enter a Fire of flame,"],
          ["وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", "and his wife, the carrier of firewood,"],
          ["فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", "around her neck a rope of palm fiber."]
        ]
      },
      {
        n: 105,
        name: "Al-Fil",
        ar: "الفيل",
        en: "The Elephant",
        ayahs: [
          ["أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "Have you not seen how your Lord dealt with the companions of the elephant?"],
          ["أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "Did He not make their plan into misguidance?"],
          ["وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", "And He sent against them birds in flocks,"],
          ["تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", "striking them with stones of hard clay,"],
          ["فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", "and made them like eaten straw."]
        ]
      },
      {
        n: 106,
        name: "Quraysh",
        ar: "قريش",
        en: "Quraysh",
        ayahs: [
          ["لِإِيلَافِ قُرَيْشٍ", "For the accustomed security of Quraysh,"],
          ["إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "their accustomed security in the caravan of winter and summer,"],
          ["فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", "let them worship the Lord of this House,"],
          ["الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ", "who has fed them against hunger and made them safe from fear."]
        ]
      }
    ]
  },
  {
    cat: "Core Verses",
    id: "core",
    surahs: [
      {
        n: 2,
        name: "Āyat al-Kursī",
        ar: "آية الكرسي",
        en: "The Throne Verse · 2:255",
        seg: true,
        ayahs: [
          ["اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", "Allah — there is no god worthy of worship except Him, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him. (1/4)"],
          ["لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ", "To Him belongs whatever is in the heavens and the earth. Who can intercede with Him except by His permission? (2/4)"],
          ["يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ", "He knows what is before them and behind them, and they encompass nothing of His knowledge except what He wills. (3/4)"],
          ["وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", "His Kursi extends over the heavens and the earth, and preserving them does not tire Him. He is the Most High, the Most Great. (4/4)"]
        ]
      }
    ]
  }
];

export const WISDOM = [
  { tag: "On Patience", t: "\"O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.\"", s: "Qur'an 2:153" },
  { tag: "On Steadiness", t: "\"The most beloved deeds to Allah are the most consistent, even if small.\"", s: "Sahih al-Bukhari 6464" },
  { tag: "On the Qur'an", t: "\"The example of the one who recites the Qur'an is that of a citron — its fragrance is sweet and its taste is sweet.\"", s: "Sahih al-Bukhari 7560" },
  { tag: "On Review", t: "\"Keep revisiting the Qur'an, for it slips away from memory more easily than camels escape their ropes.\"", s: "Sahih al-Bukhari 5033" },
  { tag: "On Ease", t: "\"Allah intends for you ease and does not intend for you hardship.\"", s: "Qur'an 2:185" },
  { tag: "On Knowledge", t: "\"Read! And your Lord is the Most Generous. Who has taught by the pen. He has taught man that which he knew not.\"", s: "Qur'an 96:3-5" },
  { tag: "On Remembrance", t: "\"And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?\"", s: "Qur'an 54:17" }
];

/* ============ STRINGS i18n ============ */
const STR = {
  en: {
    due: "due",
    newTag: "new",
    strong: "Strong",
    weak: "Weak",
    reviewNow: "Review now",
    nextDue: "Next review",
    recite: "Recite · Arabic",
    meaning: "Meaning",
    tapReveal: "Tap to reveal",
    grades: ["Again", "Hard", "Good", "Easy"],
    gradeSub: ["<1 day", "soon", "on track", "effortless"]
  }
};
const L = STR.en;

/* ============ STATE MANAGEMENT ============ */
const KEY = "hifzflow-v1";
let S = {
  memorized: {},
  stats: {},
  taught: {},
  streak: 0,
  lastDay: null,
  today: { day: "", done: 0 },
  theme: "dark",
  zoom: 1,
  onboarded: false,
  dailyGoal: 10
};

// Load state
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      S = { ...S, ...parsed };
      // Make sure today is structure matched
      if (!S.today) S.today = { day: "", done: 0 };
      if (!S.dailyGoal) S.dailyGoal = 10;
      if (!S.taught) S.taught = {};
    }
  } catch (e) {
    console.error("Failed to load local storage state", e);
  }
}

// Save state
export function saveState() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch (e) {
    console.error("Failed to save state to local storage", e);
  }
}

const idOf = (sn, ai) => `${sn}:${ai}`;

// Fetch stats block for specific track
export function getStatBlock(id, track) {
  if (!S.stats[id]) S.stats[id] = { a: null, m: null };
  if (!S.stats[id][track]) {
    S.stats[id][track] = { iv: 0, e: 2.5, r: 0, last: 0 };
  }
  return S.stats[id][track];
}

// Spaced repetition strength calculations (exponential forgetting curve)
export function calculateStrength(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return null;
  const elapsedDays = (Date.now() - st.last) / 86400000; // 1000 * 60 * 60 * 24
  // Retention R = 100 * exp(-t/S) where S is interval (half life)
  const halfLife = Math.max(st.iv, 0.1);
  return Math.round(100 * Math.exp(-elapsedDays / halfLife));
}

// Combined strength of recitation and translation track
export function getCombinedStrength(id) {
  const a = calculateStrength(id, 'a');
  const m = calculateStrength(id, 'm');
  if (a === null && m === null) return null;
  return Math.round(((a ?? 0) + (m ?? 0)) / 2);
}

// SM-2 Spaced Repetition Grading algorithm implementation
export function gradeAyah(id, track, g) {
  const st = getStatBlock(id, track);
  const now = Date.now();
  
  if (g === 1) { // Again (fail)
    st.iv = 0.05; // 1.2 hours
    st.e = Math.max(1.3, st.e - 0.25);
    st.r = 0;
  } else if (g === 2) { // Hard
    st.iv = st.iv < 1 ? 1 : st.iv * 1.25;
    st.e = Math.max(1.3, st.e - 0.15);
    st.r++;
  } else if (g === 3) { // Good
    st.iv = st.r === 0 ? 1 : st.iv * st.e;
    st.r++;
  } else { // Easy
    st.iv = st.r === 0 ? 2.5 : st.iv * st.e * 1.35;
    st.e = Math.min(3.0, st.e + 0.12);
    st.r++;
  }
  
  st.last = now;
  saveState();
}

// Checks if an ayah is due for review
export function isAyahDue(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return true; // never tested is due
  const strVal = calculateStrength(id, track);
  return strVal === null || strVal < 85;
}

// Flatten database to individual ayahs
export function getFlatAyahs() {
  const list = [];
  BANK.forEach(c => {
    c.surahs.forEach(s => {
      s.ayahs.forEach((ay, idx) => {
        list.push({
          s,
          id: idOf(s.n, idx),
          ai: idx,
          ar: ay[0],
          en: ay[1],
          catId: c.id
        });
      });
    });
  });
  return list;
}

// Filter flat ayahs to memorized ones
export function getMemorizedAyahs() {
  return getFlatAyahs().filter(x => S.memorized[x.s.n]);
}

/* ============ PREFERENCES APPLIER ============ */
function applyPreferences() {
  document.documentElement.dataset.theme = S.theme;
  document.documentElement.style.setProperty('--fz', S.zoom);
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.textContent = S.theme === 'dark' ? '☾' : '☀';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', S.theme === 'dark' ? '#070d0b' : '#f8f6f0');
  }
  document.querySelectorAll('#zoomer button').forEach(b => {
    b.classList.toggle('on', parseFloat(b.dataset.z) === S.zoom);
  });
  
  // Update version in footer
  const verDiv = document.getElementById('appVersion');
  if (verDiv) {
    verDiv.textContent = `v1.0.3 (updated 2026-07-21 17:47)`;
  }
}

/* ============ DAILY STREAK MANAGEMENT ============ */
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
      S.streak = 1; // streak broken
    } else {
      S.streak = 0; // first day
    }
    S.lastDay = TODAY_STRING;
  }
  saveState();
}

/* ============ UI NAVIGATION ============ */
export function go(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const currentView = document.getElementById(`v-${viewId}`);
  if (currentView) currentView.classList.add('active');
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.v === viewId);
  });
  
  if (viewId === 'home') renderHome();
  if (viewId === 'library') renderLibrary();
  if (viewId === 'heat') renderHeat();
  if (viewId === 'teach') renderTeach();
  if (viewId === 'settings') renderSettings();
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Universal UI Toast Alert
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

/* ============ RENDER HOME VIEW ============ */
function strengthColor(v) {
  if (v === null) return 'var(--ink3)';
  if (v >= 80) return 'var(--acc)';
  if (v >= 55) return '#a2c94a'; // moderate green-yellow
  if (v >= 30) return 'var(--warn)';
  return 'var(--danger)';
}

function cellBg(v) {
  if (v === null) return '';
  if (v >= 80) return '#2fae72';
  if (v >= 55) return '#6fbf5a';
  if (v >= 35) return '#cfc64d';
  if (v >= 18) return '#e8a24d';
  return '#e05656';
}

function renderHome() {
  // Select daily wisdom
  const dayIndex = new Date().getDate() % WISDOM.length;
  const wisdom = WISDOM[dayIndex];
  
  const tag = document.getElementById('wisTag');
  const text = document.getElementById('wisText');
  const src = document.getElementById('wisSrc');
  
  if (tag) tag.textContent = wisdom.tag;
  if (text) text.textContent = wisdom.t;
  if (src) src.textContent = wisdom.s;
  
  // Calculate strengths
  const memorized = getMemorizedAyahs();
  let strongCount = 0;
  let weakCount = 0;
  let dueArabic = 0;
  let dueMeaning = 0;
  
  memorized.forEach(ayah => {
    const combinedStr = getCombinedStrength(ayah.id);
    if (combinedStr !== null) {
      if (combinedStr >= 70) strongCount++;
      if (combinedStr < 40) weakCount++;
    }
    if (isAyahDue(ayah.id, 'a')) dueArabic++;
    if (isAyahDue(ayah.id, 'm')) dueMeaning++;
  });
  
  const streakBox = document.getElementById('stStreak');
  const strongBox = document.getElementById('stStrong');
  const weakBox = document.getElementById('stWeak');
  
  if (streakBox) streakBox.textContent = `${S.streak} 🔥`;
  if (strongBox) strongBox.textContent = strongCount;
  if (weakBox) weakBox.textContent = weakCount;
  
  // Goal progress ring
  const doneCount = S.today.day === TODAY_STRING ? S.today.done : 0;
  const goalTarget = S.dailyGoal || 10;
  
  const ringTxt = document.getElementById('ringTxt');
  const ringFg = document.getElementById('ringFg');
  
  if (ringTxt) ringTxt.textContent = `${doneCount}/${goalTarget}`;
  if (ringFg) {
    const circum = 201; // 2 * pi * 32
    const offset = circum * (1 - Math.min(1, doneCount / goalTarget));
    ringFg.style.strokeDashoffset = offset;
  }
  
  const goalTitle = document.getElementById('goalTitle');
  const goalSub = document.getElementById('goalSub');
  
  if (goalTitle) {
    goalTitle.textContent = doneCount >= goalTarget ? "Goal Complete ✓" : "Today's Revision";
  }
  if (goalSub) {
    goalSub.textContent = doneCount >= goalTarget
      ? "Beautiful consistency. Tomorrow the map shifts again."
      : (weakCount > 0
          ? `${weakCount} weak spot${weakCount > 1 ? 's' : ''} pulled to the front of your queue.`
          : "Weak spots rise to the front — little and often.");
  }
  
  const pillAr = document.getElementById('pillAr');
  const pillEn = document.getElementById('pillEn');
  
  if (pillAr) pillAr.textContent = `${dueArabic} Arabic due`;
  if (pillEn) pillEn.textContent = `${dueMeaning} meaning due`;
  
  // Set CTA Sub
  const ctaSub = document.getElementById('ctaSub');
  const totalDue = dueArabic + dueMeaning;
  if (ctaSub) {
    if (!memorized.length) {
      ctaSub.textContent = "Choose memorized surahs in Library first";
    } else if (totalDue > 0) {
      ctaSub.textContent = `${totalDue} checks waiting in practice queue`;
    } else {
      ctaSub.textContent = "All fresh — light maintenance checks";
    }
  }
  
  // Navigation FAB Badge
  const badge = document.getElementById('dueBdg');
  if (badge) {
    if (totalDue > 0) {
      badge.style.display = 'grid';
      badge.textContent = totalDue > 99 ? '99+' : totalDue;
    } else {
      badge.style.display = 'none';
    }
  }
  
  // Needs Attention List (Weakest 5 due or fade ayahs)
  const dl = document.getElementById('dueList');
  if (!dl) return;
  
  if (!memorized.length) {
    dl.innerHTML = `
      <div class="empty">
        <span class="big">☾</span>
        Nothing tracked yet.<br>Go to the <b>Library</b> tab to select the surahs you have memorized.
      </div>`;
    return;
  }
  
  const attentionItems = memorized.map(ayah => {
    return {
      ...ayah,
      combined: getCombinedStrength(ayah.id),
      sa: calculateStrength(ayah.id, 'a'),
      sm: calculateStrength(ayah.id, 'm')
    };
  })
  .filter(item => item.combined === null || item.combined < 85)
  .sort((a, b) => (a.combined ?? -1) - (b.combined ?? -1))
  .slice(0, 5);
  
  if (attentionItems.length === 0) {
    dl.innerHTML = `
      <div class="empty">
        <span class="big">✦</span>
        Everything is fresh in memory!<br>The map is green. Take a rest, or share your knowledge in the Teach tab.
      </div>`;
    return;
  }
  
  dl.innerHTML = attentionItems.map(item => {
    const comb = item.combined;
    const col = strengthColor(comb);
    // Suggest track that is weaker
    const trackName = (item.sa !== null && item.sa <= (item.sm ?? 999)) ? 'Recitation' : 'Meaning';
    return `
      <button class="due-item" onclick="openAyahSheet('${item.id}')">
        <span class="strength-dot" style="background:${col}1c;color:${col}">${comb === null ? '—' : comb + '%'}</span>
        <span style="min-width:0">
          <span class="ref">${item.s.name} · Ayah ${item.ai + 1}</span>
          <span class="ar-line">${item.ar}</span>
        </span>
        <span class="why">
          <b style="color:${col}">${comb === null ? 'New' : (comb < 35 ? 'Fading' : 'Due')}</b>
          <span>${trackName}</span>
        </span>
      </button>
    `;
  }).join('');
}

/* ============ RENDER LIBRARY VIEW ============ */
let activeFilter = 'all';
let searchQuery = '';

function renderLibrary() {
  const container = document.getElementById('libraryList');
  if (!container) return;
  
  let html = '';
  
  BANK.forEach(category => {
    // Apply tab categorization filter
    if (activeFilter !== 'all' && activeFilter !== 'known') {
      if (category.id !== activeFilter) return;
    }
    
    // Filter surahs inside category
    const filteredSurahs = category.surahs.filter(surah => {
      // Memorized filter
      if (activeFilter === 'known' && !S.memorized[surah.n]) {
        return false;
      }
      // Search text query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const numMatch = surah.n.toString() === query;
        const nameMatch = surah.name.toLowerCase().includes(query);
        const transMatch = surah.en.toLowerCase().includes(query);
        const arMatch = surah.ar.includes(query);
        return numMatch || nameMatch || transMatch || arMatch;
      }
      return true;
    });
    
    if (filteredSurahs.length === 0) return;
    
    html += `
      <div class="cat-label">
        <span class="dot"></span>
        <h3>${category.cat}</h3>
        <span class="line"></span>
      </div>
    `;
    
    filteredSurahs.forEach(surah => {
      const isKnown = !!S.memorized[surah.n];
      const ayahIds = surah.ayahs.map((_, idx) => idOf(surah.n, idx));
      
      let overallSum = 0;
      let testedCount = 0;
      let arabicSum = 0;
      let arabicTested = 0;
      let meaningSum = 0;
      let meaningTested = 0;
      
      ayahIds.forEach(id => {
        const aStrength = calculateStrength(id, 'a');
        const mStrength = calculateStrength(id, 'm');
        const comb = getCombinedStrength(id);
        
        if (aStrength !== null) { arabicSum += aStrength; arabicTested++; }
        if (mStrength !== null) { meaningSum += mStrength; meaningTested++; }
        if (comb !== null) { overallSum += comb; testedCount++; }
      });
      
      const overallAvg = testedCount ? Math.round(overallSum / testedCount) : 0;
      const arabicAvg = arabicTested ? Math.round(arabicSum / arabicTested) : 0;
      const meaningAvg = meaningTested ? Math.round(meaningSum / meaningTested) : 0;
      
      html += `
        <div class="surah-card">
          <div class="surah-top">
            <span class="surah-num">
              <svg viewBox="0 0 40 40">
                <path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              ${surah.n}
            </span>
            <div class="surah-meta">
              <b>${surah.name}</b>
              <span>${surah.en} · ${surah.ayahs.length} Ayah${surah.ayahs.length > 1 ? 's' : ''}${surah.seg ? ' · Segmented' : ''}</span>
            </div>
            <span class="surah-arname">${surah.ar}</span>
            <button class="know-toggle ${isKnown ? 'on' : ''}" data-sn="${surah.n}">
              ${isKnown ? '✓ Known' : 'I know this'}
            </button>
          </div>
          ${isKnown ? `
            <div class="prog-track">
              <div class="prog-fill" style="width:${overallAvg}%"></div>
            </div>
            <div class="prog-labels">
              <span>Overall Strength</span>
              <span>${overallAvg}%</span>
            </div>
            <div class="dual">
              <span class="seg arab">AR<span class="bar"><i style="width:${arabicAvg}%"></i></span></span>
              <span class="seg mean">EN<span class="bar"><i style="width:${meaningAvg}%"></i></span></span>
            </div>
          ` : ''}
        </div>
      `;
    });
  });
  
  container.innerHTML = html || `<div class="empty" style="margin-top:20px"><span class="big">🔍</span>No surahs found matching "${searchQuery}".</div>`;
  
  // Bind click toggles
  container.querySelectorAll('.know-toggle').forEach(btn => {
    btn.onclick = (e) => {
      const sn = parseInt(e.target.dataset.sn);
      toggleSurahMemorized(sn);
    };
  });
}

function toggleSurahMemorized(sn) {
  S.memorized[sn] = !S.memorized[sn];
  saveState();
  renderLibrary();
  renderHome();
  toast(S.memorized[sn] ? "Surah added to memorized list — revision queue updated" : "Removed surah from memorized list");
}

/* ============ RENDER HEAT MAP VIEW ============ */
function renderHeat() {
  const wrap = document.getElementById('heatWrap');
  if (!wrap) return;
  
  let html = '';
  let activeSurahs = 0;
  
  BANK.forEach(category => {
    category.surahs.forEach(surah => {
      if (!S.memorized[surah.n]) return;
      activeSurahs++;
      
      let sumStrength = 0;
      let count = 0;
      
      const cells = surah.ayahs.map((_, idx) => {
        const id = idOf(surah.n, idx);
        const comb = getCombinedStrength(id);
        const aStr = calculateStrength(id, 'a');
        const mStr = calculateStrength(id, 'm');
        
        if (comb !== null) {
          sumStrength += comb;
          count++;
        }
        
        const cellBackground = comb === null ? '' : `background:${cellBg(comb)}`;
        const badgeColor = mStr === null ? 'transparent' : cellBg(mStr);
        
        return `
          <button class="hm-cell ${comb === null ? 'untouched' : ''}" style="${cellBackground}" data-id="${id}" aria-label="Ayah ${idx + 1} of Surah ${surah.name}, strength ${comb === null ? 'New' : comb + '%'}">
            ${idx + 1}
            ${comb !== null ? `<span class="half" style="background:${badgeColor};border:1.2px solid rgba(0,0,0,0.2)"></span>` : ''}
          </button>
        `;
      }).join('');
      
      const averageStr = count ? Math.round(sumStrength / count) : 0;
      
      html += `
        <div class="hm-surah">
          <div class="hm-head">
            <b>${surah.name} <span style="font-weight:600;color:var(--ink3)">· ${surah.ar}</span></b>
            <span>${averageStr}% alive</span>
          </div>
          <div class="hm-grid">${cells}</div>
        </div>
      `;
    });
  });
  
  wrap.innerHTML = html || `
    <div class="empty" style="margin-top:20px">
      <span class="big">▦</span>
      No active heat map.<br>Mark the surahs you've memorized in the <b>Library</b> to see your heat map bloom.
    </div>`;
  
  // Bind click handlers to cells
  wrap.querySelectorAll('.hm-cell').forEach(cell => {
    cell.onclick = () => {
      openAyahSheet(cell.dataset.id);
    };
  });
}

/* ============ AYAH DETAIL BOTTOM SHEET ============ */
export function openAyahSheet(id) {
  const flat = getFlatAyahs();
  const ayah = flat.find(x => x.id === id);
  if (!ayah) return;
  
  const aStr = calculateStrength(id, 'a');
  const mStr = calculateStrength(id, 'm');
  
  const generateMeter = (label, strengthVal, typeKey) => {
    const statsBlock = S.stats[id]?.[typeKey];
    let nextStr = 'Not yet tested';
    if (statsBlock && statsBlock.last) {
      if (statsBlock.iv < 1) {
        nextStr = `In ${Math.max(1, Math.round(statsBlock.iv * 24))} hours`;
      } else {
        const roundedDays = Math.round(statsBlock.iv);
        nextStr = `In ${roundedDays} day${roundedDays !== 1 ? 's' : ''}`;
      }
    }
    const color = strengthColor(strengthVal);
    
    return `
      <div class="meter">
        <small>${label}</small>
        <b style="color:${color}">${strengthVal === null ? '—' : strengthVal + '%'}</b>
        <div class="bar">
          <i style="width:${strengthVal ?? 0}%;background:${color}"></i>
        </div>
        <span class="nxt">Due: ${nextStr}</span>
      </div>
    `;
  };
  
  const sheetContent = document.getElementById('ayahSheetContent');
  if (sheetContent) {
    sheetContent.innerHTML = `
      <div class="grab"></div>
      <span class="ref">${ayah.s.name} · Ayah ${ayah.ai + 1}</span>
      <div class="ar-big">${ayah.ar}</div>
      <div class="en-big">${ayah.en}</div>
      <div class="meter-row">
        ${generateMeter('Recitation', aStr, 'a')}
        ${generateMeter('Translation', mStr, 'm')}
      </div>
      <button class="cta" style="margin-top:2px" id="btnSheetReview">
        <span>Review Now</span>
        <span class="arrow">→</span>
      </button>
    `;
    
    document.getElementById('btnSheetReview').onclick = () => {
      const dlg = document.getElementById('dlgAyahDetail');
      if (dlg) dlg.close();
      launchSingleAyahPractice(id);
    };
  }
  
  const dlg = document.getElementById('dlgAyahDetail');
  if (dlg) dlg.showModal();
}

function launchSingleAyahPractice(id) {
  const flat = getFlatAyahs();
  const ayah = flat.find(x => x.id === id);
  if (!ayah) return;
  
  // Custom session parameters for single ayah
  practiceQueue = [{ ...ayah, combined: getCombinedStrength(ayah.id) ?? -1 }];
  practiceIndex = 0;
  practiceMode = 'dual';
  currentPhase = 'a';
  sessionStats = { a: 0, m: 0, againCount: 0 };
  
  verifyDailyStreak();
  document.getElementById('practice').classList.add('open');
  renderPracticeCard();
}

/* ============ PRACTICE SESSION LOGIC ============ */
let practiceQueue = [];
let practiceIndex = 0;
let practiceMode = 'dual'; // 'dual' | 'arabic' | 'meaning'
let currentPhase = 'a';    // 'a' (recite) | 'm' (meaning)
let sessionStats = { a: 0, m: 0, againCount: 0 };
let currentSessionSize = 10;

export function openSessionConfig() {
  const memorized = getMemorizedAyahs();
  if (!memorized.length) {
    toast("Mark memorized surahs in Library first");
    go('library');
    return;
  }
  
  // Build queue to check if anything is due
  const dueList = memorized.filter(x => isAyahDue(x.id, 'a') || isAyahDue(x.id, 'm'));
  if (dueList.length === 0) {
    toast("Everything is fresh! Running a light reinforcement session.");
  }
  
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.showModal();
}

function buildRevisionQueue(size) {
  const memorized = getMemorizedAyahs();
  // Filter due ayahs
  const dueItems = memorized.filter(x => isAyahDue(x.id, 'a') || isAyahDue(x.id, 'm'))
    .map(x => ({ ...x, combined: getCombinedStrength(x.id) ?? -1 }));
  
  // Sort weakest first
  dueItems.sort((a, b) => a.combined - b.combined);
  
  let queue = dueItems.slice(0, size);
  
  // If queue is not full, fill with other weak/fading/least tested memorized items
  if (queue.length < size) {
    const existingIds = new Set(queue.map(q => q.id));
    const extraItems = memorized.filter(x => !existingIds.has(x.id))
      .map(x => ({ ...x, combined: getCombinedStrength(x.id) ?? -1 }));
    // Sort so weakest is first
    extraItems.sort((a, b) => a.combined - b.combined);
    queue = queue.concat(extraItems.slice(0, size - queue.length));
  }
  
  return queue;
}

function startPracticeSession() {
  // Read config settings
  const activeSizeBtn = document.querySelector('#sessSizeSelect button.active');
  const activeModeBtn = document.querySelector('#sessModeSelect button.active');
  
  const size = activeSizeBtn ? parseInt(activeSizeBtn.dataset.val) : 10;
  practiceMode = activeModeBtn ? activeModeBtn.dataset.val : 'dual';
  
  practiceQueue = buildRevisionQueue(size);
  practiceIndex = 0;
  currentPhase = practiceMode === 'meaning' ? 'm' : 'a';
  sessionStats = { a: 0, m: 0, againCount: 0 };
  
  verifyDailyStreak();
  
  // Close configuration dialog
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.close();
  
  document.getElementById('practice').classList.add('open');
  renderPracticeCard();
}

export function endSession(finished) {
  document.getElementById('practice').classList.remove('open');
  renderHome();
  if (finished !== false) {
    toast("Practice session successfully saved! ✦");
  }
}

function renderPracticeCard() {
  const ayah = practiceQueue[practiceIndex];
  const total = practiceQueue.length;
  
  const pFill = document.getElementById('pFill');
  const pCount = document.getElementById('pCount');
  const pBody = document.getElementById('pBody');
  
  if (pFill) pFill.style.width = `${(practiceIndex / total) * 100}%`;
  if (pCount) pCount.textContent = `${practiceIndex + 1}/${total}`;
  
  const isArabicPhase = currentPhase === 'a';
  
  if (pBody) {
    pBody.innerHTML = `
      <span class="phase-chip ${isArabicPhase ? 'recite' : 'mean'}">
        ${isArabicPhase ? '① Recite from Memory' : '② Recall Translation Meaning'}
      </span>
      <div class="p-card">
        <span class="p-ref">${ayah.s.name} · Ayah ${ayah.ai + 1}</span>
        ${isArabicPhase ? `
          <p class="p-prompt">Close your eyes. Recite the ayah aloud from memory — then tap to check.</p>
          <div class="hidden-text" id="hidTextReveal">
            <span class="tap">
              <span class="eye">◉</span>
              ${L.tapReveal} Arabic
            </span>
          </div>
        ` : `
          <div class="ar-big" style="margin-top:16px;">${ayah.ar}</div>
          <p class="p-prompt">What does this ayah mean? Recite the translation in your own words — then tap to check.</p>
          <div class="hidden-text" id="hidTextReveal">
            <span class="tap">
              <span class="eye">◈</span>
              ${L.tapReveal} Meaning
            </span>
          </div>
        `}
      </div>
      <div class="grade-row" id="practiceGradeRow" style="opacity:0.35;pointer-events:none">
        ${L.grades.map((gradeLabel, idx) => `
          <button class="grade g${idx + 1}" data-g="${idx + 1}">
            ${gradeLabel}
            <small>${L.gradeSub[idx]}</small>
          </button>
        `).join('')}
      </div>
    `;
    
    const revealTrigger = document.getElementById('hidTextReveal');
    const gradeRow = document.getElementById('practiceGradeRow');
    
    if (revealTrigger) {
      revealTrigger.onclick = () => {
        revealTrigger.classList.add('revealed');
        if (!isArabicPhase) {
          revealTrigger.classList.add('gold');
        }
        
        revealTrigger.innerHTML = isArabicPhase
          ? `<span class="reveal-ar">${ayah.ar}</span>`
          : `<span class="reveal-en">${ayah.en}</span>`;
        
        // Unlock grading
        if (gradeRow) {
          gradeRow.style.opacity = '1';
          gradeRow.style.pointerEvents = 'auto';
        }
      };
    }
    
    // Bind grades buttons
    if (gradeRow) {
      gradeRow.querySelectorAll('button').forEach(btn => {
        btn.onclick = (e) => {
          const rating = parseInt(btn.dataset.g || btn.closest('button').dataset.g);
          gradePractice(rating);
        };
      });
    }
  }
}

function gradePractice(rating) {
  const ayah = practiceQueue[practiceIndex];
  
  gradeAyah(ayah.id, currentPhase, rating);
  
  if (rating === 1) sessionStats.againCount++;
  sessionStats[currentPhase]++;
  
  // Track daily tasks
  S.today.done++;
  saveState();
  
  // Handle tracks transitions
  if (practiceMode === 'dual' && currentPhase === 'a') {
    currentPhase = 'm';
    renderPracticeCard();
    return;
  }
  
  // Move to next ayah card
  currentPhase = practiceMode === 'meaning' ? 'm' : 'a';
  
  if (practiceIndex + 1 >= practiceQueue.length) {
    renderPracticeSummary();
  } else {
    practiceIndex++;
    renderPracticeCard();
  }
}

function renderPracticeSummary() {
  const pFill = document.getElementById('pFill');
  const pCount = document.getElementById('pCount');
  const pBody = document.getElementById('pBody');
  
  if (pFill) pFill.style.width = '100%';
  if (pCount) pCount.textContent = '✓';
  
  const dailyDone = S.today.day === TODAY_STRING ? S.today.done : 0;
  const goalTarget = S.dailyGoal || 10;
  
  if (pBody) {
    pBody.innerHTML = `
      <div class="summary">
        <span class="moon">${sessionStats.againCount ? '🌱' : '☾'}</span>
        <h2>${sessionStats.againCount ? "Patience Reinforces the Root" : "Session Completed"}</h2>
        <p>
          ${sessionStats.againCount 
            ? `${sessionStats.againCount} ayah${sessionStats.againCount > 1 ? 's' : ''} flagged for review soon. That is the system doing its work. "Indeed, Allah is with the patient."`
            : "Every revision strengthens the heart. What is solid today will wait longer before asking for you again."}
        </p>
        <div class="sum-stats">
          <div class="stat"><b class="strong">${sessionStats.a}</b><span>Recitations</span></div>
          <div class="stat"><b style="color:var(--gold)">${sessionStats.m}</b><span>Meanings</span></div>
        </div>
        <button class="cta" onclick="endSession()">
          <span>Return · ${Math.min(dailyDone, goalTarget)}/${goalTarget} Goal Check${Math.min(dailyDone, goalTarget) !== 1 ? 's' : ''}</span>
          <span class="arrow">✓</span>
        </button>
      </div>
    `;
  }
}

/* ============ RENDER TEACH VIEW ============ */
function renderTeach() {
  const taughtCountSpan = document.getElementById('taughtCount');
  const teachList = document.getElementById('teachList');
  if (!teachList) return;
  
  const memorized = getMemorizedAyahs();
  // Filter ayahs that are strong enough to teach (strength >= 60%)
  const teachable = memorized.map(ayah => {
    return {
      ...ayah,
      combined: getCombinedStrength(ayah.id)
    };
  })
  .filter(item => item.combined !== null && item.combined >= 60)
  .sort((a, b) => b.combined - a.combined)
  .slice(0, 3);
  
  const taughtKeys = Object.keys(S.taught);
  const countShared = taughtKeys.length;
  if (taughtCountSpan) {
    taughtCountSpan.textContent = countShared > 0 ? `${countShared} shared so far ✦` : "plant your first seed";
  }
  
  if (teachable.length === 0) {
    teachList.innerHTML = `
      <div class="empty">
        <span class="big">❖</span>
        No ayahs strong enough yet.<br>Practice and strengthen your memorization above 60% strength to share them with others.
      </div>
    `;
    return;
  }
  
  teachList.innerHTML = teachable.map(item => {
    const isSharedToday = S.taught[item.id] === TODAY_STRING;
    return `
      <div class="teach-card">
        <span class="t-ref">${item.s.name} · Ayah ${item.ai + 1} — ${item.combined}% Strong</span>
        <div class="t-ar">${item.ar}</div>
        <div class="t-en">${item.en}</div>
        <button class="taught-btn ${isSharedToday ? 'done' : ''}" data-id="${item.id}" ${isSharedToday ? 'disabled' : ''}>
          ${isSharedToday ? '✓ Shared today — barakAllahu feek' : 'I taught this to someone today'}
        </button>
      </div>
    `;
  }).join('');
  
  // Bind taught button clicks
  teachList.querySelectorAll('.taught-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      recordTaughtAyah(id, btn);
    };
  });
}

function recordTaughtAyah(id, btn) {
  if (S.taught[id] === TODAY_STRING) return;
  S.taught[id] = TODAY_STRING;
  
  // Teaching reinforces learning: extend intervals of both tracks by 30%
  const aStat = getStatBlock(id, 'a');
  const mStat = getStatBlock(id, 'm');
  
  if (aStat && aStat.last) aStat.iv = Math.min(95, aStat.iv * 1.3);
  if (mStat && mStat.last) mStat.iv = Math.min(95, mStat.iv * 1.3);
  
  saveState();
  
  btn.classList.add('done');
  btn.setAttribute('disabled', 'true');
  btn.textContent = '✓ Shared today — barakAllahu feek';
  
  toast("Teaching has reinforced your memory! Intervals extended. ✦");
  setTimeout(() => {
    renderTeach();
    renderHome();
  }, 1000);
}

/* ============ RENDER SETTINGS VIEW ============ */
function renderSettings() {
  const goalSelect = document.getElementById('goalSelect');
  if (goalSelect) {
    goalSelect.value = S.dailyGoal || 10;
  }
}

// Export state as JSON file
function exportState() {
  const dataStr = JSON.stringify(S, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `hifzflow_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast("Progress backup file downloaded successfully! ✦");
}

// Import state from JSON file
function importState(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && typeof parsed === 'object') {
        // Validate required keys
        if (parsed.memorized && parsed.stats) {
          S = { ...S, ...parsed };
          saveState();
          applyPreferences();
          renderSettings();
          toast("Progress successfully imported! ✦");
          
          setTimeout(() => {
            go('home');
          }, 1200);
        } else {
          toast("Invalid backup file: missing core records");
        }
      }
    } catch (err) {
      toast("Error parsing backup JSON file");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// Wipe state and start fresh
function resetApplication() {
  if (confirm("WARNING: This will wipe all your memorized surahs, repetition history, and daily streaks. This action cannot be undone. Are you absolutely sure?")) {
    localStorage.removeItem(KEY);
    S = {
      memorized: {},
      stats: {},
      taught: {},
      streak: 0,
      lastDay: null,
      today: { day: "", done: 0 },
      theme: "dark",
      zoom: 1,
      onboarded: false,
      dailyGoal: 10
    };
    saveState();
    
    toast("Application reset. Starting fresh.");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }
}

/* ============ ONBOARDING PANEL ============ */
function renderOnboardList() {
  const obList = document.getElementById('obList');
  if (!obList) return;
  
  obList.innerHTML = BANK.map(category => {
    return `
      <div class="cat-label">
        <span class="dot"></span>
        <h3>${category.cat}</h3>
        <span class="line"></span>
      </div>
    ` + category.surahs.map(surah => {
      const isKnown = !!S.memorized[surah.n];
      return `
        <div class="surah-card">
          <div class="surah-top">
            <span class="surah-num">
              <svg viewBox="0 0 40 40">
                <path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              ${surah.n}
            </span>
            <div class="surah-meta">
              <b>${surah.name}</b>
              <span>${surah.ayahs.length} Ayah${surah.ayahs.length > 1 ? 's' : ''}</span>
            </div>
            <span class="surah-arname">${surah.ar}</span>
            <button class="know-toggle ${isKnown ? 'on' : ''}" data-sn="${surah.n}">
              ${isKnown ? '✓ Known' : 'I know this'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }).join('');
  
  // Bind know toggles on onboarding
  obList.querySelectorAll('.know-toggle').forEach(btn => {
    btn.onclick = (e) => {
      const sn = parseInt(e.target.dataset.sn);
      S.memorized[sn] = !S.memorized[sn];
      btn.classList.toggle('on', !!S.memorized[sn]);
      btn.textContent = S.memorized[sn] ? '✓ Known' : 'I know this';
      saveState();
    };
  });
}

window.finishOnboard = function() {
  S.onboarded = true;
  saveState();
  const obOverlay = document.getElementById('onboard');
  if (obOverlay) obOverlay.classList.remove('open');
  go('home');
  toast("Bismillah — Your revision map is ready! ✦");
};

/* ============ INTERACTIVE EVENT LISTENERS & SETUP ============ */
function setupEventListeners() {
  // Nav buttons click
  document.querySelectorAll('nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      go(btn.dataset.v);
    });
  });
  
  // Floating practice FAB click
  const navPracticeBtn = document.getElementById('navPracticeBtn');
  if (navPracticeBtn) {
    navPracticeBtn.onclick = () => {
      openSessionConfig();
    };
  }
  
  // Home CTA start session
  const ctaStart = document.getElementById('ctaStart');
  if (ctaStart) {
    ctaStart.onclick = () => {
      openSessionConfig();
    };
  }
  
  // Theme Toggle
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      S.theme = S.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyPreferences();
      toast(S.theme === 'dark' ? "Switched to Dark Mode" : "Switched to Light Mode");
    };
  }
  
  // Text Size Scale (Zoom)
  document.querySelectorAll('#zoomer button').forEach(btn => {
    btn.onclick = () => {
      S.zoom = parseFloat(btn.dataset.z);
      saveState();
      applyPreferences();
      toast(S.zoom > 1 ? "Text size enlarged" : `Zoom set to ${Math.round(S.zoom * 100)}%`);
    };
  });
  
  // Copy daily quote to clipboard
  const copyBtn = document.getElementById('shareWisdom');
  if (copyBtn) {
    copyBtn.onclick = () => {
      const quoteText = document.getElementById('wisText').textContent;
      const quoteSrc = document.getElementById('wisSrc').textContent;
      const quoteTag = document.getElementById('wisTag').textContent;
      
      const fullShareText = `[${quoteTag}] ${quoteText} — ${quoteSrc}`;
      navigator.clipboard.writeText(fullShareText).then(() => {
        toast("Wisdom quote copied to clipboard! ✦");
      }).catch(err => {
        toast("Unable to copy to clipboard");
      });
    };
  }
  
  // Library Search
  const libSearch = document.getElementById('libSearch');
  if (libSearch) {
    libSearch.oninput = (e) => {
      searchQuery = e.target.value;
      renderLibrary();
    };
  }
  
  // Library Category Chips Filters
  document.querySelectorAll('#libFilters .filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#libFilters .filter-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      activeFilter = btn.dataset.filter;
      renderLibrary();
    };
  });
  
  // Session Settings Size Options
  document.querySelectorAll('#sessSizeSelect button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sessSizeSelect button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
  
  // Session Settings Mode Options
  document.querySelectorAll('#sessModeSelect button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sessModeSelect button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
  
  // Start session trigger
  const btnLaunch = document.getElementById('btnLaunchSession');
  if (btnLaunch) {
    btnLaunch.onclick = () => {
      startPracticeSession();
    };
  }
  
  // Settings Change Target
  const goalSelect = document.getElementById('goalSelect');
  if (goalSelect) {
    goalSelect.onchange = (e) => {
      S.dailyGoal = parseInt(e.target.value);
      saveState();
      renderHome();
      toast(`Daily check goal set to ${S.dailyGoal}`);
    };
  }
  
  // Settings Reset Button
  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.onclick = () => {
      resetApplication();
    };
  }
  
  // Settings Import/Export
  const btnExport = document.getElementById('btnExport');
  if (btnExport) {
    btnExport.onclick = () => {
      exportState();
    };
  }
  
  const importInput = document.getElementById('importFile');
  if (importInput) {
    importInput.onchange = (e) => {
      importState(e);
    };
  }
  
  // Close dialog on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const practiceView = document.getElementById('practice');
      if (practiceView && practiceView.classList.contains('open')) {
        endSession(false);
      }
    }
  });
}

/* ============ APPLICATION BOOTSTRAP ============ */
function boot() {
  loadState();
  applyPreferences();
  verifyDailyStreak();
  setupEventListeners();
  
  if (!S.onboarded) {
    const obOverlay = document.getElementById('onboard');
    if (obOverlay) obOverlay.classList.add('open');
    renderOnboardList();
  } else {
    go('home');
  }
}

// Trigger initial boot load
document.addEventListener('DOMContentLoaded', () => {
  boot();
});
