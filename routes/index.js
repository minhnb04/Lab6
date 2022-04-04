var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + file.originalname)
  }
})

var uploadArray = multer({
  storage: storage,limits:{fieldSize: 2 * 1024}
}).array('myFiles',5);

//---------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//---------------------------------------------------------------

router.post('/saveArray',function (req,res){

  uploadArray(req,res,function (err){
    if (err){
      res.render('index', { title: err.message});
    }else {
      res.render('index', { title: 'Upload thành công kiểm tra thư mục uploads!' });
    }
  });
});


module.exports = router;
