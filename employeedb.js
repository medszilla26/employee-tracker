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
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "View All Roles",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          employeeView();
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
  connection.query(
    "SELECT e.employee_ID as employee_ID, e.first_name as first_name, e.last_name as last_name, d.department as department, r.title as title, r.salary as salary FROM employee_table e INNER JOIN employee_role_table r ON e.role_ID = r.role_ID INNER JOIN department_table d ON r.dept_ID = d.dept_ID",

    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
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
        // {
        //   name: "employeeManager",
        //   type: "list",
        //   message: "Who is the employee's manager?",
        //   choices: function () {
        //     var managerArray = [];
        //     for (var i = 0; i < results.length; i++) {
        //       managerArray.push(results[i].first_name + results[i].last_name);
        //     }
        //     return managerArray;
        //   },
        // },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee_role_table SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            title: answer.employeeRole,
            // manager: answer.employeeManager,
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

// function updateRole() {
// console.log("\nWhich employee's title do you like to update?");
//   connection.query("SELECT ", function (err, res) {
//     if (err) throw err;
//   });
//   inquirer.prompt({
//     name: "updateRole",
//     type: "list",
//     message: "Which employee's title do you like to update?",
//   });
// }

function viewAllRoles() {
  console.log("\n TITLE & DEPARTMENTS \n");
  connection.query(
    "SELECT d.department as department, r.title as title, r.salary as salary FROM employee_role_table r LEFT JOIN department_table d ON r.dept_ID = d.dept_ID",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
