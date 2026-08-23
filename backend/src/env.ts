import { z } from 'zod'

const PLACEHOLDER = /^(pending|change_me|todo)$/i
const FAKE_SECRET =
  /tu_token|tu_phone|tu_template|tu_webhook|tu_usuario_smtp|tu_password_smtp|xxxx xxxx/i

function isPlaceholder(val: string): boolean {
  const v = val.trim()
  return PLACEHOLDER.test(v) || FAKE_SECRET.test(v)
}

function emptyToUndef(value: unknown): unknown {
  if (value === undefined || value === null) return undefined
  const s = String(value).trim()
  return s === '' ? undefined : s
}

const optionalStr = z.preprocess(emptyToUndef, z.string().min(1).optional())

function rejectPlaceholder(
  val: string | undefined,
  ctx: z.RefinementCtx,
  path: string
) {
  if (!val) return
  if (isPlaceholder(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${path} parece un placeholder; reemplazalo o dejalo vacío`,
      path: [path],
    })
  }
}

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    PORT: z.preprocess(emptyToUndef, z.coerce.number().int().positive().optional()),
    LOG_LEVEL: z.preprocess(
      emptyToUndef,
      z.enum(['silent', 'error', 'warn', 'info', 'debug', 'trace']).optional()
    ),
    DATABASE_URL: optionalStr,
    CORS_ORIGIN: optionalStr,
    SMTP_HOST: optionalStr,
    SMTP_PORT: z.preprocess(emptyToUndef, z.coerce.number().int().optional()),
    SMTP_SECURE: optionalStr,
    SMTP_USER: optionalStr,
    SMTP_PASS: optionalStr,
    MAIL_FROM: optionalStr,
    MAIL_TO: optionalStr,
    ENABLE_AUTO_REPLY: optionalStr,
    WEBHOOK_URL: optionalStr,
    UPSTASH_REDIS_REST_URL: optionalStr,
    UPSTASH_REDIS_REST_TOKEN: optionalStr,
    WHATSAPP_TOKEN: optionalStr,
    WHATSAPP_PHONE_NUMBER_ID: optionalStr,
    WHATSAPP_TO: optionalStr,
    WHATSAPP_TEMPLATE_NAME: optionalStr,
    WHATSAPP_TEMPLATE_LANG: optionalStr,
    TELEGRAM_BOT_TOKEN: optionalStr,
    TELEGRAM_CHAT_ID: optionalStr,
    TELEGRAM_API_KEY: optionalStr,
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const check = (key: keyof typeof data) =>
      rejectPlaceholder(data[key] as string | undefined, ctx, String(key))

    check('DATABASE_URL')
    check('SMTP_HOST')
    check('SMTP_USER')
    check('SMTP_PASS')
    check('WEBHOOK_URL')
    check('UPSTASH_REDIS_REST_URL')
    check('UPSTASH_REDIS_REST_TOKEN')
    check('WHATSAPP_TOKEN')
    check('WHATSAPP_PHONE_NUMBER_ID')
    check('WHATSAPP_TEMPLATE_NAME')
    check('TELEGRAM_BOT_TOKEN')
    check('TELEGRAM_CHAT_ID')
    check('TELEGRAM_API_KEY')

    if (data.DATABASE_URL && !/^postgres(ql)?:\/\//i.test(data.DATABASE_URL)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'DATABASE_URL debe ser una URL postgres',
        path: ['DATABASE_URL'],
      })
    }

    if (data.WEBHOOK_URL && !/^https?:\/\//i.test(data.WEBHOOK_URL)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'WEBHOOK_URL debe ser http(s)',
        path: ['WEBHOOK_URL'],
      })
    }

    if (data.UPSTASH_REDIS_REST_URL && !/^https:\/\//i.test(data.UPSTASH_REDIS_REST_URL)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'UPSTASH_REDIS_REST_URL debe ser https',
        path: ['UPSTASH_REDIS_REST_URL'],
      })
    }

    const upstashUrl = Boolean(data.UPSTASH_REDIS_REST_URL)
    const upstashToken = Boolean(data.UPSTASH_REDIS_REST_TOKEN)
    if (upstashUrl !== upstashToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Upstash requiere URL y TOKEN juntos',
        path: ['UPSTASH_REDIS_REST_URL'],
      })
    }

    const waToken = Boolean(data.WHATSAPP_TOKEN)
    const waPhone = Boolean(data.WHATSAPP_PHONE_NUMBER_ID)
    if (waToken !== waPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'WhatsApp requiere TOKEN y PHONE_NUMBER_ID juntos',
        path: ['WHATSAPP_TOKEN'],
      })
    }

    const tgToken = Boolean(data.TELEGRAM_BOT_TOKEN)
    const tgChat = Boolean(data.TELEGRAM_CHAT_ID)
    if (tgToken !== tgChat) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Telegram Bot API requiere TOKEN y CHAT_ID juntos',
        path: ['TELEGRAM_BOT_TOKEN'],
      })
    }

    if (data.SMTP_HOST && (!data.SMTP_USER || !data.SMTP_PASS)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'SMTP_HOST requiere SMTP_USER y SMTP_PASS',
        path: ['SMTP_HOST'],
      })
    }
  })

export type AppEnv = z.infer<typeof envSchema>

/**
 * Valida process.env (forma y pares). No exige DATABASE_URL.
 * @throws Error si la config es inválida
 */
export function parseEnv(raw: NodeJS.ProcessEnv): AppEnv {
  const result = envSchema.safeParse(raw)
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `${i.path.join('.') || 'env'}: ${i.message}`)
      .join('; ')
    throw new Error(`Config de entorno inválida: ${details}`)
  }
  return result.data
}

let cached: AppEnv | undefined

export function loadEnv(): AppEnv {
  if (!cached) cached = parseEnv(process.env)
  return cached
}

/** Solo tests. */
export function resetEnvCache() {
  cached = undefined
}
