// src/screenplay/actions/Fill.ts
// Acción atómica: escribir texto en un campo.

import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

export class Fill implements Performable {
  private value: string = "";

  private constructor(private readonly selector: string) {}

  /**
   * Se lee como: Fill.field('#user-name').with('standard_user')
   */
  static field(selector: string): Fill {
    return new Fill(selector);
  }

  with(value: string): this {
    this.value = value;
    return this;
  }

  async performAs(actor: Actor): Promise<void> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage();
    await page.fill(this.selector, this.value);
  }
}
