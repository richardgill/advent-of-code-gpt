import { Options } from 'yargs'

export const commonArgs = {
  model: { type: 'string', demandOption: true } as Options,
  preSolvePrompts: {
    type: 'array',
    demandOption: false,
    default: [],
  } as Options,
  solvePrompt: { type: 'string', demandOption: false } as Options,
  solveFailedPrompt: { type: 'string', demandOption: false } as Options,
  solveFailedAttempts: {
    type: 'number',
    demandOption: false,
    default: 0,
  } as Options,
  systemPrompt: { type: 'string', demandOption: false } as Options,
}
