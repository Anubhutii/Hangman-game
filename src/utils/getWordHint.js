export const getWordHint = async (word) => {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
    );

    const data = await res.json();

    return (
      data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
      "No hint available"
    );
  } catch (error) {
    console.error("Dictionary API error:", error);
    return "No hint available";
  }
};
