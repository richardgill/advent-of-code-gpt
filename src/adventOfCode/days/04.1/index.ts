// Import path module from Deno standard library
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

// Function to read input file
const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

// Function to check if a range is fully contained within another range
const isContained = (
  range1: [number, number],
  range2: [number, number],
): boolean => {
  return (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
    (range2[0] >= range1[0] && range2[1] <= range1[1]);
};

// Read input file
const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

// Split input into lines and process each line
const lines = input.trim().split("\n");
let count = 0;

for (const line of lines) {
  const [range1, range2] = line.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    return [start, end] as [number, number];
  });

  if (isContained(range1, range2)) {
    count++;
  }
}

// Print the answer
console.log("\n", count);
