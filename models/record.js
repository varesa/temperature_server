module.exports = function(sequelize, datatypes) {
    var Record = sequelize.define('record', {
        deviceId: {
            type: datatypes.STRING,
            allowNull: false
        },
        value: {
            type: datatypes.FLOAT,
            allowNull: false
        },
        date: {
            type: datatypes.DATE,
            allowNull: false
        }
    });
    return Record;
};