# Telkom Digital Logo 06 — "The Right Match" (Remotion)

Matching → Sparkle → Compass. 1920×1080, 30 fps, 700 frames (23,3 s), background putih.

## Jalankan
npm install && npx remotion studio   # edit
npm run render                       # out/telkom-digital-logo-06-right-match.mp4

## Struktur
- src/config.ts — copy, timeline (TL), posisi, easing preset, toggle ANNOTATIONS (labels, relationGuides, meetingMarker, contour, breakdown, sparkle, compass, wordmark, disclaimer)
- src/choreography.ts — gerak dua bentuk (translate + skala seragam, tanpa deformasi)
- src/components/* — satu komponen per scene + ComparisonGuide, UnifiedContour
- QAReference composition — artwork asli untuk diff frame akhir (0 px)

## Keputusan & catatan
- Durasi 700 frame (spec 600) agar teks terbaca; ubah di config.ts (DURATION + TL).
- Gradient artwork (#ff0001→#bc0000) dipertahankan agar frame akhir identik artwork, walau spec menyebut tanpa gradient.
- Sparkle/compass adalah pembacaan interpretatif lewat overlay sementara + panel COMPARISON GUIDE; logo tidak diputar/dideformasi.
- Final takeaway tidak ditampilkan (tidak ada di daftar scene). Disclaimer: narasi presentasi, bukan tagline resmi.
- Wordmark di-recolor #1D1D1B; simbol bergeser kiri saat lockup. Font Gotham fallback bila tidak terpasang.
- Easy Ease di semua gerak; tanpa linear/ease-out-only/bounce. Tidak ada tabrakan bentuk (jarak min 4,03 unit).

## VO (suara)
- Naskah + SRT: `vo/`. Taruh rekaman di `public/vo.wav`, lalu set `VO.enabled = true` di `src/config.ts` (offset bisa digeser lewat `VO.offset`). `VO.tail` = frame hold akhir untuk penutup VO; frame hold identik dengan frame akhir sebelumnya.

## Update artwork (opt6 versi baru)
- Artwork baru: tiap bentuk terdiri dari 2 face (path + gradient asli, tidak diubah). `src/logoData.ts` dibuat ulang lewat `gen6b.py`; `Logo06.tsx` merender kedua face dengan transform bentuk yang sama.
- Wordmark bergeser dan gap antar bentuk lebih lebar (±21 unit, sebelumnya ±4). Geometri guide (titik temu, empat ujung, kontur gabungan) dihitung ulang; diagonal ujung-ke-ujung tetap melewati titik temu (selisih <1 unit).
- `LOGO_SCALE` 1.8 → 1.45 agar tinggi simbol di layar tetap sama; jarak start bentuk (`FORM_START`) disesuaikan.
- QA: final frame symbol-box diff 0 px terhadap `logo-06.svg` baru; render deterministik.
