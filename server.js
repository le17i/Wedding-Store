const express = require('express');
const bodyParser = require('body-parser');
let app = express();

// Variables
const port = process.env.PORT || 5000;

// Configurations
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/assets', express.static('./assets'));
app.use('/app', express.static('./assets'));
app.use('/vendor', express.static('./bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the routes
const routes = require('./routes');
app.use(routes);

// Start the app
app.listen(port, () => console.info(`Running on ${port} port`));