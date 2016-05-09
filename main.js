var app = require('app');  // アプリケーション作成用モジュールをロード
var BrowserWindow = require('browser-window');

//  クラッシュレポート
const crashReporter = require('electron').crashReporter;

crashReporter.start({
  productName: 'MarkdownStickies',
  companyName: 'honake',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
});

var mainWindow = null;

// 全てのウィンドウが閉じたらアプリケーションを終了します。
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// アプリケーションの初期化が完了したら呼び出されます。
app.on('ready', function() {
  // メインウィンドウを作成します。
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
  });

  // メインウィンドウに表示するURLを指定します。
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
