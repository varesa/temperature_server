var Sequelize = require('sequelize');

var seq = new Sequelize('postgres', 'postgres', 'nodemcu', {
    host: 'templog-pgsql-sysd.containers.ikioma',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var Record = seq.import(__dirname + "/record.js");

seq.sync();

module.exports = {
    sequelize: seq,
    Record: Record
};