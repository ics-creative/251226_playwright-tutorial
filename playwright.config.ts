import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  // テストの配置ディレクトリを指定
  testDir: './tests',
  // テスト実行時に使用するWebサーバー指定
  webServer: {
    command: 'npm run dev -- --port 5180',
    url: 'http://localhost:5180',
  },
  // HTMLのレポートを生成（テスト完了時に失敗があれば自動で開く）
  reporter: [['html', { open: 'on-failure' }]],
  use: {
    // テスト対象の基準URLを指定
    baseURL: 'http://localhost:5180/',
    // ブラウザをヘッドレスで起動するかどうか
    headless: true,
    // トレースを常に有効化（高負荷なので、普段の開発では'retain-on-failure'がおすすめ）
    trace: 'on',
  },
  // テスト実行環境のバリエーションを指定
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
});