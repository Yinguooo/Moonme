export function getPsychology(hex: string) {
  const map: Record<string, string> = {
    red: "energy / aggression / passion",
    blue: "calm / trust / depth",
    green: "nature / balance / growth",
    yellow: "attention / anxiety / joy",
    purple: "mystery / luxury / introspection",
    black: "power / void / control",
    white: "clarity / minimalism / emptiness",
  };
  return map.default ?? "unknown emotional field";
}