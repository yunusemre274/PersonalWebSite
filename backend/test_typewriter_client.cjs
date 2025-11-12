const http = require('http');

const data = JSON.stringify({ text: 'Merhaba dünya', speed: 150, unit: 'word' });

const options = {
  hostname: 'localhost',
  port: 4001,
  path: '/api/typewriter/stream',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    process.stdout.write(chunk);
  });
  res.on('end', () => {
    console.log('\n-- stream ended --');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
