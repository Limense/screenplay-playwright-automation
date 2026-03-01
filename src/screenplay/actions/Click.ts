// src/screenplay/actions/Click.ts
// Acción atómica: hacer clic en un elemento.

import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

export class Click implements Performable {
  private constructor(private readonly selector: string) {}

  /**
   * Se lee como: Click.on('#login-button')
   */
  static on(selector: string): Click {
    return new Click(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage();
    await page.waitForSelector(this.selector, { state: "visible" });
    await page.click(this.selector);
  }
}
