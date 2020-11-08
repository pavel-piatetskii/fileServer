const net = require('net');
const fs = require('fs');
const file = process.argv[2];

// ---- Actual function to save a file ---
const saveFileYes = function(data, path) {
  fs.writeFile(`./clientFiles/${path}`, data, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ` +
                `${data.length} bytes to ${path}.`);
    
    process.exit();
  })
};


const conn = net.createConnection({ 
  host: '10.0.2.15', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text

let transfer = false;
conn.on('data', (data) => {
  
   if (transfer) {
     saveFileYes(data, file)
   } else {
     console.log('Server says: ', data);
   }
   
   if (data === `File ${file} has been found!`) {
     transfer = true;
   }
   
   if (data === `Cannot find a file ${file}`) {
     process.exit();
   }
});

conn.on('connect', () => {
  conn.write(file);
});