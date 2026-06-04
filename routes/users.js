var express = require('express');
const model_users = require('../model/model_users');
var router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async function (req, res, next) {
 try {
  let id = req.session.userId;
  let Data = await model_users.getId(id);
  if (Data.length > 0) {
    res.render('users/index', {
      email : Data[0].email,
      judul : 'User Page'
    });
  } else {
    req.flash('error', 'Session berakhir');
    res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
  }
 } catch (error) {
  req.flash('error', 'Butuh akses Login');
  res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
 }
});

router.get('/changepd', async function (req, res, next) {
  let id = req.session.userId;
  let Data = model_users.getId(id);
  res.render('users/password', {
    email : Data[0].email
  });
});

router.get('/update', async function (req, res, next) {
  try {
    let id = req.session.userId;
    let {password} = req.body;
    let enkripsi = await bcrypt.hash(password, 10);
    let Data = {
      password : enkripsi
    }
    await model_users.Update(id, Data);
    req.flash('success', 'Berhasil Memperbarui Password');
    res.redirect('/users');
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/users');
  }
})

module.exports = router;
