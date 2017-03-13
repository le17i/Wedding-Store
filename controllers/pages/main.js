const express = require('express');
let router = express.Router();

router.get('/:userId', getMain);

function getMain(req, res) {
    return res.render('main', { userId: req.params.userId });
}

module.exports = router;