const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
dotenv.config();


const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//use helmet to secure Express headers
app.use(helmet());

//parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API." });
});
require('./src/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



