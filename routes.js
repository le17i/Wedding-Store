const express = require('express');
let router = express.Router();

// Main page
router.use('/', require('./controllers/pages/main'));

module.exports = router;