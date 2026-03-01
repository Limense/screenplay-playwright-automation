// src/screenplay/questions/ErrorMessage.ts
// Pregunta de negocio: retorna el mensaje de error visible en pantalla.

import { Actor } from '../core/Actor'
import { Question } from '../core/interfaces'
import { BrowseTheWeb } from '../abilities/BrowseTheWeb'
import { LoginSelectors } from '../ui/Selectors'

export class ErrorMessage implements Question<string> {

  private constructor() {}

  /**
   * Se lee como: actor.asks(ErrorMessage.value())
   */
  static value(): ErrorMessage {
    return new ErrorMessage()
  }

  async answeredBy(actor: Actor): Promise<string> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage()
    await page.waitForSelector(LoginSelectors.errorMessage, { state: 'visible' })
    return page.locator(LoginSelectors.errorMessage).innerText()
  }
}