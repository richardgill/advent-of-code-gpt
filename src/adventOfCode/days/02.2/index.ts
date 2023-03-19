import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const lines = input.trim().split("\n");

const scoreRound = (opponent: string, outcome: string): number => {
  let yourShape: number;
  let score: number;

  if (outcome === "X") {
    // You need to lose
    if (opponent === "A") {
      yourShape = 3; // Scissors
    } else if (opponent === "B") {
      yourShape = 1; // Rock
    } else {
      yourShape = 2; // Paper
    }
    score = yourShape;
  } else if (outcome === "Y") {
    // You need to draw
    if (opponent === "A") {
      yourShape = 1; // Rock
    } else if (opponent === "B") {
      yourShape = 2; // Paper
    } else {
      yourShape = 3; // Scissors
    }
    score = yourShape + 3;
  } else {
    // You need to win
    if (opponent === "A") {
      yourShape = 2; // Paper
    } else if (opponent === "B") {
      yourShape = 3; // Scissors
    } else {
      yourShape = 1; // Rock
    }
    score = yourShape + 6;
  }

  return score;
};

let totalScore = 0;

for (const line of lines) {
  const [opponent, outcome] = line.split(" ");
  totalScore += scoreRound(opponent, outcome);
}

console.log("\n", totalScore);
