import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { screen } from 'electron';



function createWindow() {
  // Obtenemos el tamaño completo de la pantalla
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Creamos la ventana del navegador con el tamaño completo y sin el marco
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    frame: false, // Usamos un encabezado personalizado, así que frame es false
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.setAlwaysOnTop(true, 'screen');

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR para el renderer basado en electron-vite CLI.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // Eventos para minimizar, maximizar/restaurar y cerrar la ventana
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
}

// Inicialización de Electron y creación de la ventana
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cerrar la aplicación cuando todas las ventanas están cerradas, excepto en macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
