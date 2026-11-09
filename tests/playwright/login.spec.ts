
import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * QA-001 - Login com credenciais válidas
 * Sistema: ERP Simulado
 * Ferramenta: Playwright
 * Tipo: Teste funcional positivo
 *
 * Objetivo:
 * Validar o acesso com usuário e senha válidos.
 */

test('QA-001 - Login com credenciais válidas', async ({ page }) => {

  // 1. Abrir a página do ERP simulado
  const caminho = resolve('erp-simulado/login.html');
  await page.goto(pathToFileURL(caminho).href);

  // 2. Preencher usuário e senha fictícios
  await page.locator('[data-testid="usuario"]').fill('qa_teste');
  await page.locator('[data-testid="senha"]').fill('Teste@123');

  // 3. Clicar no botão Entrar
  await page.locator('[data-testid="entrar"]').click();

  // 4. Validar a mensagem de boas-vindas
  await expect(
    page.locator('[data-testid="menu-principal"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-testid="menu-principal"]')
  ).toContainText('Bem-vindo ao ERP Simulado!');

});
