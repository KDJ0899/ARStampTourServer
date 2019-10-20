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
router.use('/attraction', function(req, res, next) {
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

		
router.use('/login', function(req, res, next) {
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

router.use('/register', function(req, res, next) {
	var table=req.body.table;
	var values = req.body.values;
	
	
	if(table==null)
		res.send("table is empty!!")
	
	if(values==null)
		res.send("values is empty!!")
	
		console.log('insert into user(ID,Passowrd,Name,Birthday,Phone_No,Sex,LOCAL_SI,LOCAL_GU) values '+values, err);
		connection.query('insert into user(ID,Passowrd,Name,Birthday,Phone_No,Sex,LOCAL_SI,LOCAL_GU) values '+values, function(err, rows, fields) {
			  if (!err){
				res.send('success!');
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
});

//router.use('/checkId', function(req, res, next) {
//	console.log('CheckID start', err);
//	var where = req.body.where;
//	var idWhere = req.body.idWhere;
//	var siName = req.body.siName;
//	var guName = req.bodt.guName;
//	
//	console.log('SELECT * from user where '+where+';', err);
//	
//	connection.query('SELECT * from user where '+where+';', function(err, rows, fields) {
//		if (!err){
//			res.send(rows);
//		  }
//		  else
//		    console.log('Error while performing Query.', err);
//		
//		  if (err){
//			  console.log('Error while performing Query.', err);
//		  }
//		  
//		  if(rows[0].affectedRows <= 0){
//			  connection.query('select local_si.SI_Id as siId,local_gu.Gu_Id as guId from local_si left JOIN local_gu ON local_si.SI_Id = local_gu.LOCAL_SI where '+idWhere+';', function(err, rows, fields){
//				  if (!err){
//						res.send(rows);
//					  }
//					  else
//					    console.log('Error while performing Query.', err);
//			  });
//		  }
//		  else{
//			  res.send(rows); 
//		  }
//			  
//		  });
//});

module.exports = router;