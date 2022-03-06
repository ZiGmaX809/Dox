import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import { release } from "os";
import fs from "fs";
import { join } from "path";
import { Buffer } from "buffer";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
      webviewTag: true,
    },
    width: 1280,
    height: 800,
    frame: false,
    titleBarStyle: "hiddenInset",
    titleBarOverlay: true,
  });

  win?.webContents.openDevTools({ mode: "detach" });

  if (app.isPackaged || process.env["DEBUG"]) {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

    win.loadURL(url);
    // win?.webContents.openDevTools({ mode: "detach" });
    // win.webContents.openDevTools();
  }

  // Test active push message to Renderer-process
  // win.webContents.on("did-finish-load", () => {
  //   win?.webContents.send("main-process-message", new Date().toLocaleString());
  // });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

async function add_userData() {
  //检查是否存在用户信息文件夹，不存在则创建并移动public文件夹内容
  const userData_path =
    app.getPath("userData").replace(/\s/g, "") + "/CacheFiles";
  if (!fs.existsSync(userData_path)) {
    fs.mkdirSync(userData_path);
    // 复制文件
    const folder_list = ["divisions", "images", "lawfiles", "presettext"];
    folder_list.forEach((foldername: string) => {
      copyDir(
        __dirname.replace("/main", "/renderer/") + foldername,
        userData_path + "/" + foldername,
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }
}

app.whenReady().then(add_userData).then(createWindow);

ipcMain.on("Min", (e) => win?.minimize());
ipcMain.on("Max", (e) => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});
ipcMain.on("Close", (e) => app.quit());

ipcMain.on("Restart", (e) => {
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
  app.exit(0);
});

ipcMain.handle("Get_Path", async (event, arg) => {
  return app.getPath(arg);
});

ipcMain.handle("Get_File", async (event, arg) => {
  const res = dialog.showOpenDialogSync({
    filters: [arg],
  });
  if (res) {
    const final_res = res[0];
    return fs.readFileSync(final_res, { encoding: "utf-8" });
  }
});

ipcMain.handle("Save_File", async (event,arg) => {
  const wordFile = arg.WordFile;
  const savePath = arg.SavePath ?? "";
  const saveName = arg.SaveName;
  if (!wordFile || !saveName) {
    return  ["error", "参数错误！"];
  } else {
    const buff = Buffer.from(wordFile as ArrayBuffer);
    fs.writeFileSync(savePath + saveName, buff);
    return ["success", "导出成功！"];
  }
})

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(
  src: string,
  dist: string,
  callback: (arg0: NodeJS.ErrnoException) => void
) {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err: null, src: fs.PathLike, dist: string) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function (path) {
            var _src = src + "/" + path;
            var _dist = dist + "/" + path;
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback);
                }
              }
            });
          });
        }
      });
    }
  }
}
