export type Theme = 'space' | 'classic' | 'sunset' | 'ocean' | 'forest' | 'mountain';

export interface ThemeConfig {
  name: Theme;
  label: string;
  background: string;
  boardBg: string;
  xSymbol: string;
  oSymbol: string;
  winningBg: string;
  buttonBg: string;
  buttonHoverBg: string;
  selectedButtonBg: string;
}