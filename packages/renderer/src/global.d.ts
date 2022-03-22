export {};

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    ipcRenderer: import('electron').IpcRenderer;
    shell: import('electron').Shell;
    path: typeof import('path');
    clipboard: import('electron').Clipboard;
    Romove: (Path: string) => void;
    Copy: (originalPath: string, targetPath: string) => void;
    Move: (originalPath: string, targetPath: string) => void;
    Export_File: (blob: Blob, path: string, name: string) => string[];
    Select_FileOrFolder: (options: OpenDialogSyncOptions) => string;
    removeLoading: () => void;
  }
}
