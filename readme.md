# GPT Advent of code

An attempt to solve the Advent of Code puzzles using by asking GPT for the answers and executing the code inside Deno.

# Setup

Install node and node 18

Install pnpm

`pnpm install`

Install Deno

Add a `.env` file with `OPENAI_API_KEY="sk-xyz" in it.

# Run

```bash
pnpm exec tsx src/solve.ts \
  --day 01.1 \
  --model gpt-3.5-turbo \
  --pre-solve-prompts chainOfThought/2  \
  --solve-prompt solve/noTemplateNoProblem/3 \
  --system-prompt system/1 \
  --solve-failed-prompt failedSolve/4 \
  --solve-failed-attempts 3
```
