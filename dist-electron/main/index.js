"use strict";
const electron = require("electron");
const node_os = require("node:os");
require("node:fs");
const node_path = require("node:path");
require("fs");
process.env.DIST_ELECTRON = node_path.join(__dirname, "..");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (node_os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = node_path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = node_path.join(process.env.DIST, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: node_path.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 1280,
    height: 800,
    frame: false
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.webContents.on("will-navigate", (event, url2) => {
    event.preventDefault();
    electron.shell.openExternal(url2);
  });
}
electron.app.whenReady().then(createWindow);
electron.ipcMain.on("Min", (_e) => win == null ? void 0 : win.minimize());
electron.ipcMain.on("Max", (_e) => {
  if (win == null ? void 0 : win.isMaximized()) {
    win.unmaximize();
  } else {
    win == null ? void 0 : win.maximize();
  }
});
electron.ipcMain.on("Close", (_e) => electron.app.quit());
electron.ipcMain.handle("Select_FileOrFolder", async (_event, options) => {
  const res = electron.dialog.showOpenDialogSync(options);
  if (res) {
    return res[0];
  }
});
electron.ipcMain.handleOnce("Get_Path", (_event, path_list) => {
  return path_list.map((path) => {
    return electron.app.getPath(path);
  });
});
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
//# sourceMappingURL=index.js.map
