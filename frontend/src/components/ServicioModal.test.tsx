import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ServicioModal from './ServicioModal'

const servicio = {
  titulo: 'Software a Medida',
  resumen: 'Resumen de prueba del servicio.',
  imagen: '/test.jpg',
  opciones: [
    { texto: 'Opción A', detalle: 'Detalle A' },
    { texto: 'Opción B', detalle: 'Detalle B' },
  ],
}

describe('ServicioModal', () => {
  it('cierra con Escape', () => {
    const onClose = vi.fn()
    render(
      <ServicioModal servicio={servicio} isOpen onClose={onClose} />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('expone título accesible', () => {
    render(
      <ServicioModal
        servicio={servicio}
        isOpen
        onClose={() => {}}
      />
    )
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-labelledby',
      'modal-servicio-titulo'
    )
    expect(document.getElementById('modal-servicio-titulo')).toHaveTextContent(
      /software a medida/i
    )
  })
})
