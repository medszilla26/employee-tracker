const mysql = require("mysql2");
const { start } = require("repl");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Honda126!",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();

  //start();
});
// function start() {
//   inquirer.prompt({
//     name: "options",
//     type: "list",
//     message: "What would you like to do?",
//     choices: [
//       "View All Employees", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles",
//     ],
//   });
//   .then(function (answer) {
//       if (answer.options === "View All Employees")
//   })
// }
