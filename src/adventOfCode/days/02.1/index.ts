import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const calculateScore = (input: string) => {
  const lines = input.trim().split("\n");
  let totalScore = 0;

  for (const line of lines) {
    const [opponent, response] = line.split(" ");

    const opponentValue = opponent === "A" ? 1 : opponent === "B" ? 2 : 3;
    const responseValue = response === "X" ? 1 : response === "Y" ? 2 : 3;

    if (opponentValue === responseValue) {
      totalScore += responseValue + 3;
    } else if (
      (opponentValue === 1 && responseValue === 2) ||
      (opponentValue === 2 && responseValue === 3) ||
      (opponentValue === 3 && responseValue === 1)
    ) {
      totalScore += responseValue + 6;
    } else {
      totalScore += responseValue;
    }
  }

  return totalScore;
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = calculateScore(input);
console.log("\n", answer);
