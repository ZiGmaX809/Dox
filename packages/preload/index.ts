import fs from 'fs';
import { clipboard, contextBridge, ipcRenderer, shell } from 'electron';
import { domReady } from './utils';
import { useLoading } from './loading';
import path from 'path';
import * as FileOperation from '../main/utils/FileOperation';

const { appendLoading, removeLoading } = useLoading();

(async () => {
  await domReady();

  appendLoading();
})();

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs);
contextBridge.exposeInMainWorld('removeLoading', removeLoading);
contextBridge.exposeInMainWorld('shell', shell);
contextBridge.exposeInMainWorld('path', path);
contextBridge.exposeInMainWorld('clipboard', clipboard);
contextBridge.exposeInMainWorld('Remove', FileOperation.Remove);
contextBridge.exposeInMainWorld('Copy', FileOperation.Copy);
contextBridge.exposeInMainWorld('Move', FileOperation.Move);
contextBridge.exposeInMainWorld('Export_File', FileOperation.Export_File);
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer));

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === 'function') {
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
