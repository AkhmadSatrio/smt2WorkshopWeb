var express = require('express');
var router = express.Router();

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

module.exports = router;
