//exam 4 pt 1

//import necessary modules
const express = require('express'); //web framework for Node.js
const path = require('path'); //to handle file paths 
const localIP = '192.168.0.22'; //IP address of computer

const app = express(); //initialize an instance of an Express application to handle routing and HTTP requests.
const port = 3000; //the server will listen on port 3000

// Serve static files from the Public directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Route for the screen: when the browser visits /screen, the router will send the screen.html file in the Public directory. 
app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'screen.html'));
});


//start server and logs a message in the console with URL to the /screen page. 
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at localIP:${port}/screen`); //accepts request from any device on the same local network
});

