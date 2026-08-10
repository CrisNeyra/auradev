import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  console.warn(
    '[AuraDev] DATABASE_URL no definida: drizzle-kit necesita la connection string.'
  )
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
  strict: true,
  verbose: true,
})
