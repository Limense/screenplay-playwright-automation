// tests/step-definitions/proceso-de-compra.steps.ts

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from './world'
import { Login, AddProductToCart, CompleteCheckout } from '../../src/screenplay/tasks'
import { Click, Fill } from '../../src/screenplay/actions'
import { OrderConfirmation } from '../../src/screenplay/questions'
import { CartSelectors, CheckoutSelectors, InventorySelectors } from '../../src/screenplay/ui/Selectors'

Given('ha agregado el producto {string} al carrito',
  async function(this: CustomWorld, producto: string) {
    await this.actor.attemptsTo(
      AddProductToCart.withName(producto)
    )
  }
)

Given('está en la página del carrito',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(InventorySelectors.cartIcon)
    )
  }
)

When('el usuario inicia el proceso de pago',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(CartSelectors.checkoutButton)
    )
  }
)

When('el usuario ingresa su nombre {string}',
  async function(this: CustomWorld, nombre: string) {
    await this.actor.attemptsTo(
      Fill.field(CheckoutSelectors.firstNameField).with(nombre)
    )
  }
)

When('el usuario ingresa su apellido {string}',
  async function(this: CustomWorld, apellido: string) {
    await this.actor.attemptsTo(
      Fill.field(CheckoutSelectors.lastNameField).with(apellido)
    )
  }
)

When('el usuario ingresa su código postal {string}',
  async function(this: CustomWorld, codigoPostal: string) {
    await this.actor.attemptsTo(
      Fill.field(CheckoutSelectors.postalCodeField).with(codigoPostal)
    )
  }
)

When('el usuario continúa con el pago',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(CheckoutSelectors.continueButton)
    )
  }
)

When('el usuario finaliza la compra',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(CheckoutSelectors.finishButton)
    )
  }
)

When('el usuario continúa con el pago sin ingresar datos',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(CheckoutSelectors.continueButton)
    )
  }
)

Then('debería ver el mensaje de confirmación {string}',
  async function(this: CustomWorld, mensajeEsperado: string) {
    const confirmacion = await this.actor.asks(OrderConfirmation.value())
    expect(confirmacion).toContain(mensajeEsperado)
  }
)

Then('debería ver un mensaje de error de validación',
  async function(this: CustomWorld) {
    const page = (this.browseTheWeb as any).getPage()
    await page.waitForSelector(CheckoutSelectors.errorMessage, { state: 'visible' })
    const error = await page.locator(CheckoutSelectors.errorMessage).innerText()
    expect(error).toContain('Error')
  }
)