const net = require('net');
const fs = require('fs');
const [ , , host, port, file] = process.argv;

const conn = net.createConnection({ 
  host, // change to IP address of computer or ngrok host if tunneling
  port // or change to the ngrok port if tunneling
});

let fileToSave =  fs.createWriteStream(`./clientFiles/${file}`)
let transfer = false;
conn.on('data', (data) => {
  fileToSave.write(data);
});

conn.on('connect', () => {
  conn.write(file);
});

conn.on('close', () => {
  console.log(`Done! File ${file} received.`);
});