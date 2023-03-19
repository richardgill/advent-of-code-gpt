// main.ts
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string): string => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const isStartOfMessage = (s: string): boolean => {
  return new Set(s).size === 14;
};

const findStartOfMessage = (buffer: string): number => {
  const bufferLength = buffer.length;

  for (let i = 0; i < bufferLength; i++) {
    if (i + 14 > bufferLength) {
      break;
    }

    const substring = buffer.slice(i, i + 14);

    if (isStartOfMessage(substring)) {
      return i + 14;
    }
  }

  return -1;
};

const inputBuffer = readRelativeInput(import.meta.url, "puzzleInput.txt");
const answer = findStartOfMessage(inputBuffer);
console.log("\n", answer);
