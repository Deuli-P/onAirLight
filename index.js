const Microphone = require("node-microphone");
const mic = new Microphone();
const micStream = mic.startRecording();

let active = false;
let light = "red"; // Initialize the light stat

const START_PATTERN = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);

micStream.on("data", (data) => {
  // Check if audio data is received
  if (data) {
    active = true;
    console.log("Microphone actif");
    console.log(data);
    if (data.slice(0, START_PATTERN.length).equals(START_PATTERN)) {
      light = "red";
      console.log("Micro off");
    } else {
      console.log("Micro on");
      light = "green";
    }
  } else {
    active = false;
    console.log("Microphone inactif");
  }
});

micStream.on("error", (err) => {
  console.error("Erreur lors de la capture audio :", err);
});

micStream.on("close", () => {
  console.log("Flux du microphone ferme");
});
