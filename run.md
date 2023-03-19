pnpm exec tsx src/adventOfCode/solve.ts --day 01.1 --model gpt-3.5-turbo --solve-prompt noTemplate --system-prompt systemCodeSolver --solve-failed-prompt failedSolve --solve-failed-attempts 3

# solves days 1-4
pnpm exec tsx src/adventOfCode/solve.ts --day 06.1 --model gpt-4 --pre-solve-prompts chainOfThought/2 --solve-prompt solve/noTemplateNoProblem/3 --system-prompt system/1 --solve-failed-prompt failedSolve/4 --solve-failed-attempts 3

# best gpt-4 so far
pnpm exec tsx src/adventOfCode/solve.ts --day 06.2 --model gpt-4 --pre-solve-prompts chainOfThought/2 --pre-solve-prompts examples/1 --solve-prompt solve/noTemplateNoProblemExamples/3 --system-prompt system/1 --solve-failed-prompt failedSolve/4 --solve-failed-attempts 3
