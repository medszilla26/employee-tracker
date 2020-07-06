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
  console.log("\n WELCOME TO\n EMPLOYEE MANAGER" + "\n");
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          employeeView();
          break;

        case "View All Employees by Manager":
          viewByManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Update Employee Manager":
          updateManager();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "EXIT":
          connection.end();
          break;
      }
    });
}

function employeeView() {
  console.log("\n CURRENT EMPLOYEE ROSTER\n");
  connection.query("SELECT * FROM employee_table", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function viewByManager() {
  console.log("Select Manager to view employees\n");
  connection.query("SELECT ");
}

function addEmployee() {
  connection.query("SELECT * FROM employee_role_table", function (
    err,
    results
  ) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "employeeRole",
          type: "rawlist",
          message: "What is the employee's role?",
          choices: function () {
            var roleArray = [];
            for (var i = 0; i < results.length; i++) {
              roleArray.push(results[i].title);
            }
            return roleArray;
          },
        },
        {
          name: "employeeManager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: "",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee_table SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_ID: answer.employeeRole,
            manager_ID: answer.employeeManager,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added successfully!");
            startPrompt();
          }
        );
      });
  });
}
function removeEmployee() {
  console.log("\nWhich employee would you like to remove?\n");
  connection.query("DELETE FROM employee_table WHERE ?");
}

function updateRole() {
  console.log("\nWhich employee's title do you like to update?");
}

function updateManager() {
  console.log("\nWhich employee's manager do you want to update?");
}

function viewAllRoles() {
  console.log("\n DEPARTMENT LIST\n");
  connection.query("SELECT * FROM department_table", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}
