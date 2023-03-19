import * as path from "https://deno.land/std/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string): string => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

interface Stack {
  crates: string[];
  positions: number[];
}

const parseInput = (input: string): Stack[] => {
  const stacks: Stack[] = [];
  const lines = input.trim().split("\n");
  for (let i = 0; i < lines.length; i++) {
    const stack: Stack = { crates: [], positions: [] };
    const crates = lines[i].match(/\[(.*?)\]/g);
    for (let j = 0; j < crates.length; j++) {
      const crate = crates[j].replace(/\[|\]/g, "");
      stack.crates.push(crate);
      stack.positions.push(j);
    }
    stacks.push(stack);
  }
  return stacks;
};

const moveCrates = (
  stacks: Stack[],
  from: number,
  to: number,
  count: number,
) => {
  const movedCrates = stacks[from].crates.slice(-count);
  const movedPositions = stacks[from].positions.slice(-count);
  stacks[from].crates.splice(-count);
  stacks[from].positions.splice(-count);
  stacks[to].crates.push(...movedCrates);
  stacks[to].positions.push(
    ...movedPositions.map((p) =>
      p - movedPositions[0] + stacks[to].positions.length
    ),
  );
};

const simulateRearrangement = (stacks: Stack[], input: string) => {
  const lines = input.trim().split("\n");
  for (let i = 0; i < lines.length; i++) {
    const [countStr, fromStr, toStr] = lines[i].split(" ");
    const count = parseInt(countStr);
    const from = parseInt(fromStr) - 1;
    const to = parseInt(toStr) - 1;
    moveCrates(stacks, from, to, count);
  }
};

const getTopCrates = (stacks: Stack[]): string => {
  let result = "";
  for (let i = 0; i < stacks.length; i++) {
    const topIndex = stacks[i].positions.indexOf(stacks[i].crates.length - 1);
    result += stacks[i].crates[topIndex];
  }
  return result;
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const stacks = parseInput(input);
simulateRearrangement(stacks, input);
const answer = getTopCrates(stacks);
console.log("\n", answer);
