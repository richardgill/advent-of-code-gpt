import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const calculateScenicScore = (
  grid: string[][],
  row: number,
  col: number,
): number => {
  const height = parseInt(grid[row][col]);
  let up = 1, down = 1, left = 1, right = 1;

  for (let r = row - 1; r >= 0 && parseInt(grid[r][col]) < height; r--) up++;
  for (
    let r = row + 1;
    r < grid.length && parseInt(grid[r][col]) < height;
    r++
  ) down++;
  for (let c = col - 1; c >= 0 && parseInt(grid[row][c]) < height; c--) left++;
  for (
    let c = col + 1;
    c < grid[row].length && parseInt(grid[row][c]) < height;
    c++
  ) right++;

  return up * down * left * right;
};

const findHighestScenicScore = (input: string): number => {
  const grid = input.trim().split("\n").map((line) => line.split(""));
  let maxScenicScore = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const scenicScore = calculateScenicScore(grid, row, col);
      maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
  }

  return maxScenicScore;
};

const puzzleInput = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = findHighestScenicScore(puzzleInput);
console.log("\n", answer);
