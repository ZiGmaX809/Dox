import { app, BrowserWindow, shell, ipcMain, OpenDialogSyncOptions, dialog } from 'electron'
import { release } from 'os'
import fs from "fs";
import { join } from 'path'
import { Copy } from './utils/FileOperation';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1280,
    height: 800,
    frame: false,
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

async function add_userData() {
  //检查是否存在用户信息文件夹，不存在则创建并移动public文件夹内容
  const userData_path = app.getPath('userData').replace(/\s/g, '') + '/CacheFiles';
  if (!fs.existsSync(userData_path)) {
    fs.mkdirSync(userData_path);
    // 复制文件列表
    const folder_list = ['divisions', 'images', 'lawfiles', 'presettext', 'offlinecasefiles'];
    folder_list.forEach((foldername: string) => {
      Copy(__dirname.replace('/main', '/renderer/') + foldername, userData_path + '/' + foldername);
    });
  }
}

app.whenReady().then(add_userData).then(createWindow);

ipcMain.on('Min', _e => win?.minimize());
ipcMain.on('Max', _e => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});
ipcMain.on('Close', _e => app.quit());

ipcMain.handle('Select_FileOrFolder', async (_event, options: OpenDialogSyncOptions) => {
  const res = dialog.showOpenDialogSync(options);
  if (res) {
    return res[0];
  }
});

ipcMain.handleOnce('Get_Path', (_event, path_list: string[]): string[] => {
  type pathtype = 'userData' | 'documents' | 'downloads';
  return path_list.map(path => {
    return app.getPath(<pathtype>path);
  });
});

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})
