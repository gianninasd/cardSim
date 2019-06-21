const http = require('http');
const os = require('os');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  req.on('error', (err) => {
    console.error('Some error>> ' + err);
  });

  console.log('headers>> ' + req.headers);
  console.log('method>> ' + req.method);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
  console.log('got it');
});

server.listen(port, hostname, () => {
  let osPlatform = os.platform();
  let osRelease = os.release();
  console.log(`Card Simulator running at http://${hostname}:${port}/ on ${osPlatform} (${osRelease})`);
});
