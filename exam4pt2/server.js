
//import node-fetch so that the Express server can make HTTP requests to APIs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



const express = require('express');
const path = require('path'); 
const app = express(); //initialize the expo app

const localIP = '192.168.0.22'; //ip address of computer
const port = 3000;
const PORT = process.env.PORT || 3000;

// Enable CORS so that frontend (index.html)can access the backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// Make files in the public/ directory become accessible to the browser
app.use(express.static(path.join(__dirname, 'public'))); 

// API route: reads an ingredient (the query input), sends request to TheMealDB, and returns a JSON obj containing the meals. 
app.get('/meals', async (req, res) => {
  const ingredient = req.query.ingredient;

  if (!ingredient) {
    return res.status(400).json({ error: 'Missing ingredient parameter' });
  }

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json({ meals: data.meals || [] });
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// serve index.html on Root / so that app is accessible via browser on mobile device
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://${localIP}:${PORT}/`);
});
