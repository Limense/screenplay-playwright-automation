// src/screenplay/tasks/AddProductToCart.ts
// Tarea de negocio: agregar un producto al carrito.

import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { Click } from "../actions";
import { InventorySelectors } from "../ui/Selectors";

export class AddProductToCart implements Performable {
  private constructor(private readonly productName: string) {}

  /**
   * Se lee como: AddProductToCart.withName('Sauce Labs Backpack')
   */
  static withName(productName: string): AddProductToCart {
    return new AddProductToCart(productName);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(InventorySelectors.addToCartBtn(this.productName)),
    );
  }
}
