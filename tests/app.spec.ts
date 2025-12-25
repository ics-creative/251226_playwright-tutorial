import {expect, test} from '@playwright/test';

test('トップページが表示される', async ({page}) => {
  await page.goto('/');
  // タイトルの評価
  await expect(page).toHaveTitle(/playwright-tutorial/);
});

test('カウンターボタンをクリックすると値が増える', async ({page}) => {
  await page.goto('/');
  // ボタンのLocatorを取得
  const counter = page.getByRole('button', {name: 'count is'});
  // Locatorのテキストを評価
  await expect(counter).toHaveText(/count is 0/);
  // Locatorの操作
  await counter.click();
  // Locatorのテキストを評価
  await expect(counter).toHaveText(/count is 1/);
});

test('Viteロゴ画像をクリックすると公式サイトに遷移する', async ({page, context}) => {
  await page.goto('/');
  // リンクのLocatorを取得
  const viteLink = page.getByRole('link', {name: 'Vite logo'});
  // 新しいページの待機
  const newPagePromise = context.waitForEvent('page');
  // Locatorの操作
  await viteLink.click();
  // 新しいページの取得とURLの評価
  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/https:\/\/vite\.dev/);
});
