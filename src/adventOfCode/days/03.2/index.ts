import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");
const lines = input.trim().split("\n");

const getPriority = (item: string): number => {
  const charCode = item.charCodeAt(0);
  return charCode >= 97 ? charCode - 96 : charCode - 64 + 26;
};

const findCommonItems = (rucksack: string): string => {
  const half = rucksack.length / 2;
  const compartment1 = rucksack.slice(0, half);
  const compartment2 = rucksack.slice(half);

  for (const item of compartment1) {
    if (compartment2.includes(item)) {
      return item;
    }
  }

  return "";
};

const part1 = (): number => {
  let sum = 0;

  for (const rucksack of lines) {
    const commonItem = findCommonItems(rucksack);
    sum += getPriority(commonItem);
  }

  return sum;
};

const part2 = (): number => {
  let sum = 0;

  for (let i = 0; i < lines.length; i += 3) {
    const rucksack1 = lines[i];
    const rucksack2 = lines[i + 1];
    const rucksack3 = lines[i + 2];

    for (const item of rucksack1) {
      if (rucksack2.includes(item) && rucksack3.includes(item)) {
        sum += getPriority(item);
        break;
      }
    }
  }

  return sum;
};

console.log("\n", part1());
console.log("\n", part2());
