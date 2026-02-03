import { useEffect } from "react";

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];

const Keyboard = ({ guessedLetters, onGuess }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (!/^[A-Z]$/.test(key)) return;
      if (guessedLetters.includes(key)) return;
      onGuess(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessedLetters, onGuess]);

  return (
    <div className="mt-6 space-y-3 select-none w-full">
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`
            flex justify-center
            gap-2
            ${rowIndex === 1 ? "mx-4" : rowIndex === 2 ? "mx-8" : ""}
          `}
        >
          {row.map((letter) => {
            const used = guessedLetters.includes(letter);

            return (
              <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={used}
                className={`
                  h-11
                  w-8 md:w-9
                  rounded-lg
                  font-semibold text-sm
                  flex items-center justify-center
                  transition
                  ${
                    used
                      ? "bg-[#2a2a35] text-gray-500 line-through"
                      : "bg-[#1f222d] text-white active:scale-95 active:bg-[#2f3344]"
                  }
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
