var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var querystring = require('querystring');
var url = require('url');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '2531',
  port     : 3306,
  database : 'mydb',
  charset:'utf8'
});

connection.connect();


/* post attraction. */
router.post('/attraction', function(req, res, next) {
	var where = req.body.where;
	
	if(where == null){
		connection.query('SELECT * from attraction', function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
	else{
		connection.query('SELECT attraction.Name,attraction.info,attraction.Address,attraction.Image,attraction.Latitude,attraction.Longitude,local_gu.Name as guName,local_si.name as siName from attraction left JOIN local_gu ON attraction.LOCAL_GU = local_gu.Gu_Id left JOIN local_si ON local_gu.Gu_Id = local_si.SI_Id where attraction.Att_Id= '+where+';', function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
});

router.post('/login', function(req, res, next) {
	var select=req.body.select;
	var from = req.body.from;
	var where = req.body.where;
	
	if(select==null)
		select = "*";
	
	if(from==null)
		res.send("from is empty!!")
	
		console.log('SELECT '+select+' from '+from +" where "+where);
	if(where == null){
		connection.query('SELECT '+select+' from '+from, function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
	else{
		console.log('SELECT '+select+' from '+from +" left JOIN stamp ON user.User_Id = stamp.USER where "+where);
		connection.query('SELECT '+select+' from '+from +" left JOIN stamp ON user.User_Id = stamp.USER where "+where, function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
});


module.exports = router;