// Import required modules
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

// Read input file
const readRelativeInput = (importUrl: string, inputFile: string): string => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

// Check if a string of length 4 has distinct characters
const isDistinct = (s: string): boolean => {
  return new Set(s).size === 4;
};

// Find the position of the first start-of-packet marker
const findMarkerPosition = (datastream: string): number => {
  let position = 0;

  while (position <= datastream.length - 4) {
    const window = datastream.slice(position, position + 4);

    if (isDistinct(window)) {
      return position + 4;
    }

    position++;
  }

  return -1;
};

// Read the puzzle input and solve the problem
const puzzleInput = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = findMarkerPosition(puzzleInput);

// Print the answer
console.log("\n", answer);
