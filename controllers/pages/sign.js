const express = require('express');
const userRepository = require('../../repositories/users');
let router = express.Router();

router.get('/in', getSignIn);
router.post('/in', postSignIn);

router.get('/up', getSignUp);
router.post('/up', postSignUp);

function getSignIn(req, res) {
    return res.render('signin');
}

function postSignIn(req, res) {
    return userRepository.getByEmail(req.body.email, (err, user) => {
        if(err) {
            return res.render('signin', { message: 'houston, we have a problem' });
        }

        if(user === null) {
            return res.render('signin', { message: 'user not found' });
        }

        if(user.password != req.body.password) {
            return res.render('signin', { message: 'password is wrong' });
        }

        req.session.user = user;
        return res.redirect('/admin');
    });
}

function getSignUp(req, res) {
    return res.render('signup');
}

function postSignUp(req, res) {
    return userRepository.create(req.body.name, req.body.email, req.body.password, (err, user) => {
        if(err) {
            return res.render('signup', { message: 'houston, we have a problem' });
        }

        if(user === null) {
            return res.render('signup', { message: 'ops... we can not create the account :(' });
        }

        req.session.user = user;
        return res.redirect('/admin');
    });
}

module.exports = router;