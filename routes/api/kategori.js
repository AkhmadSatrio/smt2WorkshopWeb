var express = require('express');
var router = express.Router();
const model_kategori = require('../../model/model_kategori');
const model_users = require('../../model/model_users');
var verifyToken = require('../../config/middleware/jwt');

router.get('/',verifyToken, async function(req, res, next) {
    let rows = await model_kategori.getAll();
    return res.status(200).json({
      status : true,
      data : rows,
      messages : 'Data Kategori'
    });
});
    
    router.get('/create', function(req, res, next){
        res.render('kategori/create');
    });

    router.get('/data/(:id)', async function(req, res, next){
        let id = req.params.id;
        let rows = await model_kategori.getId(id);
        return res.status(200).json({
                    id: rows[0].id_kategori, 
                    nama_kategori: rows[0].nama_kategori 
        });
    });

    router.post('/store', async function(req, res, next){
        try {
            let {nama_kategori} = req.body;
            let Data = {
                nama_kategori
            }
            await model_kategori.Store(Data);
           return res.status(200).json({
            status: true,
            messages: 'Berhasil Menambahkan Data'
           });
        } catch (error) {
           return res.status(500).json({
            status: true,
            messages: 'Terjadi Kesalahan'
           });
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
            return res.status(200).json({
                status: true,
                messages: 'Berhasil Mengupdate Data'
            });
        } catch (error) {
            return res.status(500).json({
                status: true,
                messages: 'Gagal Mengupdate Data'
            });    
        }
    })

    router.get('/delete/(:id)', async function(req, res) {
        let id = req.params.id;
        await model_kategori.Delete(id);
     return res.status(200).json({
                status: true,
                messages: 'Berhasil Menghapus Data'
            });
    })

module.exports = router;