const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('config');
// const dbConfig = config.get('Mysql.dbConfig');
const dbConfig = require('../config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

app.get('/', function (req, res) {
  pool.query('SELECT COUNT(*) AS count FROM users', function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log('The number of sign-ups stands at: ', results[0]);
    let count = results[0].count;
    res.render("home", { count: count });
  });

});



// try
app.post('/signup', (req, res) => {
  let data = {
    email: req.body.email,
    target: req.body.target,
    native: req.body.native,
    level: req.body.level
  };

  // let submission = `INSERT INTO users(email, target, native, level) VALUES (?, ?, ?, ?)`;

  pool.query('INSERT INTO users SET ?', data, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');

  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});

module.exports = pool;