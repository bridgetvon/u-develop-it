const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3007;
const app = express();
const inputCheck = require('./utils/inputCheck');

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
app.get('/api/candidates', (req, res) =>{
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id`;

db.query(sql, (err, rows) => {
   if (err) {
       res.status(500).json({ error: err.message });
       return;
   }
   res.json({
       message: 'success', 
       data: rows
   });
  });
});

//get a single candidate by id 
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id= parties.id
                WHERE candidates.id=?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success', 
            data: row
        });
    });
});
//Delete a candidate 
// ? denotes a placeholder -> makes this a prepared statement 
//a prepared statement can execute the same SQL statements repeatedly using different values in place of the place holder 
//an aditional param argument follows the prepared statement provides values to use in place 
//of the prepared statments placeholders
//this is the same as delete from candidates where id=1
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'deleted',
                changes: result.affectedRows, 
                id: req.params.id
            });

        }
    });
});
//Creat a candidate 
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name',  'last_name', 'indsutry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }


const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
 });
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

