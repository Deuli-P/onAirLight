const Microphone = require('node-microphone');
const mic = new Microphone();
const micStream = mic.startRecording();

let light = 'red'; // Initialiser l'état de la lumière

micStream.on('data', (data) => {
  // Vérifier si des données audio sont reçues
  if (data.length > 0) {
    light = 'green';
    console.log('Microphone actif');
  } else {
    light = 'red';
    console.log('Microphone inactif');
  }
});

micStream.on('error', (err) => {
  console.error('Erreur lors de la capture audio :', err);
});

micStream.on('close', () => {
  console.log('Flux du microphone fermé');
});
