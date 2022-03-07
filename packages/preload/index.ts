import fs from "fs";
import { clipboard, contextBridge, ipcRenderer, shell } from "electron";
import path from "path";
import { domReady } from "./utils";
import { useLoading } from "./loading";
import { Copy, Move, Remove } from "../main/utils/FileOperation";

const { appendLoading, removeLoading } = useLoading();

(async () => {
  await domReady();

  appendLoading();
})();

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("removeLoading", removeLoading);
contextBridge.exposeInMainWorld("shell", shell);
contextBridge.exposeInMainWorld("path", path);
contextBridge.exposeInMainWorld("clipboard", clipboard);
contextBridge.exposeInMainWorld("Romove", Remove);
contextBridge.exposeInMainWorld("Copy", Copy);
contextBridge.exposeInMainWorld("Move", Move);
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
