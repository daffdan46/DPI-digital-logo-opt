import {continueRender, delayRender, staticFile} from 'remotion';

/**
 * Opsional: taruh file Gotham resmi di public/fonts/ lalu isi daftar ini, mis.
 *   {file: 'fonts/Gotham-Medium.woff2', weight: '500'}
 * Jika kosong, project memakai Gotham yang terpasang di sistem (local) atau fallback.
 */
export const FONT_FILES: {file: string; weight: string}[] = [];

export const loadFonts = () => {
  FONT_FILES.forEach(({file, weight}) => {
    const handle = delayRender(`font ${file}`);
    const face = new FontFace('Gotham', `url(${staticFile(file)})`, {weight});
    face
      .load()
      .then(() => {
        (document.fonts as unknown as {add: (f: FontFace) => void}).add(face);
        continueRender(handle);
      })
      .catch((e) => {
        console.warn('Font gagal dimuat', file, e);
        continueRender(handle);
      });
  });
};
