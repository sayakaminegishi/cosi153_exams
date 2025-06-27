const express = require('express');
const app = express();

// ✅ If using Node 18+, you can use fetch natively. Otherwise, uncomment the line below:
// const fetch = require('node-fetch'); // npm install node-fetch

const PORT = process.env.PORT || 3000;

// Enable CORS for frontend access (React Native needs this if calling locally)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this in production
  next();
});

// GET /meals?ingredient=chicken_breast
app.get('/meals', async (req, res) => {
  const ingredient = req.query.ingredient;

  if (!ingredient) {
    return res.status(400).json({ error: 'Missing ingredient parameter' });
  }

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    // Return meals list
    res.json({ meals: json.meals || [] });
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});