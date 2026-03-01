// src/screenplay/questions/CurrentUrl.ts
// Pregunta técnica: retorna la URL actual del navegador.

import { Actor } from '../core/Actor'
import { Question } from '../core/interfaces'
import { BrowseTheWeb } from '../abilities/BrowseTheWeb'

export class CurrentUrl implements Question<string> {

  private constructor() {}

  /**
   * Se lee como: actor.asks(CurrentUrl.value())
   */
  static value(): CurrentUrl {
    return new CurrentUrl()
  }

  async answeredBy(actor: Actor): Promise<string> {
    const page = (actor.abilityTo(BrowseTheWeb) as BrowseTheWeb).getPage()
    return page.url()
  }
}