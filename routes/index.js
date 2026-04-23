var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const model_users = require('../model/model_users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'Tembok Ratapan Solo',
      wakil: 'Gibran'
     });
});

router.get('/informasi', function(req, res, next) {
  res.render('informasi', {judul : 'Halo'});
});

router.get('/login', function(req, res, next) {
  res.render('auth/login')
});

router.get('/register', function(req, res, next) {
  res.render('auth/register')
});

router.post('/saveusers', async (req, res, next) => {
  let {email, password} = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let Data = {
    email,
    password: enkripsi
  };
  await model_users.Store(Data);
  req.flash('success', 'Registrasi Users Berhasil');
  res.redirect('/login');
}); 

router.post('/log', async (req, res, next) => {
  let {email, password} = req.body;
  try {
    let Data = await model_users.Login(email);
    if (Data.length > 0) {
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data[0].id_users;
        req.flash('success', 'Berhasil Login');
        res.redirect('/users');
      } else {
        req.flash('error', 'Password Salah');
        res.redirect('/login');
      }
    } else {
      req.flash('error', 'Email Tidak Ditemukan');
      res.redirect('/login');
    }
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  })
  
});

module.exports = router;
