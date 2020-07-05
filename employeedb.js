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
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
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
      }
    });
}
console.log("\n WELCOME TO\n EMPLOYEE MANAGER");
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
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Software Engineer",
        ],
      },
      {
        name: "employeeManager",
        type: "list",
        message: "Who is the employees manager?",
        choices: [],
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

  // function removeEmployee()

  // function updateRole()

  // function updateManager()
}
function viewAllRoles() {
  console.log("\n DEPARTMENT LIST\n");
  connection.query("SELECT * FROM department_table", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}
