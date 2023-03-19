import dotenv from 'dotenv'
import _ from 'lodash'
import {
  Configuration,
  CreateChatCompletionRequest,
  CreateCompletionResponseUsage,
  OpenAIApi,
} from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type ChatCompletionResponse = Awaited<
  ReturnType<typeof openai.createChatCompletion>
>

let usage: CreateCompletionResponseUsage[] = []

export const resetUsage = () => {
  usage = []
}

export const getUsage = () => {
  return _.deepClone(usage)
}

const PRICING_PER_TOKEN_CENTS = {
  'gpt-3.5-turbo': {
    prompt: 0.2 / 1000,
    completion: 0.2 / 1000,
  },
  'gpt-4': {
    prompt: 3 / 1000,
    completion: 6 / 1000,
  },
}

export const summarizeUsage = (model: 'gpt-3.5-turbo' | 'gpt-4') => {
  const totalCompletionTokens = _.sumBy(
    usage,
    (u: CreateCompletionResponseUsage) => u.completion_tokens
  )
  const totalPromptTokens = _.sumBy(
    usage,
    (u: CreateCompletionResponseUsage) => u.prompt_tokens
  )
  const totalCompletionCost =
    totalCompletionTokens * PRICING_PER_TOKEN_CENTS[model].completion
  const totalPromptCost =
    totalPromptTokens * PRICING_PER_TOKEN_CENTS[model].prompt
  const totalTokens = totalCompletionTokens + totalPromptTokens
  const totalCost = totalCompletionCost + totalPromptCost
  return {
    requestCount: usage.length,
    totalCompletionTokens,
    totalPromptTokens,
    totalTokens,
    totalCompletionCost,
    totalPromptCost,
    totalCost,
  }
}

export const retryCreateChatCompletion = async (
  options: CreateChatCompletionRequest,
  maxRetries = 3
) => {
  let response: ChatCompletionResponse
  try {
    response = await openai.createChatCompletion(options)
  } catch (error) {
    console.log('actual error', error)
    if (maxRetries > 1) {
      return await retryCreateChatCompletion(options, maxRetries - 1)
    } else {
      return
    }
  }

  if (`${response.status}`.startsWith('5') && maxRetries > 1) {
    console.log('retrying create chat completion')
    return await retryCreateChatCompletion(options, maxRetries - 1)
  } else if (response.status === 429) {
    console.log('429')

    await delay(30000)
    console.log('retrying create chat completion')
    return await retryCreateChatCompletion(options, maxRetries - 1)
  }
  if (response.data.usage) {
    usage.push(response.data.usage)
  }
  return response
}
