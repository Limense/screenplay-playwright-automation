import { Ability, Performable, Question } from './interfaces'

export class Actor {

  private abilities: Map<Function, Ability> = new Map()

  private constructor(private readonly name: string) {}

  /**
   * Crea un Actor con nombre descriptivo.
   * Constructor privado fuerza el uso de este Factory Method.
   */
  static named(name: string): Actor {
    return new Actor(name)
  }

  /**
   * Asigna habilidades al Actor.
   * Retorna this para permitir encadenamiento fluido.
   */
  whoCan(...abilities: Ability[]): this {
    abilities.forEach(ability => {
      this.abilities.set(ability.constructor, ability)
    })
    return this
  }

  /**
   * Ejecuta tareas y acciones secuencialmente.
   * for...of garantiza que cada paso espera al anterior.
   */
  async attemptsTo(...performables: Performable[]): Promise<void> {
    for (const performable of performables) {
      await performable.performAs(this)
    }
  }

  /**
   * Responde una pregunta sobre el estado de la app.
   * T es inferido automáticamente según la Question recibida.
   */
  async asks<T>(question: Question<T>): Promise<T> {
    return question.answeredBy(this)
  }

  /**
   * Recupera una habilidad específica del Actor.
   * Lanza error descriptivo si la habilidad no fue asignada.
   */
  abilityTo<T extends Ability>(abilityClass: new (...args: any[]) => T): T {
    const ability = this.abilities.get(abilityClass)

    if (!ability) {
      throw new Error(
        `El actor "${this.name}" no tiene la habilidad "${abilityClass.name}". ` +
        `Asígnala con actor.whoCan(${abilityClass.name}.withPlaywright())`
      )
    }

    return ability as T
  }

  getName(): string {
    return this.name
  }
}