import { test, expect } from '@playwright/test';

test('Pesquisar por algo no YouTube', async ({ page }) => {
  // Passo 1: Acessar o YouTube
  await page.goto('https://www.youtube.com');

  // Passo 2: Localizar o campo de pesquisa e digitar "Playwright"
  await page.fill('input#search', 'Playwright');
  
  // Passo 3: Pressionar Enter para pesquisar
  await page.press('input#search', 'Enter');
  
  // Passo 4: Esperar pela presença de vídeos nos resultados
  // Aqui vamos esperar que pelo menos um vídeo de resultados seja carregado
  await page.waitForSelector('ytd-video-renderer', { timeout: 1200000 });

  // Passo 5: Verificar se a URL contém o parâmetro de pesquisa
  // Isso valida se a URL tem o parâmetro correto de pesquisa
  expect(page.url()).toContain('search_query=Playwright');
  
  // Passo 6: Verificar se a página contém pelo menos um vídeo
  const videos = await page.locator('ytd-video-renderer');
  expect(await videos.count()).toBeGreaterThan(0);
});
