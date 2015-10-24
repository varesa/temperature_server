var models = require('./models');

function Datastore() {}

Datastore.prototype.push = function (id, value) {
    models.Record.create({
        deviceId: id,
        value: value,
        date: new Date()
    });
};

Datastore.prototype.getAll = function(cb) {
    models.Record.findAll({
        order: "date ASC"
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};

Datastore.prototype.countAll = function(cb) {
    models.Record.count().then(cb).catch(function (err) {
        console.log(err);
    });
};

Datastore.prototype.getPage = function(size, page, cb) {
    var offset = page*size;    
    models.Record.findAll({
        order: "date ASC",
        offset: offset,
        limit: size        
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};

module.exports = Datastore;
