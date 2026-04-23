var express = require('express');
const connection = require('../config/database');
var router = express.Router();
const model_kategori = require('../model/model_kategori');
const model_users = require('../model/model_users');

router.get('/', async function(req, res, next) {
    try {
    let id = req.session.userId;
    let Data = await model_users.getId(id);
    let rows = await model_kategori.getAll();
  if (Data.length > 0) {
    res.render('kategori/index', {
      email : Data[0].email,
      data : rows,
      judul : 'User Page'
    });
  } else {
    req.flash('error', 'Session berakhir');
    res.redirect('/login');
  }
    } catch (error) {
    req.flash('error', 'Butuh akses Login');
    res.redirect('/login');
    }
});
    


    router.get('/create', function(req, res, next){
        res.render('kategori/create');
    })

    router.get('/edit/(:id)', async function(req, res, next){
        let id = req.params.id;
        let rows = await model_kategori.getId(id);
         res.render('kategori/edit', {
                    id: rows[0].id_kategori, 
                    nama_kategori: rows[0].nama_kategori 
                });
    })

    router.post('/store', async function(req, res, next){
        try {
            let {nama_kategori} = req.body;
            let Data = {
                nama_kategori
            }
            await model_kategori.Store(Data);
            req.flash('success', 'Berhasil Menginput Data');
            res.redirect('/kategori');
        } catch (error) {
            req.flash('error', 'Terjadi Kesalahan');
            res.redirect('/kategori');

        }
    })
    
    router.post('/update/(:id)', async function(req, res, next){
        try {
            let id = req.params.id;
            let {nama_kategori} = req.body;
            let Data = {
                nama_kategori
            }
            await model_kategori.Update(id, Data);
            req.flash('success', 'Berhasil Menginput Data');
            res.redirect('/kategori');
        } catch (error) {
            req.flash('error', 'Terjadi Kesalahan');
            res.redirect('/kategori');

        }
    })

    router.get('/delete/(:id)', async function(req, res) {
        let id = req.params.id;
        await model_kategori.Delete(id);
        req.flash('success', 'Data terhapus');
        res.redirect('/kategori');
    })

module.exports = router;