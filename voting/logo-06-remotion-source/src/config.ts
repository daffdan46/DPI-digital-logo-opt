/**
 * Konfigurasi terpusat Logo 06 "The Right Match" (Matching → Sparkle → Compass).
 * Dua bentuk asli (kiri besar = customer needs, kanan kecil = solution possibilities) bergerak pada SATU timeline global
 * menuju posisi final. Semua overlay (guide, kontur, marker, bintang/kompas pembanding) terpisah dari artwork dan hilang
 * sebelum Scene 7. Waktu: frame @ 30 fps. Geometri: unit artwork (viewBox 1080). Path ada di logoData.ts (dari opt6.svg).
 */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
// Spec 20 dtk (600 frame). Diperpanjang agar semua teks terbaca (QA: "text readable at normal playback speed"): lihat README.
export const BODY_FRAMES = 700;
/** VO: slot audio (public/vo.wav). enabled=false sampai file suara ada. tail = frame hold akhir agar penutup VO muat. */
export const VO = {enabled: false, file: 'vo.wav', offset: 0, volume: 1, tail: 80} as const;
export const DURATION = BODY_FRAMES + VO.tail;

export const COLORS = {red: '#E42313', white: '#FFFFFF', grey: '#706F6F', ink: '#1D1D1B'} as const;
export const FONT_STACK = "'Gotham', 'Gotham Medium', 'Gotham SSm', 'Montserrat', 'Helvetica Neue', Arial, sans-serif";

export const COPY = {
  s1: {left: 'CUSTOMER NEEDS', right: 'SOLUTION POSSIBILITIES', title: 'Different Forms', support: 'Different needs. Different possibilities.'},
  s2: {title: 'Finding Compatibility', support: 'The right match is about relevance.'},
  s3: {title: 'The Meeting Point', support: 'Where needs meet relevant solutions.'},
  s4: {
    rows: [
      {label: 'DIFFERENT FORMS', lines: ['Different customer needs', 'and solution possibilities']},
      {label: 'MEETING POINT', lines: ['Matching and relevance']},
      {label: 'UNIFIED COMPOSITION', lines: ['Complementarity']},
    ],
    statement: "Different Doesn't Mean Disconnected.",
    title: 'The Right Match',
    support: 'Solusi yang tepat bukan harus sama, tetapi harus sesuai dengan kebutuhan.',
  },
  s5: {eyebrow: 'Sparkle-Like Silhouette', title: 'The Spark of Insight', support: 'Connection creates clarity.', guide: 'COMPARISON GUIDE'},
  s6: {eyebrow: 'Compass-Like Silhouette', title: 'The Compass of Solutions', support: 'Guidance toward the right direction.'},
  s7: {
    title: 'THE RIGHT MATCH',
    line1: 'Different Forms. One Meaningful Connection.',
    line2: 'Mempertemukan kebutuhan dengan solusi yang tepat.',
    disclaimer: 'Narasi presentasi simbolik yang diusulkan, bukan tagline atau makna resmi',
  },
} as const;

/** Visibilitas anotasi (matikan satu per satu tanpa menyentuh logika scene). */
export const ANNOTATIONS = {
  labels: true, // Scene 1: label di bawah tiap bentuk
  relationGuides: true, // Scene 2: axis + tick apex + konektor
  meetingMarker: true, // Scene 3 & 4: ring + crosshair di titik temu
  contour: true, // Scene 4-6: kontur gabungan tipis
  breakdown: true, // Scene 4: tiga anotasi
  sparkle: true, // Scene 5: diagonal X + titik ujung + bintang pembanding
  compass: true, // Scene 6: sumbu + kompas pembanding
  wordmark: true,
  disclaimer: true,
};

// ── Layout (canvas 1920x1080) ───────────────────────────────────────────────
export const LOGO_SCALE = 1.45;
export const LOGO_CENTER_Y = 400;
export const TEXT = {labelY: 756, eyebrowY: 800, titleY: 862, supportY: 922, support2Y: 966, disclaimerY: 1030};
export const SIDE = {x: 1330, rowY: [305, 425, 545] as const}; // kolom anotasi kanan (S4)
export const GUIDE_POS = {x: 1500, y: 400, starR: 150, starInner: 26, circleR: 190}; // panel pembanding kanan (S5-S6)

// ── Easing: SEMUA Easy Ease (tanpa linear / ease-out saja / bounce) ─────────
export const EASE = {
  easy: [0.33, 0, 0.67, 1], // teks, fade, muncul
  inOut: [0.65, 0, 0.35, 1], // wipe, trace, pulse
  assemble: [0.42, 0, 0.22, 1], // perpindahan dua bentuk: start landai, deselerasi panjang
  rotate: [0.45, 0, 0.25, 1], // rotasi guide pembanding
} as const;

export const HIGHLIGHT = {dimFocus: 0.45, lineWidth: 1.2};

/**
 * Posisi awal dua bentuk (unit artwork). dist = jarak horizontal ke posisi final (kiri geser kiri, kanan geser kanan),
 * dy = offset vertikal kecil (lintasan sedikit melengkung), scale awal, drift = geser keluar tambahan saat muncul.
 * Jarak berbeda agar seimbang secara persepsi (bentuk kiri lebih berat → jarak lebih pendek).
 */
export const FORM_START: Record<string, {dist: number; dy: number; scale: number; drift: number; side: -1 | 1}> = {
  left: {dist: 164, dy: 12, scale: 0.94, drift: 16, side: -1},
  right: {dist: 208, dy: -17, scale: 0.93, drift: 16, side: 1},
};
export const FORM_IDS = ['left', 'right'] as const;
export const Y_SHARE = 0.7; // jendela gerak vertikal = 70% durasi gerak horizontal

type R2 = readonly [number, number];
type R4 = readonly [number, number, number, number];

export const TL = {
  // S1 Different Forms
  appear: {left: 8, right: 18} as Record<string, number>,
  appearDur: 28,
  fade: 14,
  s1: {labelL: [20, 34], labelR: [28, 42], title: [30, 44], support: [42, 56], out: [80, 90]} as Record<string, R2>,
  // S2 Finding Compatibility → S3 The Meeting Point: satu timeline global
  move: {left: [92, 188], right: [96, 192]} as Record<string, R2>,
  s2: {title: [98, 112], support: [110, 126], out: [168, 178]} as Record<string, R2>,
  gRel: {draw: [104, 136] as R2, out: [240, 256] as R2},
  s3: {title: [188, 202], support: [200, 216], out: [254, 266]} as Record<string, R2>,
  ring: {draw: [176, 198] as R2, cross: [184, 206] as R2, out: [250, 262] as R2},
  // S4 The Right Match
  rows: [[274, 286], [290, 302], [306, 318]] as R2[],
  rowsOut: [352, 362] as R2,
  focusL: [276, 284, 292, 300] as R4,
  focusR: [292, 300, 308, 316] as R4,
  ring4: {draw: [292, 306] as R2, out: [350, 360] as R2},
  contour: {draw: [308, 332] as R2, out: [556, 568] as R2},
  statement: [322, 334] as R2,
  statementOut: [352, 360] as R2,
  s4: {title: [362, 374], support: [370, 384], out: [440, 450]} as Record<string, R2>,
  // S5 The Spark of Insight
  diag: {draw: [430, 454] as R2, out: [488, 504] as R2},
  dots: {draw: [446, 458] as R2},
  star: {draw: [434, 458] as R2},
  s5: {eyebrow: [446, 458], title: [448, 462], support: [458, 472], out: [490, 500]} as Record<string, R2>,
  // S6 The Compass of Solutions
  rotGuide: [486, 526] as R2, // bintang pembanding berputar 45° → 0° (diagonal → N/E/S/W)
  circle: {draw: [496, 522] as R2},
  axes: {draw: [500, 524] as R2},
  s6: {eyebrow: [504, 516], title: [506, 520], support: [516, 530], out: [556, 566]} as Record<string, R2>,
  guideOut: [556, 568] as R2,
  // S7 Final Meaning Synthesis
  shiftStart: 568,
  shiftDur: 30,
  wordReveal: [572, 604] as R2,
  finalTitle: [580, 594] as R2,
  line1: [596, 612] as R2,
  line2: [608, 624] as R2,
  finalDisclaimer: [620, 638] as R2,
};

export const SCENES = {s1: [0, 89], s2: [90, 179], s3: [180, 269], s4: [270, 449], s5: [430, 499], s6: [486, 566], s7: [568, 699]} as const;
