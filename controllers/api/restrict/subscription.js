const express = require('express');
const authMiddleware = require('../../../middlewares/auth');
const subscriptionRepository = require('../../../repositories/subscription');
let router = express.Router();

router.all(authMiddleware);
router.post('/', subscribe);
router.delete('/', unsubscribe);

function subscribe(req, res) {
    subscriptionRepository.create(req.body.endpoint, req.body.key, req.body.authSecret, req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: err });
        }

        return res.status(201).json({ status: 201 });
    });
}

function unsubscribe(req, res) {
    return res.status(201).json({ status: 201 });
}

module.exports = router;