import { useState } from "react";

const SetupScreen = ({ onStart }) => {
  const [word, setWord] = useState("");

  const handleStart = () => {
    document.activeElement.blur();

    if (word.trim().length < 2) {
      alert("Please enter a valid word");
      return;
    }
    onStart(word);
  };

  return (
    <div
      className="
        w-full max-w-sm
        text-center
        px-6 py-10
        md:bg-white/10 md:backdrop-blur-xl
        md:border md:border-white/20
        md:rounded-3xl
        md:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      {/* TITLE */}
      <h1 className="text-xs tracking-widest text-gray-400 mb-2">PLAYER 1</h1>

      <p className="text-sm text-gray-500 mb-8">Set the secret word</p>

      {/* INPUT */}
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word!"
        className="
          w-full px-4 py-3 mb-6
          rounded-xl
          bg-[#1f222d]
          text-white text-center tracking-widest
          placeholder-gray-600
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />

      {/* BUTTON */}
      <button
        type="button"
        onClick={handleStart}
        className="
          w-full py-3 rounded-xl
          bg-linear-to-r from-blue-500 to-cyan-400
          text-black font-bold
          active:scale-95
          transition
        "
      >
        Start Game
      </button>

      {/* HINT TEXT */}
      <p className="text-xs text-gray-500 mt-6">Player 2 should not look 👀</p>
    </div>
  );
};

export default SetupScreen;
