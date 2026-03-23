const mysql =require('mysql');
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "87560736",
	database: "demo"
});

db.connect();

module.exports = db;