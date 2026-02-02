import { useState } from "react";
import Keyboard from "./Keyboard";
import Hangman3D from "./Hangman3D";

const MAX_WRONG = 9;

const COLORS = [
  "text-blue-400 border-blue-400",
  "text-cyan-400 border-cyan-400",
  "text-indigo-400 border-indigo-400",
];

/* 🪔 DIWALI FIREWORKS – TOP + BOTTOM */
const DiwaliFireworks = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* BOTTOM */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`bottom-${i}`}
          className="absolute bottom-0 firework-launch"
          style={{
            left: `${20 + i * 30}%`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {Array.from({ length: 16 }).map((_, j) => (
            <span
              key={j}
              className="firework-particle"
              style={{ "--angle": `${j * (360 / 16)}deg` }}
            />
          ))}
        </div>
      ))}

      {/* TOP */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={`top-${i}`}
          className="absolute top-0 firework-top"
          style={{
            left: `${30 + i * 35}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <span
              key={j}
              className="firework-particle-top"
              style={{ "--angle": `${j * (360 / 12)}deg` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const GameScreen = ({ word }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const [accentColor] = useState(
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
  );

  const lettersInWord = word.split("").filter((l) => l !== " ");

  const isWin =
    lettersInWord.every((l) => guessedLetters.includes(l)) &&
    wrongGuesses < MAX_WRONG;

  const isLose = wrongGuesses >= MAX_WRONG;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) setWrongGuesses((p) => p + 1);
  };

  const handleRestart = () => window.location.reload();

  return (
    <div
      className="
        w-full max-w-md md:max-w-6xl
        px-4 md:px-10
        text-center
        bg-transparent
        md:bg-white/10 md:backdrop-blur-xl
        md:border md:border-white/20
        md:rounded-3xl
        md:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        md:py-10
      "
    >
      <h1 className="text-xl tracking-widest text-gray-400 mb-10 md:mb-5">
        HANGMAN
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
        {/* LEFT – HANGMAN */}
        <div
          className="
            flex justify-center items-end
            h-[300px] md:h-[520px] md:pb-20
          "
        >
          <Hangman3D wrongGuesses={wrongGuesses} />
        </div>

        {/* RIGHT */}
        <div className="relative md:min-h-[420px] flex flex-col justify-start md:justify-center">
          {!isWin && !isLose && (
            <div className="space-y-4 md:space-y-6">
              <p className="text-xs text-gray-500">Player 2</p>

              <div className="flex justify-center gap-3 text-3xl md:text-4xl font-semibold">
                {word.split("").map((l, i) => (
                  <span
                    key={i}
                    className={`w-8 md:w-10 text-center border-b border-gray-600 ${
                      guessedLetters.includes(l) ? accentColor : "text-gray-500"
                    }`}
                  >
                    {guessedLetters.includes(l) ? l : ""}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-400">
                {wrongGuesses}/{MAX_WRONG} mistakes
              </p>

              <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} />
            </div>
          )}

          {(isWin || isLose) && (
            <div
              className="
                fixed inset-0 z-50
                md:absolute md:inset-0 md:z-auto
                flex flex-col items-center justify-center
                text-center
                bg-black/70
                backdrop-blur-sm
                md:rounded-2xl
              "
            >
              {isWin && <DiwaliFireworks />}

              <h2 className="text-4xl font-semibold text-white mb-3 relative z-10">
                {isWin ? "Level Complete" : "Level Failed"}
              </h2>

              <p className="text-gray-300 mb-6 max-w-xs relative z-10">
                {isWin
                  ? "You guessed the word correctly."
                  : "Better luck next time."}
              </p>

              {isLose && (
                <p className="text-sm text-gray-400 mb-6 relative z-10">
                  Word was <span className="text-white">{word}</span>
                </p>
              )}

              <button
                onClick={handleRestart}
                className="
                  relative z-10
                  px-8 py-3 rounded-xl
                  bg-white/90 text-gray-900
                  text-sm font-medium
                  hover:bg-white transition
                "
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
