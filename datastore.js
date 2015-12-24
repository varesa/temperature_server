var models = require('./models');

var INTERVAL = 5* 60 * 1000;

function Datastore() {
    this.insertionDates = {}
}

Datastore.prototype.newValue = function(id, value) {
    var now = Date.now();
    if (Object.keys(this.insertionDates).indexOf(id) === -1) {
        this.insertionDates[id] = now;
    } else {
        if(now - this.insertionDates[id] < INTERVAL) {
            console.log("Not storing: " + id);
            return false;
        }
    }
    console.log("Storing: " + id);
    this.insertionDates[id] = now;
    this.store(id, value);
};

Datastore.prototype.store = function (id, value) {
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
