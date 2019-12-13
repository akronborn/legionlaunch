const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('config');
const dbConfig = config.get('Mysql.dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const pool = mysql.createPool(dbConfig);

pool.query('SELECT COUNT (*) as Total FROM users', function(
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log('The number of sign-ups stands at: ', results[0]);
});

app.get('/', (req, res) => {
  pool.query('SELECT target, native, level FROM users', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});
