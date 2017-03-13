const express = require('express');
const userRepository = require('../../../repositories/users');
let router = express.Router();

router.get('/', searchItem);

const fields = { _id: 1, name: 1, email: 1 };


function searchItem(req, res) {
    if('password' in req.params) {
        delete req.params.password;
    }

    return userRepository.search(req.params, fields, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }
        return res.status(200).json({status: 200, data: response });
    });
}

module.exports = router;