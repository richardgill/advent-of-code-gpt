# Parameters

{
  "_": [],
  "day": "08.2",
  "model": "gpt-4",
  "solve-prompt": "solve/noTemplate/2",
  "solvePrompt": "solve/noTemplate/2",
  "preSolvePrompts": [],
  "pre-solve-prompts": [],
  "solveFailedAttempts": 0,
  "solve-failed-attempts": 0,
  "$0": "src/solve.ts"
}

# completionsSoFar: 




# solvePrompt:

Here is a coding problem I am trying to solve:

The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.

First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

30373
25512
65332
33549
35390

Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

    The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
    The top-middle 5 is visible from the top and right.
    The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
    The left-middle 5 is visible, but only from the right.
    The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
    The right-middle 3 is visible from the right.
    In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

Consider your map; how many trees are visible from outside the grid?

Your puzzle answer was 1719.
--- Part Two ---

Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle 5 in the second row:

30373
25512
65332
33549
35390

    Looking up, its view is not blocked; it can see 1 tree (of height 3).
    Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
    Looking right, its view is not blocked; it can see 2 trees.
    Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).

A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).

However, you can do even better: consider the tree of height 5 in the middle of the fourth row:

30373
25512
65332
33549
35390

    Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
    Looking left, its view is not blocked; it can see 2 trees.
    Looking down, its view is also not blocked; it can see 1 tree.
    Looking right, its view is blocked at 2 trees (by a massive tree of height 9).

This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.

Consider each tree on your map. What is the highest scenic score possible for any tree?


You must solve part 2 of the problem using Deno and Typescript.

You can read files in Deno like this:

```typescript
import * as path from 'https://deno.land/std@0.101.0/path/mod.ts'

const readRelativeInput = (importUrl, inputFile) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl))
  const filePath = path.join(dirname, 'data', inputFile)
  return Deno.readTextFileSync(filePath)
}
```

The puzzle input is stored at `./data/puzzleInput.txt`

The last thing your solution should do is print the answer to the puzzle on a new line like this: `console.log('\n', answer)`


# answer: 

Here's a solution for the problem using Deno and TypeScript:

```typescript
import * as path from 'https://deno.land/std@0.101.0/path/mod.ts';

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, 'data', inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, 'puzzleInput.txt');
const grid = input.trim().split('\n').map(line => line.split('').map(Number));

const countVisibleTrees = (grid: number[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const treeHeight = grid[row][col];
      const left = grid[row].slice(0, col).every(h => h < treeHeight);
      const right = grid[row].slice(col + 1).every(h => h < treeHeight);
      const up = grid.slice(0, row).every(r => r[col] < treeHeight);
      const down = grid.slice(row + 1).every(r => r[col] < treeHeight);

      if (left || right || up || down) {
        count++;
      }
    }
  }

  return count;
};

const findHighestScenicScore = (grid: number[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let maxScore = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const treeHeight = grid[row][col];
      const left = grid[row].slice(0, col).reverse().findIndex(h => h >= treeHeight) + 1;
      const right = grid[row].slice(col + 1).findIndex(h => h >= treeHeight) + 1;
      const up = grid.slice(0, row).reverse().findIndex(r => r[col] >= treeHeight) + 1;
      const down = grid.slice(row + 1).findIndex(r => r[col] >= treeHeight) + 1;

      const score = left * right * up * down;
      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
};

const visibleTrees = countVisibleTrees(grid);
console.log('\n', visibleTrees);

const highestScenicScore = findHighestScenicScore(grid);
console.log('\n', highestScenicScore);
```

This solution first reads the input file and creates a grid of tree heights. Then, it defines two functions: `countVisibleTrees` and `findHighestScenicScore`. The first function counts the number of visible trees from outside the grid, and the second function finds the highest scenic score possible for any tree.

Finally, the solution prints the answers to both parts of the problem.
formatting
# Trying solution: 

 ```typescript
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const grid = input.trim().split("\n").map((line) => line.split("").map(Number));

const countVisibleTrees = (grid: number[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const treeHeight = grid[row][col];
      const left = grid[row].slice(0, col).every((h) => h < treeHeight);
      const right = grid[row].slice(col + 1).every((h) => h < treeHeight);
      const up = grid.slice(0, row).every((r) => r[col] < treeHeight);
      const down = grid.slice(row + 1).every((r) => r[col] < treeHeight);

      if (left || right || up || down) {
        count++;
      }
    }
  }

  return count;
};

const findHighestScenicScore = (grid: number[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let maxScore = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const treeHeight = grid[row][col];
      const left = grid[row].slice(0, col).reverse().findIndex((h) =>
        h >= treeHeight
      ) + 1;
      const right = grid[row].slice(col + 1).findIndex((h) => h >= treeHeight) +
        1;
      const up = grid.slice(0, row).reverse().findIndex((r) =>
        r[col] >= treeHeight
      ) + 1;
      const down = grid.slice(row + 1).findIndex((r) => r[col] >= treeHeight) +
        1;

      const score = left * right * up * down;
      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
};

const visibleTrees = countVisibleTrees(grid);
console.log("\n", visibleTrees);

const highestScenicScore = findHighestScenicScore(grid);
console.log("\n", highestScenicScore);

``` 

solution: 6930, actual solution: 590824
Day 08.2 result: ❌   Attempts: 1  Time Taken (secs): 51   GPT Requests: 1   Cost: $0.07389
