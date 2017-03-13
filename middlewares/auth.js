function isAuthenticate(req, res, next) {
    if(
        'session' in req &&
        'user' in req.session &&
        req.session.user
    ) {
        return next();
    }

    res.redirect('/sign/in');
}

module.exports = isAuthenticate;