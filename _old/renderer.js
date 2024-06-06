const { ipcRenderer } = require('electron')

const MicroReconnu = document.querySelector('#micro')
const Connected = document.querySelector('#micro')
const VoiceConnected = document.querySelector('#voice-connected')

const validValue = (element) => {
  element.classList.toggle('clear', true)
}

const failValue = (element) => {
  element.classList.toggle('clear', false)
}

ipcRenderer.on('microphone-status', (event, status) => {
  if (status === 'granted') {
    validValue(MicroReconnu)
    MicroReconnu.textContent = 'Microphone access granted'
  } else {
    failValue(MicroReconnu)
    MicroReconnu.textContent = 'Microphone access denied'
  }
})
