// src/screenplay/questions/OrderConfirmation.ts
// Pregunta de negocio: retorna el mensaje de confirmación de la orden.

import { Actor } from '../core/Actor'
import { Question } from '../core/interfaces'
import { BrowseTheWeb } from '../abilities/BrowseTheWeb'
import { CheckoutSelectors } from '../ui/Selectors'

export class OrderConfirmation implements Question<string> {

  private constructor() {}

  /**
   * Se lee como: actor.asks(OrderConfirmation.value())
   */
  static value(): OrderConfirmation {
    return new OrderConfirmation()
  }

  async answeredBy(actor: Actor): Promise<string> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage()
    await page.waitForSelector(
      CheckoutSelectors.confirmationMsg,
      { state: 'visible' }
    )
    return page.locator(CheckoutSelectors.confirmationMsg).innerText()
  }
}