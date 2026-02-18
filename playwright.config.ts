import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  // テストの配置ディレクトリを指定
  testDir: './tests',
  // テスト実行時に使用するウェブサーバーを指定
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
    // 本記事では動作確認のためトレースを常に有効化（'on'）
    // 実際の運用では'retain-on-failure'（失敗時のみ保存）や
    // CIでは'on-first-retry'（再実行時のみ保存）の利用を推奨
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