const HangmanDrawing = ({ wrongGuesses }) => {
  const standColor = "#ef4444"; // red stand
  const ropeColor = "#fbbf24"; // yellow rope
  const bodyColor = "#fde68a"; // light cream body

  return (
    <svg width="220" height="260" viewBox="0 0 220 260" className="mx-auto">
      {/* BASE – ALWAYS */}
      <line
        x1="20"
        y1="240"
        x2="200"
        y2="240"
        stroke="#7c2d12"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* VERTICAL POLE */}
      {wrongGuesses > 0 && (
        <line
          x1="50"
          y1="240"
          x2="50"
          y2="20"
          stroke={standColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}

      {/* TOP BAR */}
      {wrongGuesses > 1 && (
        <line
          x1="50"
          y1="20"
          x2="140"
          y2="20"
          stroke={standColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}

      {/* ROPE */}
      {wrongGuesses > 2 && (
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="45"
          stroke={ropeColor}
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}

      {/* HEAD */}
      {wrongGuesses > 3 && (
        <circle
          cx="140"
          cy="65"
          r="18"
          stroke={bodyColor}
          strokeWidth="4"
          fill="none"
        />
      )}

      {/* BODY */}
      {wrongGuesses > 4 && (
        <line
          x1="140"
          y1="85"
          x2="140"
          y2="135"
          stroke={bodyColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* LEFT ARM */}
      {wrongGuesses > 5 && (
        <line
          x1="140"
          y1="100"
          x2="115"
          y2="120"
          stroke={bodyColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* RIGHT ARM */}
      {wrongGuesses > 6 && (
        <line
          x1="140"
          y1="100"
          x2="165"
          y2="120"
          stroke={bodyColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* LEFT LEG */}
      {wrongGuesses > 7 && (
        <line
          x1="140"
          y1="135"
          x2="120"
          y2="175"
          stroke={bodyColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* RIGHT LEG */}
      {wrongGuesses > 8 && (
        <line
          x1="140"
          y1="135"
          x2="160"
          y2="175"
          stroke={bodyColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

export default HangmanDrawing;
