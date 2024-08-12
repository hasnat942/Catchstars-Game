const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/catchstars', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your API routes here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
