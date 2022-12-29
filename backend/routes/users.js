var express = require('express');
const { saveImage } = require('../controller/userprofileController');
const upload = require('../multer');
var router = express.Router();

/* GET users listing. */
router.post('/',upload.single('image'),(req, res) => {
 console.log(req.file.filename);
  console.log('kdk' + req.body.id);
  const url = req.protocol + '://' + req.get('host')
  const Img = url + '/' + req.file.filename
  console.log('///////////////////////////////////////////////////////');
  
  
  let setItem = {
    img: Img,
    id:req.body.id
  }
  try {
    saveImage(setItem).then((data) => {
      res.json(data.img)
   })
  } catch (err) {
    res.sendStatus(400)
 }
  
})

module.exports = router;
