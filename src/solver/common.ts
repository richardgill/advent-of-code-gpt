import path from 'path'
import fs from 'fs'
import shelljs from 'shelljs'
import { retryCreateChatCompletion } from '../openapi.js'
import mustache from 'mustache'
import { logger } from './logger.js'
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  CreateChatCompletionRequest,
} from 'openai'
import _ from 'lodash'

export const getDenoSolutionTemplate = () =>
  fs.readFileSync('./src/adventOfCode/denoSolutionTemplate.ts', 'utf8')

export const getSolution = (day: string) =>
  fs
    .readFileSync(`./src/adventOfCode/days/${day}/data/solution.txt`, 'utf8')
    .trim()

export const getProblem = (day: string) =>
  fs.readFileSync(`./src/adventOfCode/days/${day}/data/problem.txt`, 'utf8')

export const writeAnswerToFile = (day: string, answer: string) =>
  fs.writeFileSync(`./src/adventOfCode/days/${day}/index.ts`, answer)

export const readAnswerFromFile = (day: string) =>
  fs.readFileSync(`./src/adventOfCode/days/${day}/index.ts`, 'utf8')

type PromptVariables = {
  day: string
  problem: string
  solutionTemplate: string
  partDescription: string
  answer?: string
  solveOutput?: string
  stdOutUnder1000Chars?: boolean
}

export const templatePrompt = (promptTemplateFile, props: PromptVariables) => {
  const promptTemplate = fs.readFileSync(promptTemplateFile, 'utf8')
  return mustache.render(promptTemplate, props)
}

export const generatePrompt = (
  prompt: string,
  promptVariables: PromptVariables
) => {
  return templatePrompt(
    `./src/solver/prompts/${prompt}.mustache`,
    promptVariables
  )
}

const getLastNonWhitespacePart = (input: string): string => {
  const lines = input.split('\n').filter((line) => line.trim() !== '') // split into lines and remove empty lines
  const lastLine = lines[lines.length - 1] // get last non-empty line
  return lastLine.trim() // trim last line and return
}

// GPT often returns code inside a ```typescript code block
export const extractCodeBlocks = (
  input: string,
  language: string
): string[] => {
  // Regular expression explanation:
  // - ```{language}: matches the opening code block delimiter with the given language
  // - ([\s\S]*?): captures any character (including newlines) in a non-greedy fashion
  // - ```: matches the closing code block delimiter
  const codeBlockRegex = new RegExp(`\`\`\`${language}([\\s\\S]*?)\`\`\``, 'g')

  // Use matchAll() to find all matches and convert the iterator to an array
  const matches = Array.from(input.matchAll(codeBlockRegex))

  // Extract the content of each code block and return as an array
  return matches.map((match) => match[1].trim())
}

type CommandResult = {
  fullMessage: string
  stdout: string
  stderr: string
  success: boolean
  codeBlock?: string
}
const executeCommand = (command: string): CommandResult => {
  const result = shelljs.exec(command, { silent: true })
  return {
    success: result.code === 0,
    fullMessage: `stdout:\n${result.stdout} \n\n stderr:\n${result.stderr}`,
    stdout: result.stdout,
    stderr: result.stderr,
  }
}

type ChatCompletionMessage =
  | ChatCompletionResponseMessage
  | ChatCompletionRequestMessage

export const chatCompletions = async (
  options: Omit<CreateChatCompletionRequest, 'messages'>,
  prompts: ChatCompletionRequestMessage[]
) => {
  if (prompts.filter((p) => p.role !== 'system').length === 0) {
    return prompts
  }
  const promptsSoFar: ChatCompletionMessage[] = []
  while (true) {
    const nextPrompts = prompts.splice(0, prompts[0]?.role === 'system' ? 2 : 1)
    promptsSoFar.push(...nextPrompts)
    const completion = await retryCreateChatCompletion({
      ...options,
      messages: promptsSoFar,
    })
    const responseMessage = completion.data.choices[0].message
    promptsSoFar.push(responseMessage)
    if (prompts.length === 0) {
      return promptsSoFar
    }
  }
}

export const trySolutions = (day: string, answer: string): CommandResult => {
  const codeBlocks = extractCodeBlocks(answer, 'typescript')
  const possibleSolutions = [...codeBlocks, answer]
  for (const possibleSolution of possibleSolutions) {
    writeAnswerToFile(day, possibleSolution)
    logger.debug('formatting')
    const formatResponse = executeCommand(
      `deno fmt src/adventOfCode/days/${day}/index.ts`
    )

    if (formatResponse.success) {
      const formattedCode = readAnswerFromFile(day)
      logger.debug(
        `# Trying solution: \n\n \`\`\`typescript\n${formattedCode}\n\`\`\` \n`
      )
      let runResponse = executeCommand(
        `deno run --allow-read=src/adventOfCode/days/${day} src/adventOfCode/days/${day}/index.ts`
      )
      runResponse = { ...runResponse, codeBlock: possibleSolution }
      if (runResponse.success) {
        const solution = getLastNonWhitespacePart(runResponse.stdout.trim())
        logger.debug(
          `solution: ${solution}, actual solution: ${getSolution(day)}`
        )
        if (solution === getSolution(day)) {
          logger.debug(`Solved!`)
          return { ...runResponse, success: true }
        } else {
          return { ...runResponse, success: false }
        }
      } else {
        logger.debug('Run unsuccessful')
        logger.debug(runResponse.fullMessage)
        return { ...runResponse, success: false }
      }
    } else {
      logger.debug('Format unsuccessful')
      logger.debug(formatResponse.fullMessage)
      return { ...formatResponse, success: false }
    }
  }
  return {
    success: false,
    fullMessage: 'No solution found',
    stdout: 'No solution found',
    stderr: 'No solution found',
  }
}

export const limitString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str
  }
  const replacement = '\n...<removed>...\n'
  const halfLength = (maxLength - replacement.length) / 2
  const start = str.slice(0, Math.floor(halfLength))
  const end = str.slice(-Math.ceil(halfLength))

  return `${start}${replacement}${end}`
}
