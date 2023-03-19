# Parameters

{
  "_": [],
  "day": "02.1",
  "model": "gpt-3.5-turbo",
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



First, we need to parse the input file and store the strategy guide in a data structure that we can use to determine our response to each round. We can represent the strategy guide as an object where the keys are the opponent's choices (A, B, or C) and the values are our responses (X, Y, or Z).

Here's the code to parse the input file and create the strategy guide object:

```typescript
const input = readRelativeInput(import.meta.url, 'puzzleInput.txt')

const strategyGuide = input
  .trim()
  .split('\n')
  .reduce((guide, line) => {
    const [opponent, response] = line.split(' ')
    guide[opponent] = response
    return guide
  }, {})
```

Next, we need to implement the game logic to determine the winner of each round and calculate our score. We can define a function `playRound` that takes our response and the opponent's choice and returns the score for that round.

```typescript
const playRound = (response: string, opponent: string): number => {
  const choices = { X: 1, Y: 2, Z: 3 }
  const outcomes = {
    'AX': 6,
    'AY': 2,
    'AZ': 0,
    'BX': 0,
    'BY': 6,
    'BZ': 2,
    'CX': 2,
    'CY': 0,
    'CZ': 6,
  }
  const outcome = outcomes[`${opponent}${response}`]
  return choices[response] + outcome
}
```

Finally, we can iterate over each round, use the strategy guide to determine our response, and calculate our score for that round. We can keep a running total of our score and print the final result.

```typescript
let score = 0

for (const opponent of Object.keys(strategyGuide)) {
  const response = strategyGuide[opponent]
  const roundScore = playRound(response, opponent)
  score += roundScore
}

console.log('\n', score)
```

Putting it all together, here's the complete solution:

```typescript
import * as path from 'https://deno.land/std/path/mod.ts'

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl))
  const filePath = path.join(dirname, 'data', inputFile)
  return Deno.readTextFileSync(filePath)
}

const input = readRelativeInput(import.meta.url, 'puzzleInput.txt')

const strategyGuide = input
  .trim()
  .split('\n')
  .reduce((guide, line) => {
    const [opponent, response] = line.split(' ')
    guide[opponent] = response
    return guide
  }, {})

const playRound = (response: string, opponent: string): number => {
  const choices = { X: 1, Y: 2, Z: 3 }
  const outcomes = {
    'AX': 6,
    'AY': 2,
    'AZ': 0,
    'BX': 0,
    'BY': 6,
    'BZ': 2,
    'CX': 2,
    'CY': 0,
    'CZ': 6,
  }
  const outcome = outcomes[`${opponent}${response}`]
  return choices[response] + outcome
}

let score = 0

for (const opponent of Object.keys(strategyGuide)) {
  const response = strategyGuide[opponent]
  const roundScore = playRound(response, opponent)
  score += roundScore
}

console.log('\n', score)
```
formatting
# Trying solution: 

 ```typescript
const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const strategyGuide = input
  .trim()
  .split("\n")
  .reduce((guide, line) => {
    const [opponent, response] = line.split(" ");
    guide[opponent] = response;
    return guide;
  }, {});

``` 

Run unsuccessful
stdout:
 

 stderr:
[0m[1m[31merror[0m: Uncaught ReferenceError: readRelativeInput is not defined
const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
[0m[31m              ^[0m
    at [0m[36mfile:///Users/richardgill/Workspace/advent-of-code-gpt/src/adventOfCode/days/02.1/index.ts[0m:[0m[33m1[0m:[0m[33m15[0m

Day 02.1 result: ❌   Attempts: 1  Time Taken (secs): 37   GPT Requests: 1   Cost: $0.002994
