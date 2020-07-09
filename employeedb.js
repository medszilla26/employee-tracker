const mysql = require("mysql2");
const { start } = require("repl");
var inquirer = require("inquirer");
const { fuchsia } = require("color-name");

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
  connection.query("SELECT  ");
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
          type: "list",
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
          choices: function () {
            var managerArray = [];
            for (var i = 0; i < results.length; i++) {
              managerArray.push(results[i].first_name + results[i].last_name);
            }
            return managerArray;
          },
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee_table VALUES ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            title: answer.employeeRole,
            manager: answer.employeeManager,
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

function removeEmployee() {}

function updateRole() {
  //   console.log("\nWhich employee's title do you like to update?");
  connection.query("SELECT * FROM employee_table", function (err, res) {
    if (err) throw err;
  });
  inquirer.prompt({
    name: "updateRole",
    type: "list",
    message: "Which employee's title do you like to update?",
  });
}

function updateManager() {
  connection.query("SELECT * FROM employee_table", function (err, res) {
    if (err) throw err;
  });
  inquirer.prompt({
    name: "updateManager",
    type: "list",
    message: "Which employee's manager do you want to update?",
    choices: function () {
      var testArray = [];
      for (var i = 0; i < results.length; i++) {
        testArray.push(results[i].first_name + results[i].last_name);
      }
      return startPrompt();
    },
  });
}

function viewAllRoles() {
  console.log("\n TITLE & DEPARTMENTS \n");
  connection.query(
    "SELECT department, title, salary FROM employee_role_table RIGHT JOIN department_table ON employee_role_table.role_ID = department_table.dept_ID;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
