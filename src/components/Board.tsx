import { Square } from './Square';
import { ThemeConfig } from '../types/theme';

interface BoardProps {
  squares: (string | null)[];
  onPlay: (squares: number) => void;
  winningSquares: number[];
  theme: ThemeConfig;
}

export function Board({ squares, onPlay, winningSquares, theme }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    onPlay(i);
  }

  return (
    <div className={`grid grid-cols-3 gap-1 p-2 rounded-lg ${theme.boardBg}`}>
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <div key={i}>
            <Square
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              isWinningSquare={winningSquares.includes(i)}
              theme={theme}
            />
          </div>
        ))}
    </div>
  );
}

export function calculateWinner(squares: (string | null)[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}