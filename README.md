# Screenplay Playwright Automation

Suite de pruebas automatizadas para [Sauce Demo](https://www.saucedemo.com/) construida con **Playwright**, **Cucumber** y el patrón de diseño **Screenplay**.

---

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución de Tests](#ejecución-de-tests)
- [Generación de Reportes](#generación-de-reportes)
- [Estrategia de Automatización](#estrategia-de-automatización)
- [Criterios de Aceptación Cubiertos](#criterios-de-aceptación-cubiertos)

---

## Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| **Node.js** | ≥ 18 | Runtime |
| **TypeScript** | ^5.9 | Lenguaje tipado |
| **Playwright** | ^1.58 | Automatización de navegador |
| **Cucumber.js** | ^12.7 | Framework BDD |
| **Allure** | ^3.5 | Reportes visuales |

---

## Estructura del Proyecto

```
screenplay-playwright-automation/
├── features/                          # Feature files en Gherkin
│   ├── autenticacion.feature          # CA1, CA2: Login válido e inválido
│   ├── carrito.feature                # CA3, CA4: Agregar y ver productos
│   └── proceso-de-compra.feature      # CA5: Completar compra
│
├── src/screenplay/                    # Implementación del Screenplay Pattern
│   ├── abilities/
│   │   └── BrowseTheWeb.ts            # Habilidad: interactuar con el navegador
│   ├── actions/                       # Acciones atómicas de bajo nivel
│   │   ├── Navigate.ts                # Navegar a una URL
│   │   ├── Fill.ts                    # Escribir en un campo
│   │   └── Click.ts                   # Hacer clic en un elemento
│   ├── tasks/                         # Tareas de negocio de alto nivel
│   │   ├── Login.ts                   # Iniciar sesión
│   │   ├── AddProductToCart.ts        # Agregar producto al carrito
│   │   └── CompleteCheckout.ts        # Completar el proceso de pago
│   ├── questions/                     # Preguntas sobre el estado de la app
│   │   ├── CurrentUrl.ts              # URL actual del navegador
│   │   ├── ErrorMessage.ts            # Mensaje de error visible
│   │   ├── CartItemCount.ts           # Cantidad de items en el carrito
│   │   └── OrderConfirmation.ts       # Mensaje de confirmación de orden
│   ├── ui/
│   │   └── Selectors.ts               # Selectores CSS/atributos centralizados
│   └── core/
│       ├── Actor.ts                   # Clase Actor (núcleo del patrón)
│       └── interfaces.ts              # Contratos: Ability, Performable, Question
│
├── tests/step-definitions/            # Implementación de los steps de Cucumber
│   ├── autenticacion.steps.ts
│   ├── carrito.steps.ts
│   ├── proceso-de-compra.steps.ts
│   └── world.ts                       # Contexto compartido entre steps
│
├── support/
│   └── hooks.ts                       # Hooks Before/After de Cucumber
│
├── reports/                           # Salida de reportes (generado)
│   ├── allure-results/
│   ├── screenshots/
│   └── videos/
│
├── .env                               # Variables de entorno (no versionar)
├── .env.example                       # Plantilla de variables de entorno
├── cucumber.json                      # Configuración de Cucumber
└── tsconfig.json                      # Configuración de TypeScript
```

---

## Requisitos Previos

- **Node.js** v18 o superior → [descargar](https://nodejs.org/)
- **Git** → [descargar](https://git-scm.com/)
- Acceso a internet (los tests apuntan a `https://www.saucedemo.com`)

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Limense/screenplay-playwright-automation.git
cd screenplay-playwright-automation
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar los navegadores de Playwright

```bash
npx playwright install chromium
```

### 4. Configurar las variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env
```

Edita `.env` con los siguientes valores:

```dotenv
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user
PASSWORD=secret_sauce
BROWSER=chromium        # opciones: chromium, firefox
HEADLESS=true           # true = sin ventana (CI), false = con ventana (debug)
RECORD_VIDEO=false      # true = graba video de cada escenario
```

---

## Ejecución de Tests

### Todos los tests

```bash
npm test
```

### Por etiqueta (tag)

```bash
# Solo tests de humo (rápidos, críticos)
npm run test:smoke

# Tests de regresión completa
npm run test:regression

# Solo tests de login
npm run test:login

# Solo tests del carrito
npm run test:cart
```

### Referencia de tags disponibles

| Tag | Escenarios cubiertos |
|---|---|
| `@smoke` | Login exitoso, agregar producto, ver carrito, completar compra |
| `@regression` | Escenario outline de login, múltiples productos, checkout con error |
| `@login` | Todos los escenarios de autenticación |
| `@cart` | Todos los escenarios del carrito |
| `@checkout` | Todos los escenarios del proceso de compra |

---

## Generación de Reportes

Los resultados de Allure se generan automáticamente en `reports/allure-results/` al ejecutar cualquier test.

Para generar y abrir el reporte visual:

```bash
# Generar + abrir en el navegador en un solo comando
npm run report

# O por separado:
npm run report:generate
npm run report:open
```

> **Requisito:** tener `allure-commandline` instalado globalmente o usar el incluido en devDependencies.  
> Si el comando `allure` no se encuentra, instálalo con: `npm install -g allure-commandline`

---

## Estrategia de Automatización

### Patrón: Screenplay Pattern

Se implementó el **Screenplay Pattern** en lugar del tradicional Page Object Model (POM), siguiendo los principios SOLID y promoviendo mayor reusabilidad y legibilidad.

#### Comparación con POM

| Aspecto | Page Object Model | Screenplay Pattern |
|---|---|---|
| Abstracción | Páginas | Actores y sus habilidades |
| Granularidad | Métodos por página | Acciones atómicas reutilizables |
| Legibilidad | Media | Alta (lenguaje natural) |
| Escalabilidad | Limitada | Alta |

#### Componentes del Screenplay Pattern

```
Actor
  → tiene Abilities (BrowseTheWeb)
  → intenta Performables:
      → Tasks (alto nivel):  Login, AddProductToCart, CompleteCheckout
          → Actions (bajo nivel): Navigate, Fill, Click
  → pregunta Questions: CurrentUrl, ErrorMessage, CartItemCount, OrderConfirmation
```

**Ejemplo de lectura natural del código:**

```typescript
await actor.attemptsTo(
  Login.withCredentials('standard_user', 'secret_sauce'),
  AddProductToCart.withName('Sauce Labs Backpack')
)
const count = await actor.asks(CartItemCount.value())
```

### Decisiones de Diseño

- **Factory Methods** en cada clase (`Login.withCredentials()`, `Navigate.to()`) para crear una API fluida y expresiva.
- **Selectores centralizados** en `Selectors.ts` — si un selector cambia en la app, se actualiza en un solo lugar.
- **Variables de entorno** para credenciales y configuración, sin hardcodear datos sensibles.
- **setDefaultTimeout(30000)** para tolerar variaciones de red sin hacer los tests lentos de forma innecesaria.
- **Screenshots automáticos en fallos** embebidos directamente en el reporte de Allure.

---

## Criterios de Aceptación Cubiertos

| # | Criterio | Feature | Tags |
|---|---|---|---|
| CA1 | El usuario puede iniciar sesión con credenciales válidas | `autenticacion.feature` | `@smoke @login` |
| CA2 | El usuario no puede iniciar sesión con credenciales inválidas | `autenticacion.feature` | `@smoke @regression @login` |
| CA3 | El usuario puede agregar un producto al carrito | `carrito.feature` | `@smoke @cart` |
| CA4 | El usuario puede ver los productos agregados en el carrito | `carrito.feature` | `@smoke @cart` |
| CA5 | El usuario puede completar el proceso de compra hasta la confirmación | `proceso-de-compra.feature` | `@smoke @checkout` |

### Usuarios cubiertos

| Usuario | Contraseña | Escenarios |
|---|---|---|
| `standard_user` | `secret_sauce` | Login exitoso, carrito completo, proceso de compra |
| `locked_out_user` | `secret_sauce` | Intento de login con usuario bloqueado |
