// tests/step-definitions/world.ts
// Contexto compartido entre todos los steps de un escenario.
// Cada escenario tiene su propia instancia del World.

import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { Actor } from '../../src/screenplay/core/Actor'
import { BrowseTheWeb } from '../../src/screenplay/abilities/BrowseTheWeb'

export class CustomWorld extends World {

  actor!: Actor
  browseTheWeb!: BrowseTheWeb

  constructor(options: IWorldOptions) {
    super(options)
  }

  /**
   * Crea el Actor con su habilidad de navegación.
   * Llamado desde hooks.ts en el Before hook.
   */
  initializeActor(): void {
    this.browseTheWeb = BrowseTheWeb.withPlaywright()
    this.actor = Actor.named('Usuario de Prueba')
      .whoCan(this.browseTheWeb)
  }
}

// Le dice a Cucumber que use CustomWorld como contexto
// de cada escenario en lugar del World por defecto
setWorldConstructor(CustomWorld)