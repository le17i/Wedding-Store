const express = require('express');
let router = express.Router();

// Page
router.use('/sign', require('./controllers/pages/sign'));
router.use('/admin', require('./controllers/pages/admin'));
router.use('/store/', require('./controllers/pages/main'));

// API
router.use('/api/public/', require('./controllers/api/public/products'));
router.use('/api/restrict/', require('./controllers/api/restrict/products'));

module.exports = router;