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
router.use('/attraction', function(req, res, next) {
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
		connection.query('SELECT ATTRACTION.Name,ATTRACTION.info,ATTRACTION.Address,ATTRACTION.Image,ATTRACTION.Latitude,ATTRACTION.Longitude,LOCAL_GU.Name as guName,LOCAL_SI.name as siName from ATTRACTION left JOIN LOCAL_GU ON ATTRACTION.LOCAL_GU = LOCAL_GU.Gu_Id left JOIN LOCAL_SI ON LOCAL_GU.LOCAL_SI = LOCAL_SI.SI_Id where ATTRACTION.Att_Id = '+where+';', function(err, rows, fields) {
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
		console.log('SELECT '+select+' from '+from +" left JOIN STAMP ON USER.User_Id = STAMP.USER where "+where);
		connection.query('SELECT '+select+' from '+from +" left JOIN STAMP ON USER.User_Id = STAMP.USER where "+where, function(err, rows, fields) {
			  if (!err){
				res.send(rows);
			  }
			  else
			    console.log('Error while performing Query.', err);
			});
	}
});

router.use('/register', function(req, res, next) {
	var table = req.body.table;
	var data = req.body.data;
	var si = req.body.si;
	var gu = req.body.gu;
	var si_id;
	var gu_id;
	var id = req.body.id;
	
	connection.query('select count(*) as cnt from USER where ID="'+id+'";', function(err, rows, fields) {
		console.log('sql = select * from user where ID="'+id+'";');
		console.log('cnt = '+rows[0].cnt);
		if(rows[0].cnt==0){
			console.log('아이디 중복없음');
			var sql1 = 'select SI_Id from LOCAL_SI where name="'+si+'";';
			var sql2 = 'select Gu_Id from LOCAL_GU where Name="'+gu+'";';
			
			connection.query(sql1, function(err, rows, fields) {
					si_id = rows[0].SI_Id;
				});
			connection.query(sql2, function(err, rows, fields) {
					gu_id = rows[0].Gu_Id;
					
					if(table==null){
						res.send("table is empty!!")
					}else{
					
						connection.query('insert into '+table+'(ID,Password,Name,Birthday,Phone_No,Sex,LOCAL_SI,LOCAL_GU) values'+data+'"'+si_id+'","'+gu_id+'");', function(err, rows, fields) {
							  if (!err){
								res.send('success!');
							  }
							  else
								res.send('denial',err);
							});
					}
				});
		}else{
			console.log('아이디 중복됨');
			res.send('reRegister');
		}
		});
});

module.exports = router;