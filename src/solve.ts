#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { commonArgs } from './commandLineArgs.js'
import { aocSolver } from './solver/solver.js'
import { logger } from './solver/logger.js'
import { SolveArgs } from './solver/types.js'

const args = (await yargs(process.argv.slice(2))
  .options({
    ...commonArgs,
    day: { type: 'string', demandOption: true },
  })
  .strict(true)
  .strictOptions(true).argv) as SolveArgs

await aocSolver(args)
