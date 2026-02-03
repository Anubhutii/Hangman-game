import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import Hangman3D from "./Hangman3D";

const MAX_WRONG = 9;

const COLORS = [
  "text-blue-400 border-blue-400",
  "text-cyan-400 border-cyan-400",
  "text-indigo-400 border-indigo-400",
];

const GameScreen = ({ word, onRestart }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [accentColor] = useState(
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
  );

  const lettersInWord = word.split("").filter((l) => l !== " ");

  const isWin =
    lettersInWord.every((l) => guessedLetters.includes(l)) &&
    wrongGuesses < MAX_WRONG;

  const isLose = wrongGuesses >= MAX_WRONG;

  /* 🔥 DELAY RESULT CARD */
  useEffect(() => {
    if (isWin || isLose) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [isWin, isLose]);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) setWrongGuesses((p) => p + 1);
  };

  const handleRestart = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setShowResult(false);

    // Parent ko batao game restart karna hai
    onRestart();
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* LEFT */}
        <div className="flex justify-center items-end h-[300px] md:h-[520px] md:pb-20">
          <Hangman3D wrongGuesses={wrongGuesses} />
        </div>

        {/* RIGHT */}
        <div className="relative md:min-h-[420px] flex flex-col justify-start md:justify-center">
          {/* 🎮 GAMEPLAY (stays visible till result shows) */}
          {!showResult && (
            <div className="space-y-6">
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

          {/* 🎉 RESULT CARD */}
          {showResult && (
            <div
              className="
                relative mt-10 z-20
                animate-slide-up

                flex flex-col items-center justify-center
                text-center

                bg-gradient-to-br
from-blue-500/40
via-cyan-400/30
to-sky-500/40
backdrop-blur-md
                border border-white/20
                rounded-3xl
                px-8 py-10
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]

                md:absolute md:inset-0
                md:mt-0
                md:bg-gradient-to-br
md:from-blue-500/40
md:via-cyan-400/30
md:to-sky-500/40
md:backdrop-blur-md


              "
            >
              <h2 className="text-4xl font-semibold text-white mb-3">
                {isWin ? "Level Complete 🎉" : "Level Failed 😔"}
              </h2>

              <p className="text-gray-300 mb-4 max-w-xs">
                {isWin
                  ? "You guessed the word correctly."
                  : "Better luck next time."}
              </p>

              <p className="text-sm text-gray-400 mb-6">
                Word was{" "}
                <span className="text-white tracking-widest">{word}</span>
              </p>

              <button
                onClick={handleRestart}
                className="
                  px-10 py-3 rounded-xl
                  bg-white/90 text-gray-900
                  text-sm font-medium
                  hover:bg-white
                  active:scale-95
                  transition
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
