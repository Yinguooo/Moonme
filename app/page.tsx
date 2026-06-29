"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
function getDominantColorName(r: number, g: number, b: number): string {
  const colors = [
    { name: "red", r: 255, g: 0, b: 0 },
    { name: "blue", r: 0, g: 0, b: 255 },
    { name: "green", r: 0, g: 255, b: 0 },
    { name: "yellow", r: 255, g: 255, b: 0 },
    { name: "purple", r: 128, g: 0, b: 128 },
    { name: "black", r: 0, g: 0, b: 0 },
    { name: "white", r: 255, g: 255, b: 255 },
  ];
  const distances = colors.map(color => {
    const dr = r - color.r;
    const dg = g - color.g;
    const db = b - color.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  });
  const minIndex = distances.indexOf(Math.min(...distances));
  return colors[minIndex].name;
}
function getPsychology(hex: string): string {
  const rgb = hexToRgb(hex);
  const colorName = getDominantColorName(rgb.r, rgb.g, rgb.b);
  const map: Record<string, string> = {
    red: "energy / aggression / passion",
    blue: "calm / trust / depth",
    green: "nature / balance / growth",
    yellow: "attention / anxiety / joy",
    purple: "mystery / luxury / introspection",
    black: "power / void / control",
    white: "clarity / minimalism / emptiness",
  };
  return map[colorName] ?? "unknown emotional field";
}
function analyzeColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : ((max - min) / max) * 100;
  const temperature = r > b ? "Warm" : "Cool";
  return {
    temperature,
    lightness: Math.round((lightness / 255) * 100),
    saturation: Math.round(saturation),
  };
}
function generateHarmony(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const secondary = (num ^ 0x333333).toString(16).padStart(6, "0");
  const accent = (num ^ 0xaaaaaa).toString(16).padStart(6, "0");
  return {
    secondary: `#${secondary}`,
    accent: `#${accent}`,
  };
}
export default function Home() {
  const [inputHex, setInputHex] = useState("#C9FFCA");
  const [isValid, setIsValid] = useState(true);
  const analysis = useMemo(() => {
    if (!isValid) return null;
    const colorAnalysis = analyzeColor(inputHex);
    const harmony = generateHarmony(inputHex);
    const psychology = getPsychology(inputHex);
    return {
      ...colorAnalysis,
      psychology,
      ...harmony,
    };
  }, [inputHex, isValid]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputHex(value);
    setIsValid(/^#([0-9A-Fa-f]{3}){1,2}$/.test(value));
  };
  const handleAnalyze = () => {
    if (isValid) {
      // Force re-calculation
      setInputHex(inputHex);
    }
  };
  const cards = [
    { title: "Temperature", value: analysis?.temperature ?? "—" },
    { title: "Lightness", value: analysis?.lightness ? `${analysis.lightness}%` : "—" },
    { title: "Saturation", value: analysis?.saturation ? `${analysis.saturation}%` : "—" },
    { title: "Psychology", value: analysis?.psychology ?? "—" },
    { title: "Secondary", value: analysis?.secondary ?? "—" },
    { title: "Accent", value: analysis?.accent ?? "—" },
  ];
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Image
        src="/moonme_bg.png"
        alt="Moon"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[180px]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12">
        <h1 className="mb-12 text-center text-5xl font-black tracking-[0.35em] text-white drop-shadow-[0_0_20px_rgba(255,80,220,.7)]">
          MOONME
        </h1>
        <div className="mx-auto mb-16 w-full max-w-xl">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputHex}
              onChange={handleInputChange}
              placeholder="#C9FFCA"
              className={`
                w-full
                rounded-2xl
                border
                ${isValid ? 'border-fuchsia-500/40' : 'border-red-500/80'}
                bg-black/40
                px-6
                py-4
                text-center
                text-xl
                tracking-widest
                text-white
                placeholder:text-gray-400
                outline-none
                backdrop-blur-md
                transition-all
                duration-300
                ${isValid ? 'focus:border-fuchsia-400 focus:shadow-[0_0_35px_rgba(255,0,170,.45)]' : ''}
              `}
            />
            <button
              onClick={handleAnalyze}
              disabled={!isValid}
              className="
                rounded-2xl
                bg-fuchsia-500/20
                px-8
                py-4
                text-xl
                font-bold
                tracking-widest
                text-fuchsia-300
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-fuchsia-500/40
                hover:text-white
                disabled:opacity-50
                disabled:cursor-not-allowed
                border
                border-fuchsia-500/40
                hover:border-fuchsia-400
                hover:shadow-[0_0_35px_rgba(255,0,170,.45)]
              "
            >
              ANALYZE
            </button>
          </div>
          {!isValid && (
            <p className="mt-2 text-center text-sm text-red-400/80">
              Invalid HEX format (e.g., #RRGGBB)
            </p>
          )}
        </div>
        <section className="grid w-full gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="
                rounded-3xl
                border
                border-fuchsia-400/30
                bg-black/35
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-fuchsia-400
                hover:shadow-[0_0_45px_rgba(255,0,170,.45)]
              "
            >
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-fuchsia-300">
                {card.title}
              </p>
              <div className="text-3xl font-bold text-white">
                {card.value}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}