# Parameters

{
  "_": [],
  "day": "03.1",
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

One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

    The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
    The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
    The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
    The fourth rucksack's compartments only share item type v.
    The fifth rucksack's compartments only share item type t.
    The sixth rucksack's compartments only share item type s.

To help prioritize item rearrangement, every item type can be converted to a priority:

    Lowercase item types a through z have priorities 1 through 26.
    Uppercase item types A through Z have priorities 27 through 52.

In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?


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

const readRelativeInput = (importUrl, inputFile) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, 'data', inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, 'puzzleInput.txt');
const rucksacks = input.trim().split('\n');

const findCommonItems = (rucksack: string): string => {
  const halfLength = rucksack.length / 2;
  const compartment1 = rucksack.slice(0, halfLength);
  const compartment2 = rucksack.slice(halfLength);

  for (const item of compartment1) {
    if (compartment2.includes(item)) {
      return item;
    }
  }

  return '';
};

const itemPriority = (item: string): number => {
  const charCode = item.charCodeAt(0);
  return charCode >= 65 && charCode <= 90 ? charCode - 64 + 26 : charCode - 96;
};

const commonItems = rucksacks.map(findCommonItems);
const priorities = commonItems.map(itemPriority);
const answer = priorities.reduce((sum, priority) => sum + priority, 0);

console.log('\n', answer);
```

This code first reads the input file and splits it into an array of rucksacks. Then, it defines a `findCommonItems` function that takes a rucksack string and returns the item that appears in both compartments. The `itemPriority` function calculates the priority of a given item.

The code then maps the rucksacks to their common items, calculates the priorities of those items, and sums them up to get the answer. Finally, it prints the answer on a new line.
formatting
# Trying solution: 

 ```typescript
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl, inputFile) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const rucksacks = input.trim().split("\n");

const findCommonItems = (rucksack: string): string => {
  const halfLength = rucksack.length / 2;
  const compartment1 = rucksack.slice(0, halfLength);
  const compartment2 = rucksack.slice(halfLength);

  for (const item of compartment1) {
    if (compartment2.includes(item)) {
      return item;
    }
  }

  return "";
};

const itemPriority = (item: string): number => {
  const charCode = item.charCodeAt(0);
  return charCode >= 65 && charCode <= 90 ? charCode - 64 + 26 : charCode - 96;
};

const commonItems = rucksacks.map(findCommonItems);
const priorities = commonItems.map(itemPriority);
const answer = priorities.reduce((sum, priority) => sum + priority, 0);

console.log("\n", answer);

``` 

solution: 8493, actual solution: 8493
Solved!
Day 03.1 result: ✅   Attempts: 1  Time Taken (secs): 27   GPT Requests: 1   Cost: $0.0492
