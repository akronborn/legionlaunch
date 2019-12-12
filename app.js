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

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query('SELECT COUNT(*) as Legionaries FROM users', function(
    error,
    results,
    fields
  ) {
    console.log(results);

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});

//user_id, email, game, created_at

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});
