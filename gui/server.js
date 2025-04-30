const Bacstack = require('bacstack');
const express = require('express');
const path = require('path'); // HTMLファイルを提供するために追加

// --- 設定項目 (ご自身の環境に合わせて変更してください) ---
const BACNET_DEVICE_IP = '127.0.0.1'; // ターゲットBACnetデバイスのIPアドレス
const BACNET_OBJECT_TYPE = Bacstack.enum.ObjectType.ANALOG_INPUT;
const BACNET_OBJECT_INSTANCE = 1; // 例: インスタンス番号
const BACNET_PROPERTY_ID = Bacstack.enum.PropertyIdentifier.PRESENT_VALUE; // 通常は現在値 (85)
const READ_INTERVAL_MS = 5000; // 値を読み取る間隔 (ミリ秒) 例: 5秒ごと
const WEB_SERVER_PORT = 3000; // Webサーバーが待機するポート
// --- 設定項目ここまで ---

// BACnetクライアントの初期化
// ポートを指定しない場合、デフォルトの47808が使われます
// 同一マシン上で他のBACnetクライアントが動いている場合はポート番号を変更してください
// const client = new Bacstack({ port: 47809 });
const client = new Bacstack({
  interface: '127.0.0.1',
//   port: 47809,
});

// Expressアプリケーションの初期化
const app = express();

// 読み取った値を格納する変数 (初期値)
let currentValue = 'N/A';
let lastReadTimestamp = 'Never';
let readError = null;

// 定期的にBACnetデバイスから値を読み取る関数
const readBacnetValue = () => {
  client.readProperty(BACNET_DEVICE_IP,
    { type: BACNET_OBJECT_TYPE, instance: BACNET_OBJECT_INSTANCE },
    BACNET_PROPERTY_ID,
    { arrayIndex: Bacstack.enum.MAX_ARRAY_INDEX },
    (err, value) => {
      if (err) {
        console.error('Error reading BACnet value:', err);
        readError = `Error: ${err.message || err}`;
        currentValue = 'Error'; // エラー発生時は値を更新しないか、エラー表示
      } else {
        try {
          // readPropertyMultipleは複雑な構造で値を返すので、適切に抽出
          // 最初のオブジェクトの最初のプロパティの値を取得する例
          const readValue = value.values[0].value;
          // 配列の場合は最初の要素を取るなど、データ型に応じた処理が必要な場合がある
          currentValue = Array.isArray(readValue) ? readValue[0].value : readValue;
          lastReadTimestamp = new Date().toLocaleString();
          readError = null; // エラーが解消されたらクリア
          console.log(`Value read successfully: ${currentValue} at ${lastReadTimestamp}`);
        } catch (parseError) {
          console.error('Error parsing BACnet response:', parseError, value);
          readError = 'Error: Could not parse response';
          currentValue = 'Parse Error';
        }
      }
    });
};

// サーバー起動時に一度読み取り、その後は定期的に実行
setInterval(readBacnetValue, READ_INTERVAL_MS);

// --- Webサーバーのルート定義 ---

// ルートパス('/')にアクセスされたらHTMLファイルを返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 最新の値を返すAPIエンドポイント
app.get('/api/value', (req, res) => {
  res.json({
    value: currentValue,
    timestamp: lastReadTimestamp,
    error: readError
  });
});

// Webサーバーを起動
app.listen(WEB_SERVER_PORT, () => {
  console.log(`Web server listening on http://localhost:${WEB_SERVER_PORT}`);
  console.log(`Attempting to read from BACnet device ${BACNET_DEVICE_IP}...`);
  console.log(`Object: ${BACNET_OBJECT_TYPE} / ${BACNET_OBJECT_INSTANCE}, Property: ${BACNET_PROPERTY_ID}`);
});

// --- アプリケーション終了時の処理 ---
process.on('SIGINT', () => {
  console.log('Closing BACnet client...');
  client.close();
  console.log('BACnet client closed. Exiting.');
  process.exit();
});
