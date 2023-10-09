
  const http = require('http');
  const path = require('path');
  const express = require('express');
  const app = express();
  const fs = require('fs');
  const axios = require('axios');
  const port = 3000;

  app.use(express.json());

  const privateKeyPath = path.join(__dirname, 'key-v3.pem');
  const certificateChainPath = path.join(__dirname, 'cert-v3.pem');
  
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const certificateChain = fs.readFileSync(certificateChainPath, 'utf8');
  
  const credentials = {
    key: privateKey,
    cert: certificateChain,
    passphrase: "12345",
  };
  
  // Define a simple route using Express.js
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.post('/get', async (req, res)=>{
    console.log(req.body.method);
    try {
                const response = await axios({
                  method: req.body.method,
                  url: req.body.endpoint,
                  headers: req.body.headers,
                  data: req.body.data
                });
                
                return response;
                // res.send("done")
              } catch (error) {
                console.log(error);
                // throw new Error(error.message);
              }
  });
  
  // Start an HTTP server using Express.js
  const server = http.createServer(credentials, app);
  
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
   