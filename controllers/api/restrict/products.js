const express = require('express');
const authMiddleware = require('../../../middlewares/auth');
const productRepository = require('../../../repositories/products');
let router = express.Router();

router.all(authMiddleware);
router.get('/', getList);
router.get('/:id', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', removeItem);


function getList(req, res) {
    return productRepository.getAll(req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

function getItem(req, res) {
    return productRepository.getAll(req.params.id, req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

function createItem(req, res) {
    return productRepository.create(req.body.name, req.body.value, req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function updateItem(req, res) {
    return productRepository.update(req.params.id, req.body.name, req.body.value, req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function removeItem(req, res) {
    return productRepository.remove(req.params.id, req.session.user._id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(204).json({ status: 204 });
    });
}

module.exports = router;