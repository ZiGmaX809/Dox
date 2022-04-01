
export { }

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    ipcRenderer: import('electron').IpcRenderer;
    shell: import('electron').Shell;
    path: typeof import('path');
    clipboard: import('electron').Clipboard;
    removeLoading: () => void;
  }
}
