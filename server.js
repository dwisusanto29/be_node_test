const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io')(http);
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

app.use("/images", express.static('./images'));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API." });
});
require('./src/routes/auth.routes')(app);
require('./src/routes/public.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

socketIO.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('chat', (data) => {
    console.log(data);
    socketIO.emit('chat', data);
  });
});


