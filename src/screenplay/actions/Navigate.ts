// src/screenplay/actions/Navigate.ts
// Acción atómica: navegar a una URL.

import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

export class Navigate implements Performable {
  private constructor(private readonly url: string) {}

  /**
   * Se lee como: Navigate.to('https://www.saucedemo.com')
   */
  static to(url: string): Navigate {
    return new Navigate(url);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage();
    await page.goto(this.url);
    await page.waitForLoadState("networkidle");
  }
}
