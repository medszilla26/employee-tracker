var mysql = require("mysql2");
var inquirer = require(inquirer);

var connection = mysql.createConnection({
  host: "localhost",
  port: 8080,
  user: "root",
  password: "",
  database: "employee_db",
});
