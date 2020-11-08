const net = require('net');
const fs = require('fs');

/**
 * Load a file from filesystem
 */
const loadFile = function(path, callback) {
  fs.readFile(`./serverFiles/${path}`, 'utf8', (error, data) => {
    (error) ? callback(error) : callback(data);
  });
};

const server = net.createServer();

server.on('connection', (client) => {
  console.log('New client connected!');
  // client.write('Hello there!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    //console.log(data)

    if (fs.existsSync(`./serverFiles/${data}`)) {
      // client.write(`File ${data} has been found!`)
      loadFile(data, (file) => {
        client.write(file);
      });

    } else {
      // client.write(`Cannot find a file ${data}`)
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});