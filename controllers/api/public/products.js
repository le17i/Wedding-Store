const express = require('express');
const request = require('request');
const productRepository = require('../../../repositories/products');
const subscriptionRepository = require('../../../repositories/subscription');

const GCM_API_KEY = 'AAAAJVPh2II:APA91bFHXg4nJ-uoGs29tIt-JSoL7Bu66sAj1S7DXpbSSf83Ze_2I8tBfM3YAG6kWxglhFHLjOp0hl23wJgKihOig3o5Forj2NxnYrgHC-O2tJ7wUjbBysFFWhJC6EsebRuXY_UCSFMI';

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

        subscriptionRepository.getEndpoints(req.params.userId, (pushErr, endpoints) => {
            if(!pushErr) {
                let registrationIds = endpoints.map(endpoint => endpoint.endpoint.replace('https://android.googleapis.com/gcm/send/', ''));

                let jsonBody = {
                    registration_ids: registrationIds,
                    notification: {
                        title: 'Product selected',
                        message: `The product ${response.name} is selected`
                    }
                };

                let options = {
                    uri: 'https://android.googleapis.com/gcm/send',
                    headers: {
                        'Authorization': `key=${GCM_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(jsonBody)
                };

                request(options);
            }

            return res.status(200).json({ status: 200, data: response });
        });
    });
}

module.exports = router;