#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { commonArgs } from './commandLineArgs.js'
import { aocSolver } from './solver/solver.js'
import { logger } from './solver/logger.js'
import { SolveArgs } from './solver/types.js'

const args = await yargs(process.argv.slice(2))
  .options(commonArgs)
  .strict(true)
  .strictOptions(true).argv

// list folders in the src/adventOfCode/days folder
const days = fs.readdirSync(path.join(process.cwd(), 'src/adventOfCode/days'))

for (const day of days) {
  try {
    await aocSolver({ ...args, day } as SolveArgs)
  } catch (e) {
    logger.error(`Day: ${day} failed with error: ❌ ${e.message}`)
  }
}
