// Contratos del Screenplay Pattern. Base de toda la arquitectura.

import type { Actor } from './Actor'


/**
 * Marca base para las habilidades que puede tener un Actor.
 * Las abilities concretas (por ejemplo, BrowseTheWeb) deben
 * implementar/extender esta interfaz.
 */
export interface Ability {}

/**
 * Cualquier cosa que un Actor pueda intentar hacer.
 * Tasks y Actions implementan esta interfaz.
 */
export interface Performable {
  performAs(actor: Actor): Promise<void>
}

/**
 * Verificación del estado de la app.
 * T define el tipo de respuesta: string, number, boolean.
 */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>
}