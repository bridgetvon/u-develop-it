const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3007;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

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

















//query method runs the sql query and executes the callback 
//the callback captures the response from the query in two variables 
//the err and rows which is the database query response 
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// test route to confirm express.js connection 
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

//default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});




app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

