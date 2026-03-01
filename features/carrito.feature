# features/carrito.feature
# Cubre los criterios de aceptación 3 y 4 del reto:
# El usuario puede agregar un producto al carrito
# El usuario puede ver los productos agregados en el carrito

Feature: Gestión del carrito de compras
  Como cliente de Sauce Demo
  Quiero poder agregar productos a mi carrito
  Para poder comprarlos después

  Background:
    Given que el usuario ha iniciado sesión como usuario estándar
    And está en la página de productos

  @smoke @cart
  Scenario: Agregar un producto al carrito
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Then el carrito debería mostrar 1 producto

  @regression @cart
  Scenario: Agregar múltiples productos al carrito
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    And el usuario agrega el producto "Sauce Labs Bike Light" al carrito
    Then el carrito debería mostrar 2 productos

  @smoke @cart
  Scenario: Ver los productos agregados en el carrito
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    And el usuario navega al carrito
    Then debería ver el producto "Sauce Labs Backpack" en el carrito