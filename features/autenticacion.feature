# features/autenticacion.feature
# Cubre los criterios de aceptación 1 y 2 del reto:
# El usuario puede iniciar sesión con credenciales válidas
# El usuario no puede iniciar sesión con credenciales inválidas

Feature: Autenticación de usuarios
  Como cliente de Sauce Demo
  Quiero poder iniciar sesión con mis credenciales
  Para acceder a la tienda y realizar compras

  Background:
    Given que el usuario está en la página de inicio de sesión

  @smoke @login
  Scenario: Inicio de sesión exitoso con usuario estándar
    When el usuario ingresa el usuario "standard_user" y contraseña "secret_sauce"
    And hace clic en el botón de iniciar sesión
    Then debería ser redirigido a la página de productos

  @smoke @login
  Scenario: Inicio de sesión fallido con usuario bloqueado
    When el usuario ingresa el usuario "locked_out_user" y contraseña "secret_sauce"
    And hace clic en el botón de iniciar sesión
    Then debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out"

  @regression @login
  Scenario Outline: Inicio de sesión con diferentes credenciales
    When el usuario ingresa el usuario "<usuario>" y contraseña "<contraseña>"
    And hace clic en el botón de iniciar sesión
    Then el resultado debería ser "<resultado>"

    Examples:
      | usuario          | contraseña   | resultado                                                                   |
      | standard_user    | secret_sauce | redirigido a productos                                                      |
      | locked_out_user  | secret_sauce | Epic sadface: Sorry, this user has been locked out                          |
      | standard_user    | wrong_pass   | Epic sadface: Username and password do not match any user in this service   |