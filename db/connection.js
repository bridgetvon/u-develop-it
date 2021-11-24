const mysql = require('mysql2');

//connect to database 
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        //sql username
        user: 'root',
        //sql password 
        password: 'bridgetcodes',
        database: 'election'
    },

);

db.connect(function (err) {
    if (err) throw err;
    console.log(err);
});







module.exports = db;