const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('connection', (client) => {
  console.log('New client connected!');

  client.on('data', (data) => {
  console.log(client)
    if (fs.existsSync(`./serverFiles/${data}`)) {
      console.log(`Sending file ${data}`)
      fs.createReadStream(`./serverFiles/${data}`).pipe(client);

    } else {
      console.log(`File ${data} not found. Sending file-not-found`)
      fs.createReadStream(`./serverFiles/file-not-found`).pipe(client);
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});