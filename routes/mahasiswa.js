var express = require('express');
const connection = require('../config/database');
const model_mahasiswa = require('../model/model_mahasiswa');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', async function(req, res, next) {
    let rows = await model_mahasiswa.getAll();
    res.render('mahasiswa/index', {
        judul: 'Halaman Mahasiswa',
        data: rows
    });
});

router.get('/create', function(req, res, next) {
    res.render('mahasiswa/create');
});

router.get('/edit/(:id)', async function(req, res, next) {
    let id = req.params.id;
    let rows = await model_mahasiswa.getId(id);
    res.render('mahasiswa/edit', {
        id: rows[0].id_mahasiswa,
        nrp: rows[0].nrp,
        nama: rows[0].nama,
        jenis_kelamin: rows[0].jenis_kelamin,
        foto_mahasiswa: rows[0].foto_mahasiswa
    });
});

router.post('/store', upload.single('foto_mahasiswa'), async function(req, res, next) {
    try {
        let { nrp, nama, jenis_kelamin } = req.body;
        let foto_mahasiswa = req.file ? req.file.filename : null;
        let Data = { nrp, nama, jenis_kelamin, foto_mahasiswa };

        await model_mahasiswa.Store(Data);
        req.flash('success', 'Berhasil Menginput Data');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi Kesalahan');
        res.redirect('/mahasiswa');
    }
});

router.post('/update/:id', upload.single('foto_mahasiswa'), async function(req, res, next) {
    try {
        let id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await model_mahasiswa.getId(id);
        const namafilelama = rows[0].foto_mahasiswa;
        let { nrp, nama, jenis_kelamin } = req.body;
        let Data = { nrp, nama, jenis_kelamin };

        if (filebaru) {
            if (namafilelama) {
                const pathfilelama = path.join(__dirname, '../public/images', namafilelama);
                if (fs.existsSync(pathfilelama)) {
                    fs.unlinkSync(pathfilelama);
                }
            }
            Data.foto_mahasiswa = filebaru;
        }

        await model_mahasiswa.Update(id, Data);
        req.flash('success', 'Berhasil Mengupdate Data');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi Kesalahan');
        res.redirect('/mahasiswa');
    }
});

router.get('/delete/(:id)', async function(req, res) {
    let id = req.params.id;
    let rows = await model_mahasiswa.getId(id);
    const namafilelama = rows[0].foto_mahasiswa;
    if (namafilelama) {
        const pathfilelama = path.join(__dirname, '../public/images', namafilelama);
        if (fs.existsSync(pathfilelama)) {
            fs.unlinkSync(pathfilelama);
        }
    }
    await model_mahasiswa.Delete(id);
    req.flash('success', 'Data terhapus');
    res.redirect('/mahasiswa');
});

module.exports = router;
