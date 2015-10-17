var models = require('./models');

function Datastore() {
    this.values = {};
}

Datastore.prototype.push = function (id, value) {
    this.values[id] = {
        value: value,
        date: new Date()
    };
    models.Record.create({
        deviceId: id,
        value: value,
        date: new Date()
    });
};

// Return the last added record for a sensor
Datastore.prototype.getLatestBySensor = function (id, cb) {
    models.Record.findOne({
        where: {
            deviceId: id
        },
        order: 'date DESC'
    }).then(cb);
};

// Record x * latest records for a sensor
Datastore.prototype.getLimitBySensor = function (id, limit, cb) {
    models.Record.findAll({
        where: {
            deviceId: id
        },
        order: 'date DESC',
        limit: limit
    }).then(cb);
};

// Return x * latest records (not per-sensor)
Datastore.prototype.getLimitByTotal = function (limit, cb) {
    models.Record.findAll({
        order: 'date DESC',
        limit: limit
    }).then(cb);
};

Datastore.prototype.getAllBySensor = function (id, cb) {
    models.Record.findAll({
        where: {
            deviceId: id
        }
    }).then(cb);
};

Datastore.prototype.getAll = function(cb) {
    models.Record.findAll({
        order: "date DESC"
    }).then(cb);
};

module.exports = Datastore;