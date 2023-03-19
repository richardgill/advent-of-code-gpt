# Parameters

{
  "_": [],
  "day": "02.1",
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


You must solve  the problem using Deno and Typescript.

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

const calculateScore = (input: string) => {
  const lines = input.trim().split('\n');
  let totalScore = 0;

  for (const line of lines) {
    const [opponent, response] = line.split(' ');

    const opponentValue = opponent === 'A' ? 1 : opponent === 'B' ? 2 : 3;
    const responseValue = response === 'X' ? 1 : response === 'Y' ? 2 : 3;

    if (opponentValue === responseValue) {
      totalScore += responseValue + 3;
    } else if (
      (opponentValue === 1 && responseValue === 2) ||
      (opponentValue === 2 && responseValue === 3) ||
      (opponentValue === 3 && responseValue === 1)
    ) {
      totalScore += responseValue + 6;
    } else {
      totalScore += responseValue;
    }
  }

  return totalScore;
};

const input = readRelativeInput(import.meta.url, 'puzzleInput.txt');
const answer = calculateScore(input);
console.log('\n', answer);
```

This script reads the input file, calculates the total score based on the strategy guide, and prints the answer. Make sure to store the puzzle input in a file named `puzzleInput.txt` inside a folder named `data` in the same directory as the script.
formatting
# Trying solution: 

 ```typescript
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const calculateScore = (input: string) => {
  const lines = input.trim().split("\n");
  let totalScore = 0;

  for (const line of lines) {
    const [opponent, response] = line.split(" ");

    const opponentValue = opponent === "A" ? 1 : opponent === "B" ? 2 : 3;
    const responseValue = response === "X" ? 1 : response === "Y" ? 2 : 3;

    if (opponentValue === responseValue) {
      totalScore += responseValue + 3;
    } else if (
      (opponentValue === 1 && responseValue === 2) ||
      (opponentValue === 2 && responseValue === 3) ||
      (opponentValue === 3 && responseValue === 1)
    ) {
      totalScore += responseValue + 6;
    } else {
      totalScore += responseValue;
    }
  }

  return totalScore;
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = calculateScore(input);
console.log("\n", answer);

``` 

solution: 11475, actual solution: 11475
Solved!
Day 02.1 result: ✅   Attempts: 1  Time Taken (secs): 38   GPT Requests: 1   Cost: $0.0447
