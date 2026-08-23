import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

describe('App', () => {
  it('renderiza el Home con la marca AuraDev', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getAllByAltText('AuraDev').length).toBeGreaterThan(0)
    const skip = screen.getByRole('link', { name: /saltar al contenido/i })
    expect(skip).toHaveAttribute('href', '#contenido')
    expect(document.getElementById('contenido')).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        name: /proyectos que hemos construido/i,
      }),
    ).toBeInTheDocument()
  })
})
