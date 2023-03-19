import _ from 'lodash'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import {
  resetUsage,
  retryCreateChatCompletion,
  summarizeUsage,
} from '../openapi.js'
import {
  chatCompletions,
  generatePrompt,
  getDenoSolutionTemplate,
  getProblem,
  limitString,
  trySolutions,
} from './common.js'
import { logger, setFileLogDestination } from './logger.js'
import { SolveArgs } from './types.js'
import { performance } from 'perf_hooks'

const MAX_CHAR_LENGTH = 3000 * 4 // ~3000 tokens

export const aocSolver = async (params: SolveArgs) => {
  const {
    day,
    model,
    preSolvePrompts: preSolvePromptFiles,
    solvePrompt: solvePromptFile,
    solveFailedPrompt: solveFailedPromptFile,
    solveFailedAttempts,
    systemPrompt: systemPromptFile,
  } = params
  const startTime = performance.now()
  resetUsage()

  await setFileLogDestination(`./src/adventOfCode/days/${day}/`, params)
  logger.debug(`# Parameters\n\n${JSON.stringify(params, null, 2)}`)
  const modelSettings = {
    model: model,
    temperature: 0,
  }

  const problem = getProblem(day)
  const promptVariables = {
    problem,
    day,
    solutionTemplate: getDenoSolutionTemplate(),
    partDescription: day.endsWith('.2') ? 'part 2 of' : '',
  }

  const systemPrompt = systemPromptFile
    ? generatePrompt(systemPromptFile, promptVariables)
    : null

  if (systemPrompt) {
    logger.debug(`# systemPrompt\n\n${systemPrompt}`)
  }
  const preSolvePrompts = preSolvePromptFiles.map((preSolvePrompt) => ({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: generatePrompt(preSolvePrompt, promptVariables),
  }))

  if (preSolvePrompts.length > 0) {
    logger.debug(
      `# preSolvePrompts\n\n${preSolvePrompts
        .map((psp, index) => `## preSolvePrompt: ${index}\n\n${psp.content}`)
        .join('\n\n')}`
    )
  }

  const completionsSoFar = await chatCompletions(
    modelSettings,
    _.compact([
      systemPrompt ? { role: 'system', content: systemPrompt } : null,
      ...preSolvePrompts,
    ])
  )

  logger.debug(
    `\n# completionsSoFar: \n\n${completionsSoFar
      .map((c, index) => `## completion ${index} \n${c.role}: \n\n${c.content}`)
      .join('\n\n')}`
  )

  const solvePrompt = generatePrompt(solvePromptFile, promptVariables)

  logger.debug(`\n\n# solvePrompt:\n\n${solvePrompt}\n`)

  completionsSoFar.push({ role: 'user', content: solvePrompt })

  const completion = await retryCreateChatCompletion({
    ...modelSettings,
    messages: completionsSoFar,
  })

  completionsSoFar.push(completion.data.choices[0].message)

  let answer = completion.data.choices[0].message.content as string

  logger.debug(`# answer: \n\n${answer}`)
  let result = trySolutions(day, answer)
  let attempts = 1
  while (!result.success && attempts < solveFailedAttempts) {
    const solveFailedPrompt = generatePrompt(solveFailedPromptFile, {
      ...promptVariables,
      answer,
      codeBlock: result.codeBlock,
      solveOutput: limitString(result.fullMessage, MAX_CHAR_LENGTH),
      stdOutUnder1000Chars: result.stdout.length < 1000,
    })

    logger.debug(`\n\n# solveFailedPrompt:\n\n${solveFailedPrompt}\n`)
    completionsSoFar.push({ role: 'user', content: solveFailedPrompt })
    // remove the 3rd from last and 4th from last to make room for the new prompt
    completionsSoFar.splice(completionsSoFar.length - 3, 2)

    const completion = await retryCreateChatCompletion({
      ...modelSettings,
      messages: completionsSoFar,
    })
    completionsSoFar.push(completion.data.choices[0].message)

    answer = completion.data.choices[0].message.content
    logger.debug(`# answer: \n\n${answer}`)

    result = trySolutions(day, answer)
    attempts++
  }
  const endTime = performance.now()
  const timeInSeconds = (endTime - startTime) / 1000
  const finalResult = {
    ...result,
    attempts,
    usage: summarizeUsage(model),
    timeInSeconds,
  }
  logger.info(
    `Day ${day} result: ${
      finalResult.success ? '✅' : '❌'
    }   Attempts: ${attempts}  Time Taken (secs): ${Math.ceil(
      timeInSeconds
    )}   GPT Requests: ${finalResult.usage.requestCount}   Cost: $${
      finalResult.usage.totalCost / 100
    }`
  )
  return finalResult
}
