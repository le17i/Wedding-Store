const express = require('express');
let router = express.Router();

router.get('/', getMain);

function getMain(req, res) {
    return res.render('main');
}

module.exports = router;