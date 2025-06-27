const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
