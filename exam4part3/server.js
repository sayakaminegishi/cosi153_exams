const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const express = require('express');
const path = require('path'); 
const app = express(); //create Express app

const localIP = '192.168.0.22';
const port = 3000;
const PORT = process.env.PORT || 3000;

// Enable CORS to connect to the frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public'))); 
//app.use(express.json());


//define a POST endpoint that expects a JSON body with x,y and z, and computes d and return as a JSON
app.post('/calculate-distance', (req, res) => {
  const { x, y, z } = req.body;

  const xNum = parseFloat(x);
  const yNum = parseFloat(y);
  const zNum = parseFloat(z);

  if (!isNaN(xNum) && !isNaN(yNum) && !isNaN(zNum)) {
    const d = Math.round(Math.sqrt(xNum ** 2 + yNum ** 2 + zNum ** 2));
    return res.json({ distance: d });
  }

  res.status(400).json({ error: 'Invalid input' });
});

// Route for root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://${localIP}:${PORT}/`);
});
