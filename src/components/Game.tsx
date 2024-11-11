import { useState } from 'react';
import { motion } from 'framer-motion';
import { Board, calculateWinner } from './Board';
import { ThemeSelector } from './ThemeSelector';
import { Theme } from '../types/theme';
import { themes } from '../config/themes';

export function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme>('space');
  
  const winningSquares = calculateWinner(squares) || [];
  const theme = themes.find(t => t.name === currentTheme) || themes[0];

  function handlePlay(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = winningSquares.length > 0 ? squares[winningSquares[0]] : null;
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner === 'X' ? theme.xSymbol : theme.oSymbol}`
    : isDraw
    ? 'Game is a draw!'
    : `Next player: ${xIsNext ? theme.xSymbol : theme.oSymbol}`;

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen p-4 ${theme.background}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto p-4 sm:p-8 rounded-xl backdrop-blur-sm bg-white/10 shadow-2xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-white drop-shadow-lg">
          Tic Tac Toe
        </h1>
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <div className="mb-4 text-lg sm:text-xl font-semibold text-center h-8 text-white drop-shadow">
          {status}
        </div>
        <div className="flex justify-center mb-4 sm:mb-6">
          <Board
            squares={squares}
            onPlay={handlePlay}
            winningSquares={winningSquares}
            theme={theme}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restartGame}
          className={`w-full py-2 rounded-lg text-white font-semibold ${theme.selectedButtonBg} hover:opacity-90 transition-all shadow-lg`}
        >
          Restart Game
        </motion.button>
      </motion.div>
    </div>
  );
}