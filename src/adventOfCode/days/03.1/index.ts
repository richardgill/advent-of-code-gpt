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
