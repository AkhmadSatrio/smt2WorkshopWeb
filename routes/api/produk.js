var express = require('express');
var router = express.Router();
const model_produk = require('../../model/model_produk');
const model_users = require('../../model/model_users');

router.get('/', async function(req, res, next) {
    let rows = await model_produk.getAll();
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
        let rows = await model_produk.getId(id);
        return res.status(200).json({
                    id: rows[0].id_produk, 
                    nama_produk: rows[0].nama_produk 
        });
    });

    router.post('/store', async function(req, res, next){
        try {
            let {nama_produk} = req.body;
            let Data = {
                nama_produk
            }
            await model_produk.Store(Data);
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
            let {nama_produk} = req.body;
            let Data = {
                nama_produk
            }
            await model_produk.Update(id, Data);
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
        await model_produk.Delete(id);
     return res.status(200).json({
                status: true,
                messages: 'Berhasil Menghapus Data'
            });
    })

module.exports = router;