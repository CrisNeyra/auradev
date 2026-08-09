import { execSync } from 'node:child_process'

const ports = [4000, 5173, 5174]

function killPort(port) {
  try {
    if (process.platform === 'win32') {
      const out = execSync(`netstat -ano | findstr :${port}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      })
      const pids = new Set()
      for (const line of out.split('\n')) {
        const match = line.trim().match(/\s+(\d+)\s*$/)
        if (match && match[1] !== '0') pids.add(match[1])
      }
      for (const pid of pids) {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, {
        shell: true,
        stdio: 'ignore',
      })
    }
  } catch {
    // Puerto libre o sin permisos — ignorar
  }
}

for (const port of ports) {
  killPort(port)
}

console.log('[AuraDev] Puertos 4000/5173/5174 liberados (si estaban en uso).')
