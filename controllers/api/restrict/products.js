const express = require('express');
const authMiddleware = require('../midlewares/auth');
const productRepository = require('../repositories/products');
let router = express.Router();

router.all(authMiddleware);
router.get('/products', getList);
router.get('/products/:id', getItem);
router.post('/products', createItem);
router.put('/products/:id', updateItem);
router.delete('/products/:id', removeItem);


function getList(req, res) {
    return productRepository.getAll(req.user.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

function getItem(req, res) {
    return productRepository.getAll(res.body.id, req.user.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

function createItem(req, res) {
    return productRepository.create(res.body.name, res.body.value, req.user.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function updateItem(req, res) {
    return productRepository.create(res.body.id, res.body.name, res.body.value, req.user.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function removeItem(req, res) {
    return productRepository.create(res.body.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(204).json({ status: 204 });
    });
}

module.exports = router;