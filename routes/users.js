var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended : false }));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'arstamptour.ctxzh32fpzmp.ap-northeast-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'rla016754',
  port     : 3306,
  database : 'mydb'
});

connection.connect();

router.use('/homeLoading', function(req, res, next) {
	connection.query('SELECT * from LOCAL_GU', function(err, rows, fields) {
		  if (!err){
			res.send(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
	
	connection.query('SELECT * from ATTRACION', function(err, rows, fields) {
		  if (!err){
			res.send(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
});

router.use('/insert', function(req, res, next) {
	var into = req.body.into;
	var values = req.body.values;
	connection.query('INSERT into '+into+' values('+values+')', function(err, rows, fields) {
		  if (!err){
			res.send("success");
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
	
});

router.use('', function(req, res, next) {

	var select=req.body.select;
	var from = req.body.from;
	var where = req.body.where;
	
	
	if(select==null)
		select = "*";
	
	if(from==null)
		res.send("from is empty!!")
	
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
		connection.query('SELECT '+select+' from '+from +' where '+where, function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
});


module.exports = router;
