var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var datastore = req.app.get('datastore');
    res.setHeader('Access-Control-Allow-Origin', '*');
    datastore.getAll(function(records) {
        console.log(records.length);
        res.send(records);
    });
});

router.get('/:limit', function(req, res) {

});

module.exports = router;