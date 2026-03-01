// src/screenplay/tasks/Login.ts
// Tarea de negocio: iniciar sesión en la aplicación.

import * as dotenv from "dotenv";
import { Actor } from "../core/Actor";
import { Performable } from "../core/interfaces";
import { Navigate, Fill, Click } from "../actions";
import { LoginSelectors } from "../ui/Selectors";

dotenv.config();

export class Login implements Performable {
  private constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}

  /**
   * Login con credenciales específicas.
   * Se usa en Scenario Outline con diferentes usuarios.
   */
  static withCredentials(username: string, password: string): Login {
    return new Login(username, password);
  }

  /**
   * Login con el usuario estándar del .env.
   * Se usa en la mayoría de escenarios como precondición.
   */
  static withStandardUser(): Login {
    return new Login(process.env.STANDARD_USER!, process.env.PASSWORD!);
  }

  /**
   * Login con el usuario bloqueado del .env.
   * Se usa para verificar el comportamiento con usuario bloqueado.
   */
  static withLockedUser(): Login {
    return new Login(process.env.LOCKED_OUT_USER!, process.env.PASSWORD!);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Navigate.to(process.env.BASE_URL!),
      Fill.field(LoginSelectors.usernameField).with(this.username),
      Fill.field(LoginSelectors.passwordField).with(this.password),
      Click.on(LoginSelectors.loginButton),
    );
  }
}
