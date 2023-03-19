// Import path module from Deno standard library
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

type Instruction = ["addx", number] | ["noop"];

const parseInput = (input: string): Instruction[] => {
  return input.split("\n").map((line) => {
    const [instruction, value] = line.split(" ");
    return instruction === "addx" ? ["addx", parseInt(value)] : ["noop"];
  });
};

const sumSignalStrengths = (instructions: Instruction[]): number => {
  let cycle = 0;
  let registerX = 1;
  let sumSignalStrengths = 0;
  let instructionIndex = 0;

  while (cycle <= 220) {
    if (
      cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 ||
      cycle === 180 || cycle === 220
    ) {
      sumSignalStrengths += cycle * registerX;
    }

    const instruction = instructions[instructionIndex];
    if (instruction[0] === "addx") {
      cycle++;
      if (cycle % 2 === 0) {
        registerX += instruction[1];
        instructionIndex++;
      }
    } else {
      cycle++;
      instructionIndex++;
    }
  }

  return sumSignalStrengths;
};

const instructions = parseInput(input);
const answer = sumSignalStrengths(instructions);
console.log("\n", answer);
