import { useState } from "react";
import Keyboard from "./Keyboard";
import Hangman3D from "./Hangman3D";

const MAX_WRONG = 9;

const COLORS = [
  "text-green-400 border-green-400",
  "text-yellow-400 border-yellow-400",
  "text-emerald-800 border-emerald-400",
  "text-cyan-400 border-cyan-400",
  "text-purple-400 border-purple-400",
  "text-blue-400 border-blue-400",
  "text-pink-400 border-pink-400",
];

const GameScreen = ({ word }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  // 🎨 RANDOM ACCENT COLOR (ONCE PER REFRESH)
  const [accentColor] = useState(() => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  });

  const lettersInWord = word.split("").filter((l) => l !== " ");

  const isWin =
    lettersInWord.every((l) => guessedLetters.includes(l)) &&
    wrongGuesses < MAX_WRONG;

  const isLose = wrongGuesses >= MAX_WRONG;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses((p) => p + 1);
    }
  };

  const handleRestart = () => window.location.reload();

  return (
    <div
      className="
        w-full
        max-w-md md:max-w-3xl
        px-4 md:px-8
        text-center

        bg-transparent

        md:bg-white/10
        md:backdrop-blur-xl
        md:border md:border-white/20
        md:rounded-3xl
        md:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        md:py-10
      "
    >
      {/* TITLE */}
      <h1 className="text-xs tracking-widest text-gray-400">HANGMAN</h1>

      {/* HANGMAN */}
      <div className="flex justify-center mb-6">
        <Hangman3D wrongGuesses={wrongGuesses} />
      </div>

      {/* PLAYER */}
      <p className="text-xs text-gray-400 mb-1">Player 2</p>

      {/* WORD DISPLAY */}
      <div className="flex justify-center gap-2 mb-4 text-3xl md:text-4xl font-bold">
        {word.split("").map((l, i) => {
          const guessed = guessedLetters.includes(l);
          return (
            <span
              key={i}
              className={`
                w-8 md:w-10 text-center border-b-2
                ${guessed ? accentColor : "text-gray-500 border-gray-600"}
              `}
            >
              {guessed ? l : ""}
            </span>
          );
        })}
      </div>

      {/* MISTAKES */}
      <p className="text-sm text-red-400 mb-6">
        ❌ {wrongGuesses}/{MAX_WRONG} mistakes
      </p>

      {/* RESULT MESSAGE */}
      {isWin && (
        <p className="font-semibold mb-3 text-green-400">🎉 You Win!</p>
      )}

      {isLose && (
        <p className="text-red-400 mb-3">
          💀 Word was <span className="font-bold underline">{word}</span>
        </p>
      )}

      {/* 🔄 RESTART – ALWAYS ON GAME OVER */}
      {(isWin || isLose) && (
        <button
          onClick={handleRestart}
          className={`
      mt-2 px-8 py-3 rounded-xl
      font-bold tracking-wide
      transition-all duration-200
      active:scale-95

      bg-white/80 backdrop-blur-md
      ${accentColor}
      border

      shadow-[0_8px_30px_rgba(0,0,0,0.35)]
    `}
        >
          🔄 Restart Game
        </button>
      )}

      {/* KEYBOARD */}
      {!isWin && !isLose && (
        <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} />
      )}
    </div>
  );
};

export default GameScreen;
