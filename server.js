const express = require('express');
const dbConfig = require('./config/db-config.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json())
require('./app/routes/user.routes.js')(app);

// Connecting to database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


app.get('/', (req, res) => {
  res.json({"message": "Welcome !!"});
});


app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
