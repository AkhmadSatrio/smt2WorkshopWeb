var express = require('express');
const connection = require('../config/database');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('kategori/create',{
        nama_kategori: ''
    })
});

module.exports = router;