var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '016754',
  port     : 3306,
  database : 'mydb'
});

connection.connect();


/* GET home page. */
router.post('/', function(req, res, next) {
	connection.query('SELECT * from user', function(err, rows, fields) {
		  if (!err){
		    res.status(200).json(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
});

router.post('/insert', function(req, res, next) {
	connection.query('INSERT INTO user VALUES()', function(err, rows, fields) {
		  if (!err){
		    res.status(200).json(rows);
		  }
		  else
		    console.log('Error while performing Query.', err);
		});
});

module.exports = router;
