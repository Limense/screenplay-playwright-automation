// src/screenplay/tasks/CompleteCheckout.ts
// Tarea de negocio: completar el proceso de compra.

import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { Fill, Click } from "../actions";
import { CartSelectors, CheckoutSelectors } from "../ui/Selectors";

export class CompleteCheckout implements Performable {
  private constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly postalCode: string,
  ) {}

  /**
   * Se lee como: CompleteCheckout.withInformation('John', 'Doe', '12345')
   */
  static withInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): CompleteCheckout {
    return new CompleteCheckout(firstName, lastName, postalCode);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(CartSelectors.checkoutButton),
      Fill.field(CheckoutSelectors.firstNameField).with(this.firstName),
      Fill.field(CheckoutSelectors.lastNameField).with(this.lastName),
      Fill.field(CheckoutSelectors.postalCodeField).with(this.postalCode),
      Click.on(CheckoutSelectors.continueButton),
      Click.on(CheckoutSelectors.finishButton),
    );
  }
}
