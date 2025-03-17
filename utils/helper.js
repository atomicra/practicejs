const os = require('os');
const WebSocket = new require('ws');

function onSocketPreError(e) {
  console.log(e);
}

function onSocketPostError(e) {
  console.log(e);
}

function config(s) {
  const wss = new WebSocket.Server({ noServer: true });

  s.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);
    wss.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener('error', onSocketPreError);
      wss.emit('connection', ws, req);
    });

  });

  wss.on('connection', (ws, req) => {

    ws.on('error', onSocketPostError);

    ws.on('message', (msg, isBinary) => {
      let text = msg.toString();
      text = text.slice(0, 50); // максимальный размер сообщения 50
      console.log(text);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: isBinary });
        }
      });
    });

    ws.on('close', () => {
      console.log('Connection closed');
    });
  });

  wss.on('close', () => {
    console.log('wss closed');
  });
}

const getExtIP = () => {
  const ifaces = os.networkInterfaces();
  let np = [];
  for (let key in ifaces) {
    if (Array.isArray(ifaces[key]))
      np = np.concat(ifaces[key])
  }
  const ipv4ext = np.find(elem => {
    try {
      return (elem.family.toLocaleLowerCase() === 'ipv4' && elem.internal === false);
    } catch (error) {
      return false
    }
  });
  try {
    return ipv4ext.address;
  } catch (error) {
    return ``;
  }
}

module.exports.config = config;
module.exports.getExtIP = getExtIP;
