// Puente entre el screenplay pattern y Playwright. Permite a los Actores interactuar con la web.

import { Browser, BrowserContext, Page, chromium, firefox } from "playwright";
import { Ability } from "../core/interfaces";
import * as dotenv from "dotenv";

dotenv.config();

export class BrowseTheWeb implements Ability {
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;

  private constructor() {}

  // Factory Method. Se lee como: BrowseTheWeb.withPlaywright() para crear una instancia de esta habilidad.
  static withPlaywright(): BrowseTheWeb {
    return new BrowseTheWeb();
  }

  /**
   * Incializa navegador, contexto y página.
   * Llamado desde hooks.ts antes de cada escenario.
   * Async por eso no va ene el constructor.
   */
  async initialize(): Promise<void> {
    const browserName = process.env.BROWSER || "chromium";
    const headless = process.env.HEADLESS !== "false";
    const browserType = browserName === "firefox" ? firefox : chromium;

    this.browser = await browserType.launch({ headless });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo:
        process.env.RECORD_VIDEO === "true"
          ? { dir: "reports/videos" }
          : undefined,
    });

    this.page = await this.context.newPage();
  }

  /**
   * Retorna la página activa.
   * Lanzza error descriptivo si initialize() no fue llamado.
   */

  getPage(): Page {
    if (!this.page) {
      throw new Error(
        "BrowserTheWeb no inicializado. " +
          "Asegúrate de llamar initialize() en el Before hook.",
      )
    }
    return this.page
  }

  /**
   * Cierre contexto primero para gurar video si aplica,
   * luego cierra el navegador.
   */
  async close(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}
