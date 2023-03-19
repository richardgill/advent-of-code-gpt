# Parameters

{
  "_": [],
  "day": "02.2",
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

The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.

Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.

Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.

The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.

The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.

For example, suppose you were given the following strategy guide:

A Y
B X
C Z

This strategy guide predicts and recommends the following:

    In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
    In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
    The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.

In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).

What would your total score be if everything goes exactly according to your strategy guide?

Your puzzle answer was 11475.
--- Part Two ---

The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

    In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
    In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
    In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.

Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?


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

Here's a solution using Deno and TypeScript:

```typescript
import * as path from 'https://deno.land/std@0.101.0/path/mod.ts';

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, 'data', inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, 'puzzleInput.txt');

const lines = input.trim().split('\n');

const scoreRound = (opponent: string, outcome: string): number => {
  let yourShape: number;
  let score: number;

  if (outcome === 'X') {
    // You need to lose
    if (opponent === 'A') {
      yourShape = 3; // Scissors
    } else if (opponent === 'B') {
      yourShape = 1; // Rock
    } else {
      yourShape = 2; // Paper
    }
    score = yourShape;
  } else if (outcome === 'Y') {
    // You need to draw
    if (opponent === 'A') {
      yourShape = 1; // Rock
    } else if (opponent === 'B') {
      yourShape = 2; // Paper
    } else {
      yourShape = 3; // Scissors
    }
    score = yourShape + 3;
  } else {
    // You need to win
    if (opponent === 'A') {
      yourShape = 2; // Paper
    } else if (opponent === 'B') {
      yourShape = 3; // Scissors
    } else {
      yourShape = 1; // Rock
    }
    score = yourShape + 6;
  }

  return score;
};

let totalScore = 0;

for (const line of lines) {
  const [opponent, outcome] = line.split(' ');
  totalScore += scoreRound(opponent, outcome);
}

console.log('\n', totalScore);
```

This code reads the input file, processes each line, and calculates the total score based on the opponent's choice and the desired outcome. Finally, it prints the total score.
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

const lines = input.trim().split("\n");

const scoreRound = (opponent: string, outcome: string): number => {
  let yourShape: number;
  let score: number;

  if (outcome === "X") {
    // You need to lose
    if (opponent === "A") {
      yourShape = 3; // Scissors
    } else if (opponent === "B") {
      yourShape = 1; // Rock
    } else {
      yourShape = 2; // Paper
    }
    score = yourShape;
  } else if (outcome === "Y") {
    // You need to draw
    if (opponent === "A") {
      yourShape = 1; // Rock
    } else if (opponent === "B") {
      yourShape = 2; // Paper
    } else {
      yourShape = 3; // Scissors
    }
    score = yourShape + 3;
  } else {
    // You need to win
    if (opponent === "A") {
      yourShape = 2; // Paper
    } else if (opponent === "B") {
      yourShape = 3; // Scissors
    } else {
      yourShape = 1; // Rock
    }
    score = yourShape + 6;
  }

  return score;
};

let totalScore = 0;

for (const line of lines) {
  const [opponent, outcome] = line.split(" ");
  totalScore += scoreRound(opponent, outcome);
}

console.log("\n", totalScore);

``` 

solution: 16862, actual solution: 16862
Solved!
Day 02.2 result: ✅   Attempts: 1  Time Taken (secs): 54   GPT Requests: 1   Cost: $0.058800000000000005
