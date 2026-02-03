import { useState } from "react";
import SetupScreen from "./SetupScreen";
import GameScreen from "./GameScreen";
import bg from "./assets/bg.png";

// helpers
import { getRandomWord } from "./utils/getRandomWord";
import { getWordHint } from "./utils/getWordHint";

// 🔹 difficulty config
const DIFFICULTY_MAP = {
  easy: [3, 4],
  medium: [5, 6],
  hard: [7, 9],
};

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [mode, setMode] = useState("");

  // difficulty
  const [difficulty, setDifficulty] = useState("medium");

  // hint
  const [hint, setHint] = useState("");
  const [hintLoading, setHintLoading] = useState(false);

  // 🤖 Player vs Computer
  const startComputerGame = async () => {
    const [min, max] = DIFFICULTY_MAP[difficulty];
    const word = await getRandomWord(min, max);

    setSecretWord(word || "HANGMAN"); // fallback only if API fails
    setMode("computer");
    setGameStarted(true);
    setHint("");
  };

  // 💡 Fetch hint
  const fetchHint = async () => {
    if (!secretWord) return;

    setHintLoading(true);
    const meaning = await getWordHint(secretWord);
    setHint(meaning);
    setHintLoading(false);
  };

  const handleRestart = () => {
    setSecretWord("");
    setGameStarted(false);
    setMode("");
    setHint("");
    setHintLoading(false);
  };

  return (
    <div
      className="
        relative
        h-screen min-h-[100svh]
        w-full
        flex items-center justify-center
        text-white
        overflow-hidden
      "
    >
      {/* 🔹 GRADIENT */}
      <div
        className="
          absolute inset-0
          bg-linear-to-b
          from-[#0d0f14]
          via-[#151823]
          to-[#1c2030]
        "
      />

      {!gameStarted && (
        <img
          src={bg}
          alt=""
          className="
            absolute
            left-0 bottom-0
            w-[370px]
            sm:w-[400px]
            md:w-[600px]
            h-auto
            opacity-90
            pointer-events-none
            select-none
          "
        />
      )}

      <div className="relative z-10 w-full flex items-center justify-center">
        {!gameStarted ? (
          <SetupScreen
            onStart={(word) => {
              setSecretWord(word.toUpperCase());
              setMode("player");
              setGameStarted(true);
              setHint("");
            }}
            onComputerStart={startComputerGame}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ) : (
          <GameScreen
            word={secretWord}
            mode={mode}
            difficulty={difficulty}
            hint={hint}
            onGetHint={fetchHint}
            hintLoading={hintLoading}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
