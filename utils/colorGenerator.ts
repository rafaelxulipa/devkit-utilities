
// --- Color Conversion Utilities ---

/**
 * Converts an HEX color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes hex is provided in format #RRGGBB and
 * returns h, s, and l in the set [0, 360], [0, 100], [0, 100].
 */
export const hexToHsl = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

/**
 * Converts an HSL color value to HEX. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 360], [0, 100], [0, 100] and
 * returns hex in the format #RRGGBB.
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { [r, g, b] = [c, x, 0]; } 
  else if (60 <= h && h < 120) { [r, g, b] = [x, c, 0]; } 
  else if (120 <= h && h < 180) { [r, g, b] = [0, c, x]; } 
  else if (180 <= h && h < 240) { [r, g, b] = [0, x, c]; } 
  else if (240 <= h && h < 300) { [r, g, b] = [x, 0, c]; } 
  else if (300 <= h && h < 360) { [r, g, b] = [c, 0, x]; }

  const toHex = (c: number) => {
    const hex = Math.round((c + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// --- Palette Generation Logic ---

const wrapHue = (hue: number): number => (hue + 360) % 360;

type Harmony = 'analogous' | 'monochromatic' | 'triade' | 'complementary' | 'square';

export const generatePalette = (baseHex: string, harmony: Harmony): string[] => {
  const [h, s, l] = hexToHsl(baseHex);

  switch (harmony) {
    case 'analogous':
      return [
        hslToHex(wrapHue(h - 60), s, l),
        hslToHex(wrapHue(h - 30), s, l),
        hslToHex(h, s, l),
        hslToHex(wrapHue(h + 30), s, l),
        hslToHex(wrapHue(h + 60), s, l),
      ];
    case 'monochromatic':
      return [
        hslToHex(h, s, Math.max(0, l - 20)),
        hslToHex(h, s, Math.max(0, l - 10)),
        hslToHex(h, s, l),
        hslToHex(h, s, Math.min(100, l + 10)),
        hslToHex(h, s, Math.min(100, l + 20)),
      ];
    case 'triade':
      return [
        hslToHex(h, s, l),
        hslToHex(wrapHue(h + 120), s, l),
        hslToHex(wrapHue(h + 240), s, l),
      ];
    case 'complementary':
       return [
        hslToHex(h, s, l),
        hslToHex(h, Math.max(0, s-30), Math.min(100, l+10)),
        hslToHex(wrapHue(h+180), s, l-10 > 0 ? l-10 : l),
        hslToHex(wrapHue(h+180), s, l),
        hslToHex(wrapHue(h+180), Math.max(0, s-20), Math.min(100, l+20)),
       ]
    case 'square':
      return [
        hslToHex(h, s, l),
        hslToHex(wrapHue(h + 90), s, l),
        hslToHex(wrapHue(h + 180), s, l),
        hslToHex(wrapHue(h + 270), s, l),
      ];
    default:
      return [baseHex];
  }
};

/**
 * Determines whether to use light or dark text on a given background color.
 */
export const getTextColorForBackground = (hex: string): '#ffffff' | '#000000' => {
  const [r, g, b] = hexToRgb(hex);
  // Formula for luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};
