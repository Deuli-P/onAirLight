const { app, BrowserWindow, Tray, nativeImage, systemPreferences } = require('electron')
const path = require('path')

let tray = null
let win = null

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

const accessMicrophone = () => {
  const status = systemPreferences.getMediaAccessStatus('microphone')
  if (status === 'granted') {
    win.webContents.send('microphone-status', 'granted')
  } else {
    win.webContents.send('microphone-status', 'denied')
  }
}

app.whenReady().then(() => {
  createWindow()

  const icon = nativeImage.createFromPath(path.join(__dirname, 'Microphone.png'))
  tray = new Tray(icon)
  
  tray.setToolTip('Microphone Detection App')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Check microphone access when the app is ready
app.on('ready', accessMicrophone)