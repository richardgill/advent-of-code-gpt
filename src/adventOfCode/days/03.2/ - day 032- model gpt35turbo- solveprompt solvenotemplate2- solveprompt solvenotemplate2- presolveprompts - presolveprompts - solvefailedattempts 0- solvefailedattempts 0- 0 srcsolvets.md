# Parameters

{
  "_": [],
  "day": "03.2",
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

Your puzzle answer was 8493.
--- Part Two ---

As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg

And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?


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



import * as path from "https://deno.land/std/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const rucksacks = input.trim().split("\n");

// Part One

const priorities = new Array(52).fill(0);

for (const rucksack of rucksacks) {
  const [comp1, comp2] = [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];
  const commonItems = new Set(comp1.split("").filter((item) => comp2.includes(item)));
  for (const item of commonItems) {
    const priority = item.charCodeAt(0) - (item === item.toUpperCase() ? 38 : 96);
    priorities[priority - 1]++;
  }
}

const partOneAnswer = priorities.reduce((sum, count, i) => sum + count * (i + 1), 0);

console.log("Part One:", partOneAnswer);

// Part Two

const groupRucksacks = new Array(rucksacks.length / 3)
  .fill(null)
  .map((_, i) => rucksacks.slice(i * 3, i * 3 + 3));

const badgePriorities = [];

for (const group of groupRucksacks) {
  const items = group.join("").split("");
  const counts = new Map();
  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  const badge = [...counts.entries()].find(([_, count]) => count === 3)[0];
  const priority = badge.charCodeAt(0) - (badge === badge.toUpperCase() ? 38 : 96);
  badgePriorities.push(priority);
}

const partTwoAnswer = badgePriorities.reduce((sum, priority) => sum + priority, 0);

console.log("Part Two:", partTwoAnswer);
formatting
# Trying solution: 

 ```typescript
import * as path from "https://deno.land/std/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const rucksacks = input.trim().split("\n");

// Part One

const priorities = new Array(52).fill(0);

for (const rucksack of rucksacks) {
  const [comp1, comp2] = [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ];
  const commonItems = new Set(
    comp1.split("").filter((item) => comp2.includes(item)),
  );
  for (const item of commonItems) {
    const priority = item.charCodeAt(0) -
      (item === item.toUpperCase() ? 38 : 96);
    priorities[priority - 1]++;
  }
}

const partOneAnswer = priorities.reduce(
  (sum, count, i) => sum + count * (i + 1),
  0,
);

console.log("Part One:", partOneAnswer);

// Part Two

const groupRucksacks = new Array(rucksacks.length / 3)
  .fill(null)
  .map((_, i) => rucksacks.slice(i * 3, i * 3 + 3));

const badgePriorities = [];

for (const group of groupRucksacks) {
  const items = group.join("").split("");
  const counts = new Map();
  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  const badge = [...counts.entries()].find(([_, count]) => count === 3)[0];
  const priority = badge.charCodeAt(0) -
    (badge === badge.toUpperCase() ? 38 : 96);
  badgePriorities.push(priority);
}

const partTwoAnswer = badgePriorities.reduce(
  (sum, priority) => sum + priority,
  0,
);

console.log("Part Two:", partTwoAnswer);

``` 

solution: Part Two: 2588, actual solution: 2552
Day 03.2 result: ❌   Attempts: 1  Time Taken (secs): 20   GPT Requests: 1   Cost: $0.003588
