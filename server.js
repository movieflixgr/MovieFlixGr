const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const ipAddress = req.body.ipAddress;
  const headerValue = req.body.headerValue;

  // Handle the data (e.g., log it or store it in a database)
  console.log('Received IP Address:', ipAddress);
  console.log('Received Header Value:', headerValue);

  res.send('Data received successfully.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});