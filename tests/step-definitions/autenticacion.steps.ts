// tests/step-definitions/autenticacion.steps.ts

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from './world'
import { Navigate, Fill, Click } from '../../src/screenplay/actions'
import { CurrentUrl, ErrorMessage } from '../../src/screenplay/questions'
import { LoginSelectors } from '../../src/screenplay/ui/Selectors'
import * as dotenv from 'dotenv'

dotenv.config()

Given('que el usuario está en la página de inicio de sesión',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Navigate.to(process.env.BASE_URL!)
    )
  }
)

When('el usuario ingresa el usuario {string} y contraseña {string}',
  async function(this: CustomWorld, usuario: string, contraseña: string) {
    await this.actor.attemptsTo(
      Fill.field(LoginSelectors.usernameField).with(usuario),
      Fill.field(LoginSelectors.passwordField).with(contraseña)
    )
  }
)

When('hace clic en el botón de iniciar sesión',
  async function(this: CustomWorld) {
    await this.actor.attemptsTo(
      Click.on(LoginSelectors.loginButton)
    )
  }
)

Then('debería ser redirigido a la página de productos',
  async function(this: CustomWorld) {
    const url = await this.actor.asks(CurrentUrl.value())
    expect(url).toContain('/inventory')
  }
)

Then('debería ver el mensaje de error {string}',
  async function(this: CustomWorld, mensajeEsperado: string) {
    const mensaje = await this.actor.asks(ErrorMessage.value())
    expect(mensaje).toContain(mensajeEsperado)
  }
)

Then('el resultado debería ser {string}',
  async function(this: CustomWorld, resultado: string) {
    const url = await this.actor.asks(CurrentUrl.value())

    if (resultado === 'redirigido a productos') {
      expect(url).toContain('/inventory')
    } else {
      const mensaje = await this.actor.asks(ErrorMessage.value())
      expect(mensaje).toContain(resultado)
    }
  }
)