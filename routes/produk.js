var express = require('express');
const connection = require('../config/database');
var router = express.Router();
const model_produk = require('../model/model_produk');

const fs = require('fs');
const multer = require('multer');
const path = require('path');
const model_users = require('../model/model_users');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage});

router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await model_users.getId(id);
        let rows = await model_produk.getAll();
    if (Data.length > 0) {
        res.render('produk/index', {
            email : Data[0].email,
            judul : 'Halaman Produk',
            data: rows
        });
    } else {
        req.flash('error', 'Session Berakhir');
        res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
    }
    } catch (error) {
        req.flash('error', 'Butuh akses Login');
        res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
    }
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
router.post('/store', upload.single("gambar_produk"), async function(req, res, next){
    try {
        let { nama_produk, harga, id_kategori } = req.body;
        let gambar_produk = req.file ? req.file.filename : null;
        let Data = { nama_produk, harga, id_kategori, gambar_produk };

        await model_produk.Store(Data);
        req.flash('success', 'Berhasil Menginput Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi Kesalahan');
        res.redirect('/produk');
    }
});

router.post('/update/:id', upload.single("gambar_produk"), async function(req, res, next){
    try {
        let id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;

        let rows = await model_produk.getId(id);
        const namafilelama = rows[0].gambar_produk;

        let { nama_produk, harga, id_kategori } = req.body;
        let Data = { nama_produk, harga, id_kategori };

        if (filebaru) {
            if (namafilelama) {
                const pathfilelama = path.join(__dirname, '../public/images', namafilelama);
                if (fs.existsSync(pathfilelama)) {
                    fs.unlinkSync(pathfilelama);
                }
            }
            Data.gambar_produk = filebaru;
        }

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
    let rows = await model_produk.getId(id);
    const namafilelama = rows[0].gambar_produk;
    if(namafilelama) {
       const pathfilelama = path.join(__dirname, '../public/images', namafilelama);
                    fs.unlinkSync(pathfilelama); 
    }
    await model_produk.Delete(id);
    req.flash('success', 'Data terhapus');
    res.redirect('/produk');
});

module.exports = router;