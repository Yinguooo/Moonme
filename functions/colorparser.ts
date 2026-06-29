export function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
export function parseColor(hex: string) {
  const rgb = hexToRgb(hex); 
  return {
    ...rgb,
    temperature: rgb.r > 200 ? "Warm" : "Cool", // Твоя логика расчета температуры
    lightness: Math.round(((rgb.r + rgb.g + rgb.b) / 3 / 255) * 100), // Пример расчета яркости
    saturation: "High", // Замени на реальную логику
    secondary: "#FFFFFF", // Замени на результат вызова harmony.ts
    accent: "#000000"    // Замени на результат вызова harmony.ts
  };
}