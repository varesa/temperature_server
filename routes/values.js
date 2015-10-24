var express = require('express');
var router = express.Router();

function makeurl(req, suffix) {
    return req.protocol + "://" + req.get('host') + suffix;
}

router.get('/', function(req, res) {
    var datastore = req.app.get('datastore');
    res.setHeader('Access-Control-Allow-Origin', '*');
    datastore.getAll(function(records) {
        console.log(records.length);
        res.send(records);
    });
});

router.get('/limit/:limit/page/:page', function(req, res) {
    var datastore = req.app.get('datastore');
    res.setHeader('Access-Control-Allow-Origin', '*');

    var limit = req.params.limit;
    var page = req.params.page;

    datastore.countAll(function(totalcount) {
        var pages = totalcount / limit;
        datastore.getPage(limit, page, function(records) {
            if (page < 0 || page > pages) {
                res.send({
                    error: "Page not found"
                });
            }
            res.send({
                links: {
                    first: makeurl(req, "/values/limit/" + limit + "/page/0"),
                    prev: (page == 0) ? null : makeurl(req, "/values/limit/" + limit + "/page/" + (parseInt(page)-1)),
                    self: makeurl(req, "/values/limit/" + limit + "/page/" + page),
                    next: (page == pages) ? null : makeurl(req, "/values/limit/" + limit + "/page/" + (parseInt(page)+1)),
                    last: makeurl(req, "/values/limit/" + limit + "/page/" + pages)
                },
                data: records
            });
        });
    });

    console.log(req.params.size);
    console.log(req.params.page);
});

module.exports = router;
