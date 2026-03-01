// src/screenplay/questions/CartItemCount.ts
// Pregunta de negocio: retorna la cantidad de productos en el carrito.

import { Actor } from '../core/Actor'
import { Question } from '../core/interfaces'
import { BrowseTheWeb } from '../abilities/BrowseTheWeb'
import { InventorySelectors } from '../ui/Selectors'

export class CartItemCount implements Question<number> {

  private constructor() {}

  /**
   * Se lee como: actor.asks(CartItemCount.value())
   */
  static value(): CartItemCount {
    return new CartItemCount()
  }

  async answeredBy(actor: Actor): Promise<number> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage()
    const badge = page.locator(InventorySelectors.cartBadge)
    const isVisible = await badge.isVisible()

    if (!isVisible) return 0

    const text = await badge.innerText()
    return parseInt(text, 10)
  }
}