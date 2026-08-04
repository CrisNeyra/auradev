import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const mensajes = pgTable('mensajes', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mensaje: text('mensaje').notNull(),
  creado_en: timestamp('creado_en', { withTimezone: true }).defaultNow().notNull(),
});
