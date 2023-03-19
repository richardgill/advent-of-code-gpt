import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const parseInput = (input: string): number[][] => {
  return input
    .split("\n\n")
    .map((group) => group.split("\n").map((num) => parseInt(num)));
};

const findTopThreeCalories = (calories: number[][]): number => {
  const totalCalories = calories.map((group) =>
    group.reduce((a, b) => a + b, 0)
  );
  totalCalories.sort((a, b) => b - a);
  return totalCalories.slice(0, 3).reduce((a, b) => a + b, 0);
};

const calories = parseInput(input);
const answer = findTopThreeCalories(calories);

console.log("\n", answer);
