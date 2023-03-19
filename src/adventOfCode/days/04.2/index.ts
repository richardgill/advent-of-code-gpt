import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const parseRange = (range: string): [number, number] => {
  const [start, end] = range.split("-").map(Number);
  return [start, end];
};

const parsePairs = (input: string) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(parseRange));
};

const isContained = (
  [aStart, aEnd]: [number, number],
  [bStart, bEnd]: [number, number],
): boolean => {
  return aStart >= bStart && aEnd <= bEnd;
};

const isOverlapping = (
  [aStart, aEnd]: [number, number],
  [bStart, bEnd]: [number, number],
): boolean => {
  return aStart <= bEnd && aEnd >= bStart;
};

const countContainedPairs = (
  pairs: Array<[[number, number], [number, number]]>,
): number => {
  return pairs.filter(([a, b]) => isContained(a, b) || isContained(b, a))
    .length;
};

const countOverlappingPairs = (
  pairs: Array<[[number, number], [number, number]]>,
): number => {
  return pairs.filter(([a, b]) => isOverlapping(a, b)).length;
};

const pairs = parsePairs(input);
const containedPairs = countContainedPairs(pairs);
const overlappingPairs = countOverlappingPairs(pairs);

console.log("\n", containedPairs);
console.log("\n", overlappingPairs);
