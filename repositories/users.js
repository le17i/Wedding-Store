const mongoose = require('mongoose');
const mongoURI = 'mongodb://writer:writer#12358@ds129090.mlab.com:29090/wedding-store';

mongoose.connect(mongoURI);

function userRepository() {
    let schema = { name: mongoose.SchemaTypes.String };
    this.model = mongoose.model('user', schema);
}

userRepository.prototype.getAll = function(callback) {
    return this.model.find({ userId: userId }, (err, items) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, items);
    });
};

userRepository.prototype.getById = function(id, callback) {
    return this.model.find({ _id: id }, (err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

userRepository.prototype.create = function(name, callback) {
    let user = new this.model({ name: name });
    user.save((err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

userRepository.prototype.update = function(id, name, callback) {
    this.getById(id, (error, user) => {
        user.name = name;

        user.save((err, item) => {
            if(err) {
                return callback(err, null);
            }
            return callback(null, item);
        });
    });
};

userRepository.prototype.remove = function(id, callback) {
    this.model.remove({ _id: id }, (err) => {
        if(err) {
            return callback(err, false);
        }
        return callback(null, true);
    });
};

module.exports = new productRepository();