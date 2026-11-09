
import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * QA-002 - Login com credenciais inválidas
 * Sistema: ERP Simulado
 * Tipo: Teste funcional negativo
 *
 * Objetivo:
 * Verificar se o sistema rejeita usuário e senha inválidos.
 */

test('QA-002 - Login com credenciais inválidas', async ({ page }) => {
  // 1. Abrir o ERP Simulado
  const caminho = resolve('erp-simulado/login.html');
  await page.goto(pathToFileURL(caminho).href);

  // 2. Informar credenciais inválidas
  await page.getByPlaceholder('Usuário').fill('usuario_invalido');
  await page.getByPlaceholder('Senha').fill('senha_errada');

  // 3. Clicar em Entrar
  await page.locator('[data-testid="entrar"]').click();

  // 4. Verificar a mensagem de erro
  await expect(page.locator('#mensagem'))
    .toHaveText('Usuário ou senha inválidos');

  // 5. Confirmar que o acesso não foi permitido
  await expect(
    page.locator('[data-testid="menu-principal"]')
  ).toBeHidden();
});
