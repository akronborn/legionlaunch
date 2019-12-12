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

  // Use connection
  //Console.log all users
  connection.query('SELECT * FROM users', function(error, results, fields) {
    console.log(results);

    //GET count of all users
    app.get('/', (req, res) => {
      connection.query('SELECT COUNT (*) as Legionaries FROM users', function(
        error,
        results,
        fields
      ) {
        res.send(results);

        app.post('/register', (req, res) => {
          let legionary = {
            email: req.body.email,
            target: req.body.target,
            native: req.body.native,
            level: req.body.level
          };
          connection.query('INSERT INTO users SET ?', legionary, function(
            error,
            result
          ) {
            if (err) throw err;
            res.redirect('/');
          });
        });

        connection.release();

        if (error) throw error;
      });
    });

    // connection.release();

    // if (error) throw error;
  });
});

//user_id, email, game, created_at, level

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});
