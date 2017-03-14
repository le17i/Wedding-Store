const express = require('express');
const webPush = require('web-push');
const productRepository = require('../../../repositories/products');
const subscriptionRepository = require('../../../repositories/subscription');

const GCM_API_KEY = 'AAAAJVPh2II:APA91bFHXg4nJ-uoGs29tIt-JSoL7Bu66sAj1S7DXpbSSf83Ze_2I8tBfM3YAG6kWxglhFHLjOp0hl23wJgKihOig3o5Forj2NxnYrgHC-O2tJ7wUjbBysFFWhJC6EsebRuXY_UCSFMI';
let router = express.Router();

webPush.setGCMAPIKey(GCM_API_KEY);

const vapidKeys = webPush.generateVAPIDKeys();

const webPushOptions = {
    gcmAPIKey: GCM_API_KEY,
    vapidDetails: {
        subject: 'mailto:ledias.17@gmail.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey
    },
    TTL: 400,
};

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

function sendNotification(productName, endpoint, p256dh, auth, options) {
    let pushSubscription = {
        endpoint: endpoint,
        keys: {
            p256dh: p256dh,
            auth: auth
        }
    };

    let payload = {
        title: 'Product selected',
        body: `The product ${productName} is selected`,
        icon: '/assets/image/icon-144.png',
        tag: 'wedding-store-notification'
    };

    webPush.sendNotification(
        pushSubscription,
        payload,
        options
    );
}

function selectItem(req, res) {
    return productRepository.select(req.params.id, req.params.userId, (err, response) => {
        if(err) {
            return res.status(500).json({ status: 500, message: 'houston, we have a problem' });
        }

        subscriptionRepository.getEndpoints(req.params.userId, (pushErr, endpoints) => {
            console.log(pushErr);
            if(!pushErr) {
                console.log('endpoints', endpoints);
                for(let endpoint in endpoints) {
                    sendNotification(response.name, endpoint.endpoint, endpoint.key, endpoint.authSecret, webPushOptions);
                }
            }

            return res.status(200).json({ status: 200, data: response });
        });
    });
}

module.exports = router;