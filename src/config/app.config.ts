require('dotenv').config()

if (!process.env) {
  throw new Error('GOOGLE_API_KEY must be set.')
}

export const GOOGLE_API_KEY= process.env.API_KEY