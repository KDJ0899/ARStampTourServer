var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var querystring = require('querystring');
var url = require('url');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'arstamptour.ctxzh32fpzmp.ap-northeast-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'rla016754',
  port     : 3306,
  database : 'mydb',
  charset:'utf8'
});

connection.connect();


/* post attraction. */
router.post('/attraction', function(req, res, next) {
	var where = req.body.where;
	
	if(where == null){
		connection.query('SELECT * from ATTRACTION', function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
	else{
		connection.query('SELECT ATTRACTION.Name,ATTRACTION.info,ATTRACTION.Address,ATTRACTION.Image,ATTRACTION.Latitude,ATTRACTION.Longitude,LOCAL_GU.Name as guName,LOCAL_SI.name as siName from ATTRACTION left JOIN LOCAL_GU ON ATTRACTION.LOCAL_GU = LOCAL_GU.Gu_Id left JOIN LOCAL_SI ON LOCAL_GU.Gu_Id = LOCAL_SI.SI_Id where ATTRACTION.Att_Id='+where+';', function(err, rows, fields) {
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