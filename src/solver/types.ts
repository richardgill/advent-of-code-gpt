export type SolveArgs = {
  day: string
  model: 'gpt-3.5-turbo' | 'gpt-4'
  preSolvePrompts: string[]
  solvePrompt: string
  solveFailedPrompt: string | undefined
  solveFailedAttempts: number
  systemPrompt: string | undefined
}
