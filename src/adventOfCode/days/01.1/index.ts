import * as path from "https://deno.land/std/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const elfCalories = input.trim().split("\n\n").map((elfInput) => {
  const items = elfInput.trim().split("\n").map(Number);
  const totalCalories = items.reduce((sum, calories) => sum + calories, 0);
  return totalCalories;
});

const maxCalories = Math.max(...elfCalories);

console.log("\n", maxCalories);
