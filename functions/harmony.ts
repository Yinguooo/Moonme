export function generateHarmony(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const secondary = (num ^ 0x333333)
    .toString(16)
    .padStart(6, "0");
  const accent = (num ^ 0xaaaaaa)
    .toString(16)
    .padStart(6, "0");
  return {
    secondary: `#${secondary}`,
    accent: `#${accent}`,
  };
}