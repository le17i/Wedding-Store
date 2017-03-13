const express = require('express');
const authMiddleware = require('../../../middlewares/auth');
const userRepository = require('../../../repositories/users');
let router = express.Router();

router.all(authMiddleware);
router.get('/users', getList);
router.get('/users/:id', getItem);
router.post('/users', createItem);
router.put('/users/:id', updateItem);
router.delete('/users/:id', removeItem);


function getList(req, res) {
    return userRepository.getAll((err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

function getItem(req, res) {
    return userRepository.getById(req.body.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({ status: 200, data: response });
    });
}

function createItem(req, res) {
    return userRepository.create(res.body.name, res.body.email, res.body.password, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function updateItem(req, res) {
    return userRepository.create(res.body.id, res.body.name, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(201).json({ status: 201, data: response });
    });
}

function removeItem(req, res) {
    return userRepository.create(res.body.id, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(204).json({ status: 204 });
    });
}

module.exports = router;