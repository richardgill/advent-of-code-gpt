import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

type Position = [number, number];

const move = (pos: Position, direction: string, steps: number): Position => {
  const newPos = [...pos] as Position;
  switch (direction) {
    case "R":
      newPos[0] += steps;
      break;
    case "L":
      newPos[0] -= steps;
      break;
    case "U":
      newPos[1] += steps;
      break;
    case "D":
      newPos[1] -= steps;
      break;
  }
  return newPos;
};

const simulateRope = (input: string) => {
  const instructions = input.trim().split("\n");
  const visited = new Set<string>();
  const knots: Position[] = Array(10).fill([0, 0]);

  for (const instruction of instructions) {
    const direction = instruction[0];
    const steps = parseInt(instruction.slice(1));

    for (let i = 0; i < steps; i++) {
      for (let j = knots.length - 1; j > 0; j--) {
        knots[j] = knots[j - 1];
      }
      knots[0] = move(knots[0], direction, 1);
      if (knots[9] !== knots[8]) {
        visited.add(knots[9].toString());
      }
    }
  }

  return visited.size;
};

const answer = simulateRope(input);
console.log("\n", answer);
