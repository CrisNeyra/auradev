import fs from 'fs';
import path from 'path';

const LOGS_DIR = path.join(process.cwd(), 'logs');
const BACKUP_FILE = path.join(LOGS_DIR, 'backup_contactos.log');

export function logContactoBackup(datos: { nombre: string; email: string; mensaje: string }) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] BACKUP_CONTACTO:
Nombre: ${datos.nombre}
Email: ${datos.email}
Mensaje: ${datos.mensaje}
--------------------------------------------------\n`;

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
    fs.appendFileSync(BACKUP_FILE, entry, 'utf8');
    console.log(`[AuraDev] Mensaje de ${datos.email} respaldado localmente en logs.`);
  } catch (err) {
    console.error('[AuraDev] Error crítico: No se pudo escribir el backup en disco:', err);
    // Como último recurso, imprimir en consola para no perder el dato
    console.error('[AuraDev] DATOS PERDIDOS:', JSON.stringify(datos));
  }
}

export function logError(context: string, error: any) {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ERROR [${context}]: ${error?.message || error}\n`;
  
  try {
    fs.appendFileSync(path.join(LOGS_DIR, 'error.log'), message, 'utf8');
  } catch (err) {
    console.error('[AuraDev] Error al escribir log de error:', err);
  }
}
