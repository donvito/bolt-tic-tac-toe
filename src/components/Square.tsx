import { motion } from 'framer-motion';
import { ThemeConfig } from '../types/theme';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
  theme: ThemeConfig;
}

export function Square({ value, onSquareClick, isWinningSquare, theme }: SquareProps) {
  const symbol = value === 'X' ? theme.xSymbol : value === 'O' ? theme.oSymbol : null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-16 h-16 sm:w-20 sm:h-20 border border-white/20 text-2xl sm:text-3xl font-bold flex items-center justify-center backdrop-blur-sm transition-colors rounded-lg shadow-lg ${
        isWinningSquare ? theme.winningBg : 'bg-white/10'
      } ${theme.buttonHoverBg}`}
      onClick={onSquareClick}
    >
      {symbol && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {symbol}
        </motion.span>
      )}
    </motion.button>
  );
}