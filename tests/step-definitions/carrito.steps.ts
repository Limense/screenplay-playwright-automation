// tests/step-definitions/carrito.steps.ts

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from './world'
import { Login, AddProductToCart } from '../../src/screenplay/tasks'
import { Click } from '../../src/screenplay/actions'
import { CartItemCount } from '../../src/screenplay/questions'
import { InventorySelectors, CartSelectors } from '../../src/screenplay/ui/Selectors'

Given('que el usuario ha iniciado sesión como usuario estándar',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Login.withStandardUser()
    )
  }
)

Given('está en la página de productos',
  async function(this: CustomWorld) {
    // El login ya redirige a /inventory automáticamente
    // Este step existe para que el Gherkin sea legible
    // No necesita hacer nada adicional
  }
)

When('el usuario agrega el producto {string} al carrito',
  async function(this: CustomWorld, producto: string) {
    await this.actor.attemptsTo(
      AddProductToCart.withName(producto)
    )
  }
)

When('el usuario navega al carrito',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(InventorySelectors.cartIcon)
    )
  }
)

Then('el carrito debería mostrar {int} producto',
  async function(this: CustomWorld, cantidadEsperada: number) {
    const cantidad = await this.actor.asks(CartItemCount.value())
    expect(cantidad).toBe(cantidadEsperada)
  }
)

Then('el carrito debería mostrar {int} productos',
  async function(this: CustomWorld, cantidadEsperada: number) {
    const cantidad = await this.actor.asks(CartItemCount.value())
    expect(cantidad).toBe(cantidadEsperada)
  }
)

Then('debería ver el producto {string} en el carrito',
  async function(this: CustomWorld, productoEsperado: string) {
    const page = (this.browseTheWeb as any).getPage()
    await page.waitForSelector(CartSelectors.itemName, { state: 'visible' })
    const nombreProducto = await page.locator(CartSelectors.itemName).innerText()
    expect(nombreProducto).toContain(productoEsperado)
  }
)