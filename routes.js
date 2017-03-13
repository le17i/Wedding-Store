const express = require('express');
let router = express.Router();

// Page
router.use('/', require('./controllers/pages/main'));
router.use('/sign', require('./controllers/pages/sign'));
router.use('/admin', require('./controllers/pages/admin'));
router.use('/store/', require('./controllers/pages/store'));

// API
router.use('/api/public/products', require('./controllers/api/public/products'));
router.use('/api/public/users', require('./controllers/api/public/users'));
router.use('/api/restrict/', require('./controllers/api/restrict/products'));

module.exports = router;