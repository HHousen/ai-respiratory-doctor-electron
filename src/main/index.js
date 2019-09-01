'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

var childProcess = require('child_process');

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
let subpy

function isDev() {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
global.guniPort = getRandomInt(10000, 49150);
console.log("guniPort: " + global.guniPort);

function startGuniProcess() {
  let guniDir;

  if (isDev()) {
    guniDir = "src"
  } else {
    guniDir = process.resourcesPath + "/src";
  }

  console.log("guniDir: " + guniDir)

  try {
    subpy = childProcess.spawn('gunicorn', ['--chdir', guniDir, '-b', 'localhost:'+global.guniPort, 'predict:app', '--access-logfile', '-']);
  }
  catch (error) {
    console.log(error.status);  // Might be 127 in your example.
    console.log(error.message); // Holds the message you typically want.
    console.log(error.stderr.toString());  // Holds the stderr output. Use `.toString()`.
    console.log(error.stdout.toString());  // Holds the stdout output. Use `.toString()`.
  }

  subpy.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  subpy.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  console.log("Prediction Engine (Gunicorn Flask API) running on localhost:" + global.guniPort);
}

function createMainWindow() {
  startGuniProcess()

  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, 
      webSecurity: false}
    })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    subpy.kill('SIGINT');
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
