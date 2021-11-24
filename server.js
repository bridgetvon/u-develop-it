const express = require('express');
const PORT = process.env.PORT || 3007;
const app = express();
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/api', apiRoutes);





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




// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

