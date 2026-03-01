// support/hooks.ts
// Ciclo de vida de cada escenario.
// Abre el navegador antes y lo cierra después.
// Toma screenshots automáticos en todos los escenarios (passed y failed).

import {
  Before,
  After,
  BeforeAll,
  ITestCaseHookParameter,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { CustomWorld } from '../tests/step-definitions/world'
import * as fs from 'fs'

// Aumenta el timeout global de pasos a 30s para aguantar cargas de red lentas
setDefaultTimeout(30000)

BeforeAll(async function() {
  // Garantiza que las carpetas de reportes existen antes de correr
  const dirs = [
    'reports/screenshots',
    'reports/allure-results',
    'reports/videos'
  ]
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
})

Before(async function(this: CustomWorld) {
  // Crea el Actor y abre el navegador para este escenario
  this.initializeActor()
  await this.browseTheWeb.initialize()
})

After(async function(this: CustomWorld, scenario: ITestCaseHookParameter) {
  const status = scenario.result?.status ?? 'UNKNOWN'
  const scenarioName = scenario.pickle.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 60)

  // Screenshot en todos los escenarios: passed y failed
  try {
    const page = this.browseTheWeb.getPage()
    const screenshot = await page.screenshot({
      path: `reports/screenshots/${status.toLowerCase()}-${scenarioName}-${Date.now()}.png`,
      fullPage: true
    })
    // Embebe el screenshot en el reporte de Allure con etiqueta de estado
    await this.attach(screenshot, 'image/png')
  } catch (error) {
    console.error('No se pudo tomar el screenshot:', error)
  }

  // Siempre cierra el navegador, en éxito y en fallo
  await this.browseTheWeb.close()
})