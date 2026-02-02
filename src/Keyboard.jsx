import { useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Keyboard = ({ guessedLetters, onGuess }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      // sirf A–Z allow
      if (!letters.includes(key)) return;

      // agar pehle se guessed hai to ignore
      if (guessedLetters.includes(key)) return;

      onGuess(key);
    };

    window.addEventListener("keydown", handleKeyDown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedLetters, onGuess]);

  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {letters.map((letter) => {
        const used = guessedLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={used}
            className={`
              h-12 md:h-10
              rounded-lg
              font-semibold text-sm
              flex items-center justify-center
              transition
              ${
                used
                  ? "bg-[#2a2a35] text-gray-500 line-through"
                  : "bg-[#1f222d] text-white active:bg-[#2f3344]"
              }
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
