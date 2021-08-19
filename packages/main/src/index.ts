import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { URL } from 'url';

import io from '/@/io';

// require the library, main export is a function
import type { SimpleGit } from 'simple-git';
import simpleGit from 'simple-git';
const git: SimpleGit = simpleGit();

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
    app.quit();
    process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
    app.whenReady()
        .then(() => import('electron-devtools-installer'))
        .then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        }))
        .catch(e => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        show: false, // Use 'ready-to-show' event to show window
        width: 1200,
        height: 800,
        webPreferences: {
            preload: join(__dirname, '../../preload/dist/index.cjs'),
            contextIsolation: import.meta.env.MODE !== 'test',   // Spectron tests can't work with contextIsolation: true
            enableRemoteModule: import.meta.env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
        },
    });

    /**
     * If you install `show: true` then it can cause issues when trying to close the window.
     * Use `show: false` and listener events `ready-to-show` to fix these issues.
     *
     * @see https://github.com/electron/electron/issues/25012
     */
    mainWindow.on('ready-to-show', () => {
        mainWindow?.show();

        if (import.meta.env.MODE === 'development') {
            mainWindow?.webContents.openDevTools();
        }
    });

    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
        ? import.meta.env.VITE_DEV_SERVER_URL
        : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


    await mainWindow.loadURL(pageUrl);
};


// return list of files
ipcMain.handle('app:get-files', () => {
    return io.getFiles();
});

const cloneRepository = async () => {



    const remote = 'https://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@github.com/olivM/Notebook';

    git
        .clone(remote, 'localRepo')
        .then(() => console.log('finished'))
        .catch((err) => console.error('failed: ', err));
};


app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const watchFiles = () => {

    io.watchFiles(mainWindow);
};

app.whenReady().then(watchFiles);

app.whenReady()
    .then(cloneRepository)
    .then(createWindow)
    .catch((e) => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
    app.whenReady()
        .then(() => import('electron-updater'))
        .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
        .catch((e) => console.error('Failed check updates:', e));
}
