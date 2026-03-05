var express = require('express');
const connection = require('../config/database');
var router = express.Router();

router.get('/', function(req, res, next) {
    connection.query('select * from Kategori order by id_kategori desc', function(err, rows) {
        if(err){
            req.flash('error', err);
        } else {
            res.render('kategori/index', {
                judul: 'Halaman Kategori',
                data: rows
            });
            }
        });
    });

module.exports = router;