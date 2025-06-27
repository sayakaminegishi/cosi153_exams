const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static CSS file
app.use('/static', express.static(path.join(__dirname, 'public')));

// Route for the screen
app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'screen.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/screen`);
});
