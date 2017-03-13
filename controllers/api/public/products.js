const express = require('express');
const productRepository = require('../../../repositories/products');
let router = express.Router();

router.get('/products/:userId', getList);
router.get('/products/:userId/:id', getItem);


function getList(req, res) {
    return productRepository.getAll(req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

function getItem(req, res) {
    return productRepository.getAll(res.params.id, req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

module.exports = router;