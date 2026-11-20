import {formXF} from '../src/choreography';
const rows: Record<string, number[]> = {};
const add = (k: string, f: number, v: number) => ((rows[k] ||= [])[f] = v);
for (let f = 0; f < 700; f++) {
  for (const id of ['left', 'right']) {
    const x = formXF(id, f);
    add(`${id}.dx`, f, x.dx); add(`${id}.dy`, f, x.dy); add(`${id}.s`, f, x.s); add(`${id}.opacity`, f, x.opacity);
  }
}
console.log(JSON.stringify(rows));
