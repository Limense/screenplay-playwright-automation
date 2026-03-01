# features/proceso-de-compra.feature
# Cubre el criterio de aceptación 5 del reto:
# El usuario puede completar el proceso de compra hasta la confirmación

Feature: Proceso de compra
  Como cliente de Sauce Demo
  Quiero poder completar el proceso de compra
  Para adquirir los productos que necesito

  Background:
    Given que el usuario ha iniciado sesión como usuario estándar
    And ha agregado el producto "Sauce Labs Backpack" al carrito
    And está en la página del carrito

  @smoke @checkout
  Scenario: Completar el proceso de compra exitosamente
    When el usuario inicia el proceso de pago
    And el usuario ingresa su nombre "John"
    And el usuario ingresa su apellido "Doe"
    And el usuario ingresa su código postal "12345"
    And el usuario continúa con el pago
    And el usuario finaliza la compra
    Then debería ver el mensaje de confirmación "Thank you for your order!"

  @regression @checkout
  Scenario: Intentar continuar sin ingresar datos de envío
    When el usuario inicia el proceso de pago
    And el usuario continúa con el pago sin ingresar datos
    Then debería ver un mensaje de error de validación