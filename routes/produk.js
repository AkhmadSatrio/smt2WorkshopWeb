var express = require('express');
const connection = require('../config/database');
var router = express.Router();
const model_produk = require('../model/model_produk');

router.get('/', async function(req, res, next) {
    let rows = await model_produk.getAll();
    res.render('produk/index', {
        judul : 'Halaman Produk',
        data: rows
    });
});

router.get('/create', function(req, res, next){
    connection.query('SELECT * FROM kategori ORDER BY id_kategori DESC', (err, rows) => {
        if (err) {
            console.error(err);
            res.redirect('/produk');
        } else {
            res.render('produk/create', { kategori: rows });
        }
    });
});

router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;

    connection.query('SELECT * FROM produk WHERE id_produk=?', [id], (err, produk) => {
        if (err) {
            console.error(err);
            res.redirect('/produk');
        } else {
            connection.query('SELECT * FROM kategori', (err, kategori) => {
                if (err) {
                    console.error(err);
                    res.redirect('/produk');
                } else {
                    res.render('produk/edit', {
                        id: produk[0].id_produk,
                        nama_produk: produk[0].nama_produk,
                        harga: produk[0].harga,
                        id_kategori: produk[0].id_kategori,
                        kategori: kategori
                    });
                }
            });
        }
    });
});

router.post('/store', async function(req, res, next){
    try {
        let { nama_produk, harga, id_kategori } = req.body;
        let Data = { nama_produk, harga, id_kategori };
        await model_produk.Store(Data);
        req.flash('success', 'Berhasil Menginput Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi Kesalahan');
        res.redirect('/produk');
    }
});

router.post('/update/(:id)', async function(req, res, next){
    try {
        let id = req.params.id;
        let { nama_produk, harga, id_kategori } = req.body;
        let Data = { nama_produk, harga, id_kategori };
        await model_produk.Update(id, Data);
        req.flash('success', 'Berhasil Mengupdate Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi Kesalahan');
        res.redirect('/produk');
    }
});

router.get('/delete/(:id)', async function(req, res) {
    let id = req.params.id;
    await model_produk.Delete(id);
    req.flash('success', 'Data terhapus');
    res.redirect('/produk');
});

module.exports = router;