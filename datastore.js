var models = require('./models');

function Datastore() {}

Datastore.prototype.push = function (id, value) {
    models.Record.create({
        deviceId: id,
        value: value,
        date: new Date()
    });
};

/*// Return the last added record for a sensor
Datastore.prototype.getLatestBySensor = function (id, cb) {
    models.Record.findOne({
        where: {
            deviceId: id
        },
        order: 'date DESC'
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};*/

/*// Record x * latest records for a sensor
Datastore.prototype.getLimitBySensor = function (id, limit, cb) {
    models.Record.findAll({
        where: {
            deviceId: id
        },
        order: 'date DESC',
        limit: limit
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};*/

/*// Return x * latest records (not per-sensor)
Datastore.prototype.getLimitByTotal = function (limit, cb) {
    models.Record.findAll({
        order: 'date DESC',
        limit: limit
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};*/

/*Datastore.prototype.getAllBySensor = function (id, cb) {
    models.Record.findAll({
        where: {
            deviceId: id
        }
    }).then(cb).catch(function (err) {
        console.log(err);
    });
};*/

Datastore.prototype.getAll = function(cb) {
    models.Record.findAll({
        order: "date ASC"
    }).then(cb).catch(function (err) {
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
