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

    router.get('/create', function(req, res, next){
        res.render('kategori/create');
    })

    router.get('/edit/(:id)', function(req, res, next){
        let id = req.params.id;
        connection.query('select * from Kategori where id_kategori = ' + id, function(err, rows){
            if (err) {
                req.flash("error", 'Gagal memuat Data');
            } else {
                res.render('kategori/edit', {
                    id: rows[0].id_kategori, 
                    nama_kategori: rows[0].nama_kategori 
                });
            }
        })
    })

    router.post('/store', function(req, res, next){
        try {
            let {nama_kategori} = req.body;
            let Data = {
                nama_kategori
            }
            connection.query('insert into Kategori set?', Data, function(err, result){
                if (err) {
                    req.flash('error', 'Gagal Menyimpan Data');
                } else {
                    req.flash('success', 'Berhasil Menginput Data');
                }
                res.redirect('/kategori');
            })
        } catch (error) {
            req.flash('error', 'Terjadi Kesalahan');
            res.redirect('/kategori');

        }
    })
    
    router.post('/update/(:id)', function(req, res, next){
        try {
            let id = req.params.id;
            let {nama_kategori} = req.body;
            let Data = {
                nama_kategori
            }
            connection.query('update kategori set? where id_kategori = '+ id, Data, function(err, result){
                if (err) {
                    req.flash('error', 'Gagal Menyimpan Data');
                } else {
                    req.flash('success', 'Berhasil Menginput Data');
                }
                res.redirect('/kategori');
            })
        } catch (error) {
            req.flash('error', 'Terjadi Kesalahan');
            res.redirect('/kategori');

        }
    })

    router.get('/delete/(:id', function(req, res) {
        let id = req.params.id;
        connection.query('delete from Kategori where id_kategori = ' + id, function(err){
            if (err) {
                req.flash('error', 'Gagal Menghapus data');
            } else {
                req.flash('success', 'Data terhapus');
            }
            res.redirect('/kategori');
        })
    })

module.exports = router;