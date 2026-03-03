/**
 * Hex → OKLCH 변환 유틸리티
 *
 * 변환 체인: hex → sRGB → linear sRGB → XYZ D65 → OKLab → OKLCH
 */

function parseHex(hex: string): { r: number; g: number; b: number; a?: number } {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : undefined;
  return { r, g, b, a };
}

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function linearSrgbToXyz(r: number, g: number, b: number): [number, number, number] {
  const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  return [x, y, z];
}

function xyzToOklab(x: number, y: number, z: number): [number, number, number] {
  // M1 matrix (XYZ to LMS)
  const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  // Cube root
  const lc = Math.cbrt(l);
  const mc = Math.cbrt(m);
  const sc = Math.cbrt(s);

  // M2 matrix (LMS to OKLab)
  const L = 0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc;
  const a = 1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc;
  const b = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc;

  return [L, a, b];
}

function oklabToOklch(L: number, a: number, b: number): [number, number, number] {
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

function round(n: number, digits: number): number {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
}

export function hexToOklch(hex: string): string {
  const { r, g, b, a } = parseHex(hex);

  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const [x, y, z] = linearSrgbToXyz(lr, lg, lb);
  const [L, labA, labB] = xyzToOklab(x, y, z);
  const [oL, oC, oH] = oklabToOklch(L, labA, labB);

  const lStr = round(oL * 100, 2);
  const cStr = round(oC, 4);
  const hStr = round(oH, 2);

  if (a !== undefined && a < 1) {
    return `oklch(${lStr}% ${cStr} ${hStr} / ${round(a, 2)})`;
  }

  return `oklch(${lStr}% ${cStr} ${hStr})`;
}

/**
 * WCAG 2.1 상대 휘도(relative luminance) 기반 명암 판단
 * relativeLuminance > 0.179 → 밝은 색 (어두운 텍스트 필요)
 */
export function isLight(hex: string): boolean {
  if (!hex.startsWith("#")) return false;

  const { r, g, b } = parseHex(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  // WCAG relative luminance
  const luminance = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
  return luminance > 0.179;
}
