import { test, expect } from '@playwright/test'

test.describe('AuraDev smoke E2E', () => {
  test('home carga marca y portafolio', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByAltText('AuraDev').first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /proyectos que hemos construido/i })
    ).toBeVisible()
  })

  test('servicios: teclado abre modal y Escape cierra', async ({ page }) => {
    await page.goto('/#servicios')
    const card = page.locator('.servicio-oferta__card-inner').first()
    await card.focus()
    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  })

  test('contacto: validación form vacío', async ({ page }) => {
    await page.goto('/#contacto')
    await page.getByRole('button', { name: /enviar mensaje/i }).click()
    await expect(page.getByText(/ingresá tu nombre/i)).toBeVisible()
  })

  test('modal servicios usable en viewport móvil ~375', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/#servicios')
    await page.locator('.servicio-oferta__card-inner').first().click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.modal-media')).toBeVisible()
    await expect(dialog.locator('.modal-body')).toBeVisible()
  })
})
