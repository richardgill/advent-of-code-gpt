import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const examples: string[] = [
  "11111\n11111\n11111\n11111\n11111\n",
  "12345\n54321\n11111\n54321\n12345\n",
  "98789\n87678\n76567\n87678\n98789\n",
  "30373\n25512\n65332\n33549\n35390\n",
];

const calculateScenicScore = (
  grid: number[][],
  row: number,
  col: number,
): number => {
  const height = grid[row][col];
  let up = 0, down = 0, left = 0, right = 0;

  for (let r = row - 1; r >= 0; r--) {
    if (grid[r][col] >= height) break;
    up++;
  }

  for (let r = row + 1; r < grid.length; r++) {
    if (grid[r][col] >= height) break;
    down++;
  }

  for (let c = col - 1; c >= 0; c--) {
    if (grid[row][c] >= height) break;
    left++;
  }

  for (let c = col + 1; c < grid[row].length; c++) {
    if (grid[row][c] >= height) break;
    right++;
  }

  // Remove the addition of 1 to each direction
  return up * down * left * right;
};

const findHighestScenicScore = (input: string): number => {
  const grid = input.trim().split("\n").map((line) =>
    line.split("").map(Number)
  );
  let maxScenicScore = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const scenicScore = calculateScenicScore(grid, row, col);
      maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
  }

  return maxScenicScore;
};

// Run examples and print answers
examples.forEach((example, index) => {
  console.log(`Example ${index + 1}:`);
  console.log(example);
  console.log("Scenic Score:", findHighestScenicScore(example));
  console.log("-------------------");
});

// Read puzzle input and find the answer
const puzzleInput = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = findHighestScenicScore(puzzleInput);
console.log("\n", answer);
