const express = require('express');
let router = express.Router();

// Page
router.use('/', require('./controllers/pages/main'));
router.use('/sign', require('./controllers/pages/sign'));
router.use('/admin', require('./controllers/pages/admin'));
router.use('/store/', require('./controllers/pages/store'));

// API public
router.use('/api/public/products', require('./controllers/api/public/products'));
router.use('/api/public/users', require('./controllers/api/public/users'));

// API restrict
router.use('/api/restrict/products', require('./controllers/api/restrict/products'));
router.use('/api/restrict/subscription', require('./controllers/api/restrict/subscription'));

module.exports = router;