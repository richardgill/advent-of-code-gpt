import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const countVisibleTrees = (grid: string[][]) => {
  let visibleTrees = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentTree = parseInt(grid[i][j]);

      const left = grid[i].slice(0, j).every((tree) =>
        parseInt(tree) < currentTree
      );
      const right = grid[i].slice(j + 1).every((tree) =>
        parseInt(tree) < currentTree
      );
      const up = grid.slice(0, i).every((row) =>
        parseInt(row[j]) < currentTree
      );
      const down = grid.slice(i + 1).every((row) =>
        parseInt(row[j]) < currentTree
      );

      if (left || right || up || down) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
};

const main = () => {
  const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
  const grid = input.trim().split("\n").map((line) => line.split(""));

  const answer = countVisibleTrees(grid);
  console.log("\n", answer);
};

main();
