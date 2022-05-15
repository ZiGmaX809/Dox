export {};

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    ipcRenderer: import('electron').IpcRenderer;
    shell: import('electron').Shell;
    path: typeof import('path');
    clipboard: import('electron').Clipboard;
    Remove: (Path: string) => void;
    Copy: (originalPath: string, targetPath: string) => void;
    Move: (originalPath: string, targetPath: string) => void;
    Export_File: (file: Blob | string, FullPath: string) => void;
    removeLoading: () => void;
  }
}
