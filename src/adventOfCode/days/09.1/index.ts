// rope_simulation.ts
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

type Point = [number, number];

const simulateRope = (motions: string[]): number => {
  const head: Point = [0, 0];
  const tail: Point = [0, 0];
  const visited = new Set<string>();

  for (const motion of motions) {
    const direction = motion[0];
    const steps = parseInt(motion.slice(1));

    for (let i = 0; i < steps; i++) {
      if (direction === "R") {
        head[0] += 1;
      } else if (direction === "L") {
        head[0] -= 1;
      } else if (direction === "U") {
        head[1] += 1;
      } else if (direction === "D") {
        head[1] -= 1;
      }

      const dx = head[0] - tail[0];
      const dy = head[1] - tail[1];

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        tail[0] += Math.sign(dx);
        tail[1] += Math.sign(dy);
      }

      visited.add(`${tail[0]},${tail[1]}`);
    }
  }

  return visited.size;
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const motions = input.trim().split("\n");
const answer = simulateRope(motions);

console.log("\n", answer);
