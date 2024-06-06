//Fichier pour savoir si discord est lancé ou pas, 

// Si oui alors lancer la suite 

// la Suite => prend l'entrée du micro pour savoir si actif ou pas



const { exec } = require('child_process');
const path = require('path');

function isDiscordRunning(callback) {
  exec('tasklist', (err, stdout, stderr) => {
    if (err) {
      console.error(`Erreur lors de l'exécution de la commande: ${err.message}`);
      return;
    }
    callback(stdout.toLowerCase().includes('discord.exe'));
  });
}

function startNodeScript() {
  const scriptPath = path.join(__dirname, './javascript/index.js');
  exec(`node ${scriptPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Erreur lors de l'exécution du script: ${err.message}`);
      return;
    }
    console.log(stdout);
  });
}

function monitorDiscord() {
  isDiscordRunning((isRunning) => {
    if (isRunning) {
      console.log('Discord est en cours d\'exécution. Lancement du script Node.js...');
      startNodeScript();
    } else {
      console.log('Discord n\'est pas en cours d\'exécution. Réessayez dans 10 secondes...');
      setTimeout(monitorDiscord, 10000); // Réessayez après 10 secondes
    }
  });
}

monitorDiscord();