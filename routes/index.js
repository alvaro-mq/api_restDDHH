var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    'hora': new Date(),
    'mensaje': 'Hola Mundo'
  });
});
router.get('/usuarios',function(req,res,next){
  var data = fs.readFileSync('datos/usuarios.json');
//  console.log("Synchronous read: " + data.toString());
  res.send(data);
});
router.get('/usuarios/:nick',function(req,res,next){
  var data = fs.readFileSync('datos/usuarios.json');
//  req.params.nick;
  var existe = true;
  var datos = data.toString();
  existe = datos.indexOf(req.params.nick) > 0 ? true:false;
  if(datos.indexOf(req.params.nick) < 0){
    existe = false;
    fs.writeFile('datos/usuarios.json',req.params.nick,function(err){
      if(err){
        return console.error(err);
      }
    });
  }
  res.send(existe);
});



module.exports = router;
