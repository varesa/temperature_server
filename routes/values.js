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

router.get('/size/:size/page/:page', function(req, res) {
    var datastore = req.app.get('datastore');
    res.setHeader('Access-Control-Allow-Origin', '*');

    datastore.getPage(req.params.size, req.params.page, function(records) {
        console.log(records.length);
        res.send(records);
    });
    console.log(req.params.size);
    console.log(req.params.page);
});

module.exports = router;
