import { hexToRgb } from "./colorparser";
export function analyzeColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation =
    max === 0 ? 0 : ((max - min) / max) * 100;
  const temperature =
    r > b ? "warm" : "cold";
  return {
    temperature,
    lightness: Math.round((lightness / 255) * 100),
    saturation: Math.round(saturation),
  };
}