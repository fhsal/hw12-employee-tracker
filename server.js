// Require Dependencies
// const express = require("express");

// // Initialize express app and using process.env port so that Heroku can assign port or use 3000 (locally)

// const app = express();
// const PORT = process.env.PORT || 3300;

// // setting up express

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));


const inquirer = require("inquirer");
const mysql = require("mysql");
// const cTable = require("console.table");
// const db = require(".");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  selectAction();
  //  connection.end();//
});

//What the user will first see once logged into node
function selectAction() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View departments",
        "View employees",
        "View roles",
        "Add employee",
        "Add department",
        "Add role",
        // "Update employee role",
        // "Remove an employee",
        // "View employees by Manager",
        // "View a department budget",
        // "Delete a role",
        // "Delete a department",
      ],
      message: "Welcome to the Employee Tracker!  Choose an action",
      name: "action"
    })
    .then(function(result) {
      console.log("You entered: " + result.action);

      switch (result.action) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        // default:
          // finished();
      }
    });
}

//viewing functions - results displayed to user in table format using console.table

function viewDepartments() {
    let query = "SELECT * FROM dept";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      selectAction();
    });
  }
  
function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      selectAction();
    });
  }
  
  function viewEmployees() {
    let query = "SELECT * FROM emp";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      selectAction();
    });
  }


  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Employee's last name?",
          name: "lastName"
        },
        {
          type: "input",
          message: "Employee's first name?",
          name: "firstName"
        },
        {
          type: "input",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function(answer) {
        connection.query("INSERT INTO emp (last_name, first_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.lastName, answer.firstName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          // let entry = "select * from emp WHERE last_name = lastName AND firstName = firstName";
          console.table(res);
          // console.log(entry);
          console.log("Here is the updated employee listing");   
          // viewSingleEmployee(answer.lastName, answer.firstName)        
          viewEmployees();        ;      
        });
      });
    }


    function addRole() {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter name of the new role",
            name: "roleName"
          },
          {
            type: "input",
            message: "Enter the salary for this role",
            name: "roleComp"
          },
          {
            type: "input",
            message: "Enter the department id number for this role",
            name: "deptID"
          }
        ])
        .then(function(answer) {
          connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleComp, answer.deptID], function(err, res) {
            if (err) throw err;
            viewRoles();
          });
        });
    }


    function addDepartment() {
      inquirer.prompt({
          type: "input",
          message: "Enter name of the new department?",
          name: "deptName"
      }).then(function(answer){
          connection.query("INSERT INTO dept (deptName) VALUES (?)", [answer.deptName] , function(err, res) {
              if (err) throw err;
              viewDepartments();
         })
      })
  }



