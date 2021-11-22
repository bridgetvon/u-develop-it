const express = require('express');
const PORT = process.envPORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());























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

