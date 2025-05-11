const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  savePdfWithDialog: (pdfDataUri) => ipcRenderer.send("save-pdf-dialog", pdfDataUri)
});