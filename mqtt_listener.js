var mqtt = require('mqtt');

var models = require('./models');

function mqtt_listener(datastore) {
    var client = mqtt.connect('mqtt://rabbitmq-sysd.containers.ikioma');

    var ids = [];

    client.on('connect', function() {
       client.subscribe('/devices');
    });

    client.on('message', function(topic, message) {
        if(topic === "/devices") {
            if (ids.indexOf(message.toString() > -1)) {
                ids.push(message.toString());
                client.subscribe('/' + message.toString())
            }
        } else {
            datastore.push(topic.substring(1), message.toString());
        }
    })
}

module.exports = mqtt_listener;
