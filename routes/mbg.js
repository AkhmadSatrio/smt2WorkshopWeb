var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('mbg', {
        judul : 'Makan Bergizi Gratis'
    });
});

module.exports = router;