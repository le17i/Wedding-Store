const express = require('express');
const authMiddleware = require('../../middlewares/auth');
let router = express.Router();

router.get('/', authMiddleware, getAdmin);

function getAdmin(req, res) {
    return res.render('admin');
}

module.exports = router;