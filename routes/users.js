var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended : false }));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '016754',
  port     : 3306,
  database : 'mydb'
});

connection.connect();

router.use('/', function(req, res, next) {
	connection.query('SELECT * from user', function(err, rows, fields) {
		  if (!err){
			res.send(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
});

module.exports = router;
