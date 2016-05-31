// Modules
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

// Global Variables
let mainWindow;
let anotherWindow;

let menuTemplate = [{
    label: 'MyApp',
    submenu: [{
            label: 'About',
            click: function() {
                showAboutDialog();
            }
        }, {
            label: 'New',
            accelerator: 'CmdOrCtrl+N',
            click: function() {
                createAnotherWindow();
            }
        }, {
            label: 'Delete',
            accelerator: 'CmdOrCtrl+W',
            click: function() {
            BrowserWindow.getFocusedWindow().close()
        }
      },
    {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
            app.quit();
        }
    }]
}];
let menu = Menu.buildFromTemplate(menuTemplate);

// Functions that have to be run on main process
function showAboutDialog() {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        message: 'About This App',
        detail: 'This app was created by @honake'
    });
}

function createMainWindow() {
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        'width': 320,
        'height': 440,
        'transparent': true,
        'frame': false,
        'minWidth': 200,
        'minHeight': 75,
        'title': 'Markdown Stickies',
        'icon': undefined,
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createAnotherWindow() {
    if (BrowserWindow.getAllWindows().length !== 0)
    {
      focused_window = BrowserWindow.getFocusedWindow()
      // Randomization <-- To be fixed !
      rand = Math.floor(Math.random() * 51);
      x = focused_window.getPosition()[0] - 300 - rand;
      y = focused_window.getPosition()[1] + rand;
    }
    anotherWindow = new BrowserWindow({
        'width': 300,
        'height': 400,
        'transparent': true,
        'frame': false,
        'minWidth': 200,
        'minHeight': 75,
        'x': x,
        'y': y
    });
    anotherWindow.loadURL(`file://${__dirname}/another.html`);
    anotherWindow.show;
    anotherWindow.on('closed', () => {
        anotherWindow = null;
    });
}

// Main Process & Renderers
ipcMain.on('createStickies', function(event, unique_id) {
    focused_window = BrowserWindow.fromId(unique_id)
    createAnotherWindow()
})

ipcMain.on('flip_to_front', function(event, unique_id) {
    focused_window = BrowserWindow.fromId(unique_id)
    focused_window.setAlwaysOnTop(true)
})

ipcMain.on('flip_to_back', function(event, unique_id) {
    focused_window = BrowserWindow.fromId(unique_id)
    focused_window.setAlwaysOnTop(false)
})

// Activation & Setups
app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
