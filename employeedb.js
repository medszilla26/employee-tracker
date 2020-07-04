var mysql = require("mysql2");
const { start } = require("repl");
var inquirer = require(inquirer);

var connection = mysql.createConnection({
  host: "localhost",
  port: 8080,
  user: "root",
  password: "",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer.prompt({
    name: "options",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees, View All Employees by Manager, Add Employee, Remove Employee, Update Employee Role, Update Employee Manager, View All Roles",
    ],
  });
}
