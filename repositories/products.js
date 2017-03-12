const mongoose = require('mongoose');
const mongoURI = 'mongodb://writer:writer#12358@ds129090.mlab.com:29090/wedding-store';

mongoose.connect(mongoURI);

function productRepository() {
    let schema = { name: mongoose.SchemaTypes.String, value: mongoose.SchemaTypes.Number, userId: mongoose.SchemaTypes.ObjectId };
    this.model = mongoose.model('product', schema);
}

productRepository.prototype.getAll = function(userId, callback) {
    return this.model.find({ userId: userId }, (err, items) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, items);
    });
};

productRepository.prototype.getById = function(id, userId, callback) {
    return this.model.find({ _id: id, userId: userId }, (err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

productRepository.prototype.create = function(name, value, userId, callback) {
    let product = new this.model({ name: name, value: value, userId: userId});
    product.save((err, item) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
};

productRepository.prototype.update = function(id, name, value, userId, callback) {
    this.getById(id, userId, (error, product) => {
        product.name = name;
        product.value = value;

        product.save((err, item) => {
            if(err) {
                return callback(err, null);
            }
            return callback(null, item);
        });
    });
};

productRepository.prototype.remove = function(id, callback) {
    this.model.remove({ _id: id }, (err) => {
        if(err) {
            return callback(err, false);
        }
        return callback(null, true);
    });
};

module.exports = new productRepository();