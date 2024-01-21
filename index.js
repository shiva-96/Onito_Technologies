const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const genTambolaTic = require("./routes/generateTickets");
const fetchTambolaTic = require("./routes/fetchTambolaTickets");

const app = express();
const port = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'tambola_db'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.use(bodyParser.json());
app.use('/oninto',genTambolaTic)
app.use('/oninto',fetchTambolaTic)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
