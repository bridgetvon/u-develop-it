const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//query method runs the sql query and executes the callback 
//the callback captures the response from the query in two variables 
//the err and rows which is the database query response 
router.get('/candidates', (req, res) =>{
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
router.get('/candidate/:id', (req, res) => {
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

//Create a candidate 
router.post('/candidate', ({ body }, res) => {
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

//update a candidates party 
router.put('/candidate/:id', (req, res) => {
    //force any put request to include a party_id property
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE candidates SET party_id = ?
                WHERE ID = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            //check if record was found 
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success', 
                data: req.body, 
                changes: result.affectedRows
            });
        }
    });
});

//Delete a candidate 
// ? denotes a placeholder -> makes this a prepared statement 
//a prepared statement can execute the same SQL statements repeatedly using different values in place of the place holder 
//an aditional param argument follows the prepared statement provides values to use in place 
//of the prepared statments placeholders
//this is the same as delete from candidates where id=1
router.delete('/candidate/:id', (req, res) => {
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

module.exports = router;