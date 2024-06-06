const WebSocket = require("ws");
require('dotenv').config({ path: '.env.local' });

const ws = new WebSocket(process.env.DISCORD_URL);

let interval;
let my_user_id = process.env.DISCORD_MY_USER_ID;
let my_token = process.env.DISCORD_TOKEN;
let debug = true;


// Si on allume et error alors console error
ws.on("error", console.error);


// Si on allume et message reçu => prend le payload reçu 
ws.on("message", function message(data) {
    const payload = JSON.parse(data);
    const { t, s, op, d } = payload;
    
    switch (op) {
      case 10:
        console.log("Charge utile Hello recue: ", d); // Enregistrer la charge utile Hello
        if (d.heartbeat_interval) {
          const { heartbeat_interval } = d;
          interval = heartbeat(heartbeat_interval);

          console.log("heart beat");
          identify();
        } else {
          console.error("Heartbeat interval non recu");
        }
        break;
        case 0:
            if (t === "VOICE_STATE_UPDATE" && d.user_id === my_user_id) {
                console.log("Recu: ", payload);
                console.log(`Mute ? ${payload.d.self_mute}`);
                console.log(`Mute Server ? ${payload.d.mute}`);
              }
            else if(t === 'VOICE_STATE_UPDATE'){
                console.log('ping');
                console.log("d.user_id",typeof d.user_id,"user id",typeof my_user_id);
            }
              break;
      default:
        console.log("default:",payload);
        break;
    }
  });
  

ws.on("open", function open() {
  console.log("WebSocket connection opened");
});

ws.on("close", function close() {
  if (debug) console.log("WebSocket connection closed");
  if (interval) clearInterval(interval);
});

function identify() {
  const payload = {
    op: 2,
    d: {
      token: my_token,
      properties: {
        $os: "windows",
        $browser: "disco",
        $device: "disco",
      },
    },
  };
  ws.send(JSON.stringify(payload));
  if (debug) console.log("Identification payload sent");
}

function heartbeat(ms) {
  return setInterval(() => {
    const payload = {
      op: 1,
      d: null,
    };
    ws.send(JSON.stringify(payload));
    if (debug) console.log("Heartbeat sent");
  }, ms);
}


const init = ()=> {
    setTimeout(()=>{
        console.log("Interval")
        init()
    },[5000])
}

init()
