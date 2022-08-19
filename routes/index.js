const express = require('express');
const { listen } = require('../app');
const router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('index', { title: 'Express' });
  fs.readdir("./files", function (err, files) {
    res.render("index", { files, data: "",filename:'' });
  });
});
router.get('/createFile', function (req, res) {
  fs.writeFile(`./files/${req.query.filename}`, "", function (err) {
    if (err) res.send(err);
    else res.redirect('/');
  });
});
router.get("/delete/:plc", function (req, res) {
  fs.unlink(`./files/${req.params.plc}`, function (err) {
    // if(err) res.send(err);
    res.redirect("/")
  })
})
router.get('/read/:plc', function (req, res) {
  fs.readFile(`./files/${req.params.plc}`, "utf8", function (err, data) {
    if (err) res.send(err)
    else {
      fs.readdir("./files", function (err, files) {
        res.render("index", { files, data, filename: req.params.plc })
      })
    }
  })
})

router.post('/save/:plc',function(req,res){
  fs.writeFile(`./files/${req.params.plc}`,req.body.filedata,function(err){
    if(err) res.send(err)
    else{
      res.redirect(`/read/${req.params.plc}`)
    }
  })
})




module.exports = router;
