import { useState } from "react";
import SetupScreen from "./SetupScreen";
import GameScreen from "./GameScreen";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div
      className="
        min-h-screen w-full
        flex items-center justify-center
        bg-linear-to-b from-[#0d0f14] via-[#151823] to-[#1c2030]
        text-white
      "
    >
      {!gameStarted ? (
        <SetupScreen
          onStart={(word) => {
            setSecretWord(word.toUpperCase());
            setGameStarted(true);
          }}
        />
      ) : (
        <GameScreen word={secretWord} />
      )}
    </div>
  );
}

export default App;
