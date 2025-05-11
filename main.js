import { app, BrowserWindow,ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

app.on('ready', () => {
  ipcMain.on("save-pdf-dialog", async (event, pdfDataUri) => {
    const win = BrowserWindow.getFocusedWindow();
    const { filePath, canceled } = await dialog.showSaveDialog(win, {
      title: "Save PDF Report",
      defaultPath: "Cervify_Report.pdf",
      filters: [{ name: "PDF Files", extensions: ["pdf"] }],
    });
  
    if (!canceled && filePath) {
      const base64Data = pdfDataUri.split(",")[1];
      fs.writeFile(filePath, Buffer.from(base64Data, "base64"), (err) => {
        if (err) {
          console.error("Failed to save PDF:", err);
        }
      });
    }
  });

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
    icon: path.join(__dirname, 'public/cervify-logo.png'),
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'dist/index.html')}`
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({
      width: 900,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
      },
      icon: path.join(__dirname, 'public/cervify-logo.png'),
    });

    mainWindow.loadURL(
      process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'dist/index.html')}`
    );

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
});
