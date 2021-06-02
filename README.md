Launch page for Tri-Legion Study Platform: Coming soon

The Launch page allows users to sign up to receive an email when the site is launched and displays a running tally of the number of users who have signed up thus far. 

To recreate:
Clone repository
npm install
Run Mysql query to setup database and USERS table
create default.json file to connect to database
npm run start/npm run dev

MySQL queries:
CREATE DATABASE *database name*;
USE *database name*;
CREATE TABLE `*datbasename*`.`users` (
  `user_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `target` VARCHAR(25) NOT NULL,
  `native` VARCHAR(25) NOT NULL,
  `email` VARCHAR(225) NOT NULL,
  `level` VARCHAR (25) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);

  Content of default.json:
  {
  "Mysql": {
    "dbConfig": {
      "host": "host name (defaut is 'localhost')",
      "user": "user (default is "root")",
      "password": "*password*",
      "database": "*database name*",
      "port": 3306,
      "connectionLimit": 10
    }
  }
}

A PDF image of the site is provided in the Public folder.

The Tri-Legion launch page was built with Node, Express, EJS, and MySQL. 

CSS files are normally kept in the public folder, however, due to an internal issue, css has been included in the ejs file. 

Creator: Clotia Johari



