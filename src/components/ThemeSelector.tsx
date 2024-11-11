import { motion } from 'framer-motion';
import { Theme } from '../types/theme';
import { themes } from '../config/themes';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="max-h-28 sm:max-h-32 overflow-y-auto mb-4 sm:mb-6 p-2 rounded-lg bg-black/20">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
        {themes.map((theme) => (
          <motion.button
            key={theme.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onThemeChange(theme.name)}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              currentTheme === theme.name
                ? `${theme.selectedButtonBg} text-white`
                : `${theme.buttonBg} ${theme.buttonHoverBg} text-white/90`
            }`}
          >
            {theme.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}