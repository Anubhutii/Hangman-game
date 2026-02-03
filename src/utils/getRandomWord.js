const ONLY_LETTERS = /^[A-Z]+$/;
const VOWELS = /[AEIOU]/g;
const HARD_LETTERS = /[QXZJK]/;

export const getRandomWord = async (min, max) => {
  try {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?number=40",
    );

    const words = await res.json();

    const normalWords = words
      .map((w) => w.toUpperCase())
      .filter((w) => {
        const lengthOk = w.length >= min && w.length <= max;
        const vowelCount = (w.match(VOWELS) || []).length;
        const hasEnoughVowels = vowelCount >= 2; // 🔑 big change
        const noHardLetters = !HARD_LETTERS.test(w);
        const onlyLetters = ONLY_LETTERS.test(w);

        return lengthOk && hasEnoughVowels && noHardLetters && onlyLetters;
      });

    if (normalWords.length > 0) {
      return normalWords[Math.floor(Math.random() * normalWords.length)];
    }

    // 🛟 fallback = very common daily word
    if (max <= 4) return "BALL";
    if (max <= 6) return "HOUSE";
    return "WATER";
  } catch (error) {
    console.error("Random word API failed:", error);
    return "HOUSE";
  }
};
