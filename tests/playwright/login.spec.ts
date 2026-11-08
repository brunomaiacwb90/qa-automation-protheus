
import { test, expect } from '@playwright/test';

/**
 * QA-001 - Login com credenciais válidas
 *
 * Módulo: Autenticação
 * Ferramenta: Playwright
 * Tipo: Teste funcional positivo
 *
 * Objetivo:
 * Validar que um usuário autorizado consegue
 * acessar o ambiente web do ERP.
 *
 * Pré-condições:
 * - Ambiente de homologação disponível
 * - Usuário ativo e autorizado
 * - Credenciais configuradas
 */

test('QA-001 - Login com credenciais válidas', async ({ page }) => {

  // 1. Obter os dados do ambiente de testes
  const url = process.env.PROTHEUS_URL;
  const usuario = process.env.PROTHEUS_USER;
  const senha = process.env.PROTHEUS_PASSWORD;

  if (!url || !usuario || !senha) {
    throw new Error('Configuração do ambiente incompleta');
  }

  // 2. Acessar a aplicação
  await page.goto(url);

  // 3. Preencher as credenciais
  // Seletores ilustrativos: adaptar à interface real
  await page.locator('[data-testid="usuario"]').fill(usuario);
  await page.locator('[data-testid="senha"]').fill(senha);

  // 4. Confirmar o login
  await page.locator('[data-testid="entrar"]').click();

  // 5. Validar o acesso ao sistema
  await expect(
    page.locator('[data-testid="menu-principal"]')
  ).toBeVisible();

});
