import { useState, useRef } from "react";

const SetupScreen = ({ onStart }) => {
  const [word, setWord] = useState("");
  const hasAlerted = useRef(false);

  const handleChange = (e) => {
    const rawValue = e.target.value;

    // 🚨 Alert only once for invalid input
    if (/[^a-zA-Z]/.test(rawValue) && !hasAlerted.current) {
      alert("❌ Only alphabets are allowed. Numbers are not allowed.");
      hasAlerted.current = true;
    }

    // Clean input → only A–Z
    const cleanedValue = rawValue.replace(/[^a-zA-Z]/g, "").toUpperCase();

    setWord(cleanedValue);
  };

  const handleStart = () => {
    document.activeElement.blur();

    if (word.trim().length < 2) {
      alert("Please enter a valid word (min 2 letters)");
      return;
    }

    onStart(word);
  };

  return (
    <div
      className="
        w-full max-w-sm
        text-center
        px-8 py-12

        md:bg-white/10
        md:backdrop-blur-xl
        md:border md:border-white/20
        md:rounded-3xl
        md:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
      "
    >
      {/* TITLE */}
      <h1 className="text-xs tracking-[0.25em] text-gray-400 mb-2">PLAYER 1</h1>

      <p className="text-sm text-gray-500 mb-10">Set the secret word</p>

      {/* INPUT */}
      <div className="relative mb-8">
        <input
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="Enter a word"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          inputMode="text"
          className="
            w-full px-4 py-4
            rounded-2xl
            bg-black/40
            text-white text-center tracking-widest
            placeholder-gray-600

            border border-white/10
            focus:outline-none
            focus:border-blue-400
            focus:ring-1 focus:ring-blue-400
          "
        />

        <div className="absolute inset-x-8 -bottom-2 h-px bg-white/10" />
      </div>

      {/* BUTTON */}
      <button
        type="button"
        onClick={handleStart}
        className="
          w-full py-3 rounded-2xl
          bg-linear-to-r from-blue-500 to-cyan-400
          text-black font-semibold tracking-wide

          shadow-[0_10px_40px_rgba(56,189,248,0.35)]
          hover:scale-[1.02]
          active:scale-95
          transition
        "
      >
        Start Game
      </button>

      {/* HINT */}
      <div className="mt-8">
        <div className="w-10 h-px bg-white/10 mx-auto mb-4" />
        <p className="text-xs text-gray-500">Player 2 should not look 👀</p>
      </div>
    </div>
  );
};

export default SetupScreen;
