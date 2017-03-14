const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Open connection with mongodb
const mongoURI = 'mongodb://writer:writer#12358@ds129090.mlab.com:29090/wedding-store';
mongoose.connect(mongoURI);


// Create express app
let app = express();

// Variables
const port = process.env.PORT || 5000;

// Configurations
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/assets', express.static('./assets'));
app.use('/app', express.static('./app'));
app.use('/vendor', express.static('./bower_components'));
app.use('/', express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configurations
let sessionKey = {
    cookieName: 'wedding-store-session_',
    secret: `${Math.random()}${Math.random()}${Math.random()}`,
    resave: true,
    saveUninitialized: false
};
app.use(session(sessionKey));

// Initialize the routes
const routes = require('./routes');
app.use(routes);

// Start the app
app.listen(port, () => console.info(`Running on ${port} port`));