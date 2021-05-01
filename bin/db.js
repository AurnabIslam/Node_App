'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'todo'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;