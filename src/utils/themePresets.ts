export interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  light: string;
  dark: string;
  badgeBg: string;
  accent: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'sakura-bloom',
    name: 'Sakura Bloom (Hồng Anh Đào & Kem)',
    primary: '#E27B91',
    light: '#FFF5F7',
    dark: '#9F3A53',
    badgeBg: '#FCE7ED',
    accent: '#FDF2E9',
  },
  {
    id: 'fresh-mint',
    name: 'Fresh Mint (Xanh Mint & Vàng Chanh)',
    primary: '#4E9F86',
    light: '#F0F9F5',
    dark: '#276352',
    badgeBg: '#DCF0E7',
    accent: '#FEF9C3',
  },
  {
    id: 'ocean-sky',
    name: 'Ocean Sky (Xanh Biển Pastel & Cam Nhạt)',
    primary: '#4D8AB5',
    light: '#F0F6FC',
    dark: '#245277',
    badgeBg: '#DFEEFA',
    accent: '#FFEDD5',
  },
  {
    id: 'sweet-lavender',
    name: 'Sweet Lavender (Tím Oải Hương & Hồng Phấn)',
    primary: '#8E73B8',
    light: '#F7F3FC',
    dark: '#563D7C',
    badgeBg: '#EBE2F7',
    accent: '#FCE7F3',
  },
  {
    id: 'sunset-gold',
    name: 'Sunset Gold (Vàng Ấm & Cam San Hô)',
    primary: '#C98236',
    light: '#FFF9F0',
    dark: '#87511A',
    badgeBg: '#FCEBDB',
    accent: '#FFEDD5',
  },
];

