// index.js (修正版)

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// セキュリティとパース
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの提供
const publicPath = path.join(__dirname, 'public'); // または '../public' → 構造に合わせる
app.use(express.static(publicPath));




// その他のルートは index.html にフォールバック（SPA風）
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// ポート設定
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// シグナルハンドリング
process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  process.exit(0);
});   

// 個別のページルート
app.get('/test-proxy', (req, res) => {
  res.sendFile(path.join(publicPath, 'test-proxy.html'));
});




