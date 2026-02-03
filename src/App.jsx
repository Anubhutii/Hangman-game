import { useState } from "react";
import SetupScreen from "./SetupScreen";
import GameScreen from "./GameScreen";
import bg from "./assets/bg.png";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

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
              setGameStarted(true);
            }}
          />
        ) : (
          <GameScreen
            word={secretWord}
            onRestart={() => {
              setSecretWord("");
              setGameStarted(false);
            }}
          />
        )}
      </div>
    </div>
  );
}


export default App;
