var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var querystring = require('querystring');
var url = require('url');

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

router.get('/', function(req, res, next) {
	
	var parsedUrl = url.parse(req.url);
    // 5. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
	var query = parsedUrl.query;
    var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    console.log(req.query);
	if(query == null){
		connection.query('SELECT * from local_gu', function(err, rows, fields) {
		  if (!err){
			res.send(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		})
	}
	else{
		connection.query('SELECT * from local_gu where '+query, function(err, rows, fields) {
		  if (!err){
			res.send(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		})
	}
});


module.exports = router;
