import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contacto from './Contacto'

vi.mock('./Reveal.jsx', () => ({
  default: ({
    children,
    as: Comp = 'div',
    ...props
  }: {
    children?: React.ReactNode
    as?: 'div' | 'form'
    delay?: number
    onSubmit?: (e: React.FormEvent) => void
    className?: string
    noValidate?: boolean
  }) => {
    const { delay: _delay, onSubmit, ...rest } = props
    if (Comp === 'form') {
      return (
        <form onSubmit={onSubmit} {...rest}>
          {children}
        </form>
      )
    }
    return <div {...rest}>{children}</div>
  },
}))

describe('Contacto form', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra error si el form está vacío', async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))
    expect(
      await screen.findAllByText(/ingresá tu nombre/i)
    ).not.toHaveLength(0)
  })

  it('rechaza email inválido', async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/^nombre$/i), {
      target: { value: 'Cristian' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'no-es-email' },
    })
    fireEvent.change(screen.getByLabelText(/^mensaje$/i), {
      target: { value: 'Mensaje suficientemente largo' },
    })
    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(await screen.findAllByText(/email válido/i)).not.toHaveLength(0)
  })

  it('incluye campo honeypot oculto', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    )
    const honey = document.getElementById('website')
    expect(honey).toBeTruthy()
    expect(honey?.closest('[aria-hidden="true"]')).toBeTruthy()
  })
})
