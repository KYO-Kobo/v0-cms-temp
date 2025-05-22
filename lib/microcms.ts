import { createClient } from "microcms-js-sdk"

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required")
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required")
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

export const getContents = async (endpoint: string, queries?: any) => {
  try {
    const data = await client.get({
      endpoint,
      queries,
    })
    return data
  } catch (error) {
    console.error(`Error fetching contents from endpoint "${endpoint}":`, error)
    throw error
  }
}

export const getContent = async (endpoint: string, contentId: string, queries?: any) => {
  try {
    const data = await client.get({
      endpoint,
      contentId,
      queries,
    })
    return data
  } catch (error) {
    console.error(`Error fetching content "${contentId}" from endpoint "${endpoint}":`, error)
    throw error
  }
}
