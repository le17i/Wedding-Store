const mongoose = require('mongoose');

function subscriptionRepository() {
    let schema = {
        endpoint: mongoose.SchemaTypes.String,
        key: mongoose.SchemaTypes.String,
        authSecret: mongoose.SchemaTypes.String,
        userId: mongoose.SchemaTypes.ObjectId
    };
    this.model = mongoose.model('subscriptions', schema);
}

subscriptionRepository.prototype.getEndpoints = function(userId, callback) {
    return this.model.find({ userId: userId }, (err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

subscriptionRepository.prototype.create = function(endpoint, key, authSecret, userId, callback) {
    let pushEntry = new this.model({ endpoint: endpoint, key: key, authSecret: authSecret, userId: userId});
    pushEntry.save((err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

subscriptionRepository.prototype.remove = function(id, userId, callback) {
    this.model.remove({ _id: id, userId: userId }, (err) => {
        if(err) {
            return callback(err, false);
        }
        return callback(null, true);
    });
};

module.exports = new subscriptionRepository();