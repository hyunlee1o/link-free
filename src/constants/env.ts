const JWT_EXPIRES_IN = 15000000 // minutes
const SESSION_EXPIRES_IN = 30 // days

const SESSION_EXPIRES_IN_S = SESSION_EXPIRES_IN * 24 * 60 * 60
const SESSION_EXPIRES_IN_MS = SESSION_EXPIRES_IN_S * 1000

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  JWT_EXPIRES_IN,
  SESSION_EXPIRES_IN_S,
  SESSION_EXPIRES_IN_MS,
  UPLOADCARE_PUBLIC_KEY: process.env.UPLOADCARE_PUBLIC_KEY || ''
}
