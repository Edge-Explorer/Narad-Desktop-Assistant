const { contextBridge, ipcRenderer } = require('electron');

// Expose necessary functionality to the renderer process
contextBridge.exposeInMainWorld('electron', {
  sendCommand: (command) => ipcRenderer.send('send-command', command),
  onResponse: (callback) => ipcRenderer.on('command-response', callback)
});
