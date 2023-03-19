# Parameters

{
  "_": [],
  "day": "06.1",
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

The preparations are finally complete; you and the Elves leave camp on foot and begin to make your way toward the star fruit grove.

As you move through the dense undergrowth, one of the Elves gives you a handheld device. He says that it has many fancy features, but the most important one to set up right now is the communication system.

However, because he's heard you have significant experience dealing with signal-based systems, he convinced the other Elves that it would be okay to give you their one malfunctioning device - surely you'll have no problem fixing it.

As if inspired by comedic timing, the device emits a few colorful sparks.

To be able to communicate with the Elves, the device needs to lock on to their signal. The signal is a series of seemingly-random characters that the device receives one at a time.

To fix the communication system, you need to add a subroutine to the device that detects a start-of-packet marker in the datastream. In the protocol being used by the Elves, the start of a packet is indicated by a sequence of four characters that are all different.

The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

For example, suppose you receive the following datastream buffer:

mjqjpqmgbljsphdztnvjfqwrcgsmlb

After the first three characters (mjq) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters mjqj. Because j is repeated, this isn't a marker.

The first time a marker appears is after the seventh character arrives. Once it does, the last four characters received are jpqm, which are all different. In this case, your subroutine should report the value 7, because the first start-of-packet marker is complete after 7 characters have been processed.

Here are a few more examples:

    bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
    nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
    nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11

How many characters need to be processed before the first start-of-packet marker is detected?


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

const findStartOfPacketMarker = (datastream: string): number => {
  for (let i = 3; i < datastream.length; i++) {
    if (
      datastream[i] !== datastream[i - 1] &&
      datastream[i] !== datastream[i - 2] &&
      datastream[i] !== datastream[i - 3] &&
      datastream[i - 1] !== datastream[i - 2] &&
      datastream[i - 1] !== datastream[i - 3] &&
      datastream[i - 2] !== datastream[i - 3]
    ) {
      return i + 1;
    }
  }
  return -1;
};

const main = () => {
  const puzzleInput = readRelativeInput(import.meta.url, 'puzzleInput.txt');
  const answer = findStartOfPacketMarker(puzzleInput);
  console.log('\n', answer);
};

main();
```

This solution defines a function `findStartOfPacketMarker` that takes a datastream as input and returns the number of characters that need to be processed before the first start-of-packet marker is detected. The main function reads the puzzle input from the file and calls `findStartOfPacketMarker` with the input, then prints the answer.
formatting
# Trying solution: 

 ```typescript
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const findStartOfPacketMarker = (datastream: string): number => {
  for (let i = 3; i < datastream.length; i++) {
    if (
      datastream[i] !== datastream[i - 1] &&
      datastream[i] !== datastream[i - 2] &&
      datastream[i] !== datastream[i - 3] &&
      datastream[i - 1] !== datastream[i - 2] &&
      datastream[i - 1] !== datastream[i - 3] &&
      datastream[i - 2] !== datastream[i - 3]
    ) {
      return i + 1;
    }
  }
  return -1;
};

const main = () => {
  const puzzleInput = readRelativeInput(import.meta.url, "puzzleInput.txt");
  const answer = findStartOfPacketMarker(puzzleInput);
  console.log("\n", answer);
};

main();

``` 

solution: 1766, actual solution: 1766
Solved!
Day 06.1 result: ✅   Attempts: 1  Time Taken (secs): 29   GPT Requests: 1   Cost: $0.04326000000000001
