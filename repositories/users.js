const mongoose = require('mongoose');

function userRepository() {
    let schema = { name: mongoose.SchemaTypes.String, email: mongoose.SchemaTypes.String, password: mongoose.SchemaTypes.String };
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
    return this.model.findById(id, (err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

userRepository.prototype.getByEmail = function(email, callback) {
    return this.model.find({ email: email }, (err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item[0]);
    });
};

userRepository.prototype.create = function(name, email, password, callback) {
    let user = new this.model({ name: name, email: email, password: password });
    user.save((err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

userRepository.prototype.update = function(id, name, email, password, callback) {
    this.getById(id, (error, user) => {
        user.name = name;
        user.email = email;
        user.password = password;

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

module.exports = new userRepository();