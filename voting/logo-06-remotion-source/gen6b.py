import re, json, numpy as np
from svgpathtools import parse_path
from shapely.geometry import Polygon
from shapely.ops import unary_union, nearest_points

svg = open('opt6_new.svg').read()
paths = re.findall(r'<path ([^>]*?)/>', svg)
def attr(s, k):
    m = re.search(k + r'="([^"]*)"', s); return m.group(1) if m else None
word = [attr(p, 'd') for p in paths if attr(p, 'class') is None][:14]
cls = {attr(p, 'class'): attr(p, 'd') for p in paths if attr(p, 'class')}
# peta class -> gradient id
css = dict(re.findall(r'\.(st\d+)\s*\{\s*fill:\s*url\(#([\w-]+)\)', svg))
def grad(gid):
    m = re.search(r'<linearGradient id="%s" x1="([\d.\-]+)" y1="([\d.\-]+)" x2="([\d.\-]+)" y2="([\d.\-]+)"' % gid, svg)
    return [float(x) for x in m.groups()]
FACES = {'left': ['st28', 'st27'], 'right': ['st9', 'st10']}
def sample(d, n=60):
    p = parse_path(d); pts = []
    for seg in p:
        for t in np.linspace(0, 1, n, endpoint=False): pts.append(seg.point(t))
    return np.array([[z.real, z.imag] for z in pts])
def bbox(d):
    x0, x1, y0, y1 = parse_path(d).bbox(); return [x0, x1, y0, y1]
def bb_union(ds):
    b = [bbox(d) for d in ds]; return [min(x[0] for x in b), max(x[1] for x in b), min(x[2] for x in b), max(x[3] for x in b)]
polys, pts, bbs = {}, {}, {}
for k, cs in FACES.items():
    ps = [Polygon(sample(cls[c])).buffer(0) for c in cs]
    polys[k] = unary_union(ps).buffer(0.5).buffer(-0.5)
    pts[k] = np.vstack([sample(cls[c]) for c in cs]); bbs[k] = bb_union([cls[c] for c in cs])
polyL, polyR = polys['left'], polys['right']
gap = polyL.distance(polyR); a, b = nearest_points(polyL, polyR)
meet = [(a.x + b.x) / 2, (a.y + b.y) / 2]
def farthest(P, cond):
    sel = P[[cond(p) for p in P]]; d = np.hypot(sel[:, 0] - meet[0], sel[:, 1] - meet[1]); return sel[d.argmax()].tolist()
L, R = pts['left'], pts['right']
tips = [farthest(L, lambda p: p[1] < meet[1]), farthest(L, lambda p: p[1] >= meet[1]), farthest(R, lambda p: p[1] < meet[1]), farthest(R, lambda p: p[1] >= meet[1])]
rr = gap/2 + 3
uni = unary_union([polyL, polyR]).buffer(rr).buffer(-(rr-6))
if uni.geom_type != 'Polygon': uni = max(uni.geoms, key=lambda g: g.area)
ring = list(uni.exterior.coords)
contour = 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in ring) + ' Z'
bl, br = bbs['left'], bbs['right']
sym = [min(bl[0], br[0]), max(bl[1], br[1]), min(bl[2], br[2]), max(bl[3], br[3])]
wb = bb_union(word)
def mk(i, bb, apex):
    return {'id': i, 'faces': [{'d': cls[c], 'grad': dict(zip(('x1', 'y1', 'x2', 'y2'), grad(css[c])))} for c in FACES[i]],
            'cx': round((bb[0] + bb[1]) / 2, 3), 'cy': round((bb[2] + bb[3]) / 2, 3), 'bbox': [round(v, 2) for v in bb], 'apex': [round(v, 2) for v in apex]}
out = {'symbolBBox': [round(v, 2) for v in sym], 'wordBBox': [round(v, 2) for v in wb],
       'forms': [mk('left', bl, a.coords[0]), mk('right', br, b.coords[0])], 'wordmark': word,
       'geo': {'meet': [round(v, 2) for v in meet], 'gap': round(gap, 2), 'tips': [[round(v, 2) for v in t] for t in tips], 'contour': contour}}
hdr = '// AUTO-GENERATED dari opt6.svg versi baru (gen6b.py): tiap bentuk = 2 face (path + gradient asli, tidak diubah).\n// forms: left (besar) & right (kecil); apex = titik terdekat antar bentuk; geo.meet = titik temu; geo.tips = empat ujung (TL,BL,TR,BR);\n// geo.contour = kontur gabungan (offset 6 unit, hanya untuk overlay).\n'
open('telkom-digital-logo-06-motion/src/logoData.ts', 'w').write(hdr + 'export const LOGO = ' + json.dumps(out, indent=1) + ' as const;\n')
print('sym', out['symbolBBox'], 'word', out['wordBBox'], 'gap', round(gap, 2), 'meet', out['geo']['meet'])
print('tips', out['geo']['tips']); print('old', open('telkom-digital-logo-06-motion/src/logoData.ts').read()[:0])
