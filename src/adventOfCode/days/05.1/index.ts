// rearrangeCrates.ts
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string): string => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const parseInput = (
  input: string,
): [string[][], [number, number, number][]] => {
  const [stacksData, ...movesData] = input.trim().split("\n");
  const stacks = stacksData
    .split(" ")
    .map((stack) => stack.split("").reverse());
  const moves = movesData.map((move) => {
    const [numCrates, src, dest] = move.split(" ").map(Number);
    return [numCrates, src, dest] as [number, number, number];
  });
  return [stacks, moves];
};

const rearrangeCrates = (
  stacks: string[][],
  moves: [number, number, number][],
): string => {
  console.log("Initial stacks:", stacks);

  // Perform the rearrangement
  for (const [numCrates, src, dest] of moves) {
    console.log(
      `Moving ${numCrates} crates from stack ${src} to stack ${dest}`,
    );
    for (let i = 0; i < numCrates; i++) {
      const crate = stacks[src - 1].pop();
      stacks[dest - 1].push(crate!);
    }
    console.log("Current stacks:", stacks);
  }

  // Extract the top crates
  const topCrates = stacks.map((stack) => stack[stack.length - 1]);

  // Combine the top crates to form the final message
  const message = topCrates.join("");
  console.log("Top crates:", topCrates, "Message:", message);

  return message;
};

const examples: string[] = [
  `ZN MC D P
1 2 1
3 1 3
2 2 1
1 1 2`,
  `A B C
1 1 2
1 2 3
1 3 1`,
  `XY Z
1 1 2
1 2 1`,
  `ABC DEF GHI
3 1 2
3 2 3
3 3 1`,
];

for (const example of examples) {
  console.log("\nExample:");
  const [stacks, moves] = parseInput(example);
  rearrangeCrates(stacks, moves);
}

console.log("\nPuzzle input:");
const puzzleInput = readRelativeInput(import.meta.url, "puzzleInput.txt");
const [stacks, moves] = parseInput(puzzleInput);
const answer = rearrangeCrates(stacks, moves);
console.log("\n", answer);
