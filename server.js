// express
const express = require('express');
const bodyParser = require('body-parser');

// configuration the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(error => {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
});

// create express app
const app = express();

// parser requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parser requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome To EasyNote application'})
});


// Require Notes routes
require('./app/routes/note.routes.js')(app);


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});

