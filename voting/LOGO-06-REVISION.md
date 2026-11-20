# Telkom Digital Voting — Logo 06 artwork revision

This package updates **option 06 logo image** in `index.html` to the user-supplied `opt6.svg` artwork. Options 01–05 are unchanged.

IMPORTANT: `video/opsi-06.mp4` is the previous motion with SFX. The new supplied ZIP contains Remotion source code, NOT a rendered video. Do not treat that old MP4 as the revised motion.

To render revised Logo 06, use the included `logo-06-remotion-source/` directory in a Node environment with npm package access:

```bash
cd logo-06-remotion-source
npm install
npm run render
```

Replace `video/opsi-06.mp4` with the resulting `out/telkom-digital-logo-06-right-match.mp4`. If you want SFX, reapply `telkom-motion-sfx-final/sfx-logo-06.wav` to the newly rendered clip, not to the old video.

Before publishing publicly, replace `video/opsi-06.mp4` so that the video and logo artwork match. Voting still requires Supabase for shared aggregation; static mode is per-browser.
