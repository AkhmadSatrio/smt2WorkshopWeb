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
  res.render('auth/login', {
    returnTo: req.query.returnTo || ''
  })
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
  let { email, password, returnTo } = req.body;
  const redirectToLogin = (message) => {
    req.flash('error', message);
    const target = returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : '/login';
    res.redirect(target);
  };

  try {
    let Data = await model_users.Login(email);
    if (Data) {
      let enkripsi = Data.password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data.id_users;
        req.flash('success', 'Berhasil Login');
        const destination = returnTo && returnTo !== '' ? returnTo : '/users';
        return res.redirect(destination);
      } else {
        return redirectToLogin('Password Salah');
      }
    } else {
      return redirectToLogin('Email Tidak Ditemukan');
    }
  } catch (error) {
    console.error(error);
    return redirectToLogin('Terjadi kesalahan pada fungsi');
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
