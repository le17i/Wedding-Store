const express = require('express');
const productRepository = require('../../../repositories/products');
let router = express.Router();

router.get('/:userId/:id', getItem);
router.put('/:userId/:id', selectItem);
router.get('/:userId', getList);


function getList(req, res) {
    return productRepository.getAll(req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

function getItem(req, res) {
    return productRepository.getById(req.params.id, req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

function selectItem(req, res) {
    return productRepository.select(req.params.id, req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

module.exports = router;