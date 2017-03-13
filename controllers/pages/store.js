const express = require('express');
let router = express.Router();

router.get('/:userId', getMain);

function getMain(req, res) {
    return res.render('store', { userId: req.params.userId });
}

module.exports = router;