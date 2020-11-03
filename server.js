// Require Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql");

// setting up database connection

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

//prompt user with actions using inquirer

function selectAction() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View departments",
        "View employees",
        "View roles",
        "View a team by manager",
        "Add employee",
        "Add department",
        "Add role",
        "Search for an employee",
        "View department salary budget",
        "Update employee role",
        "Remove an employee",
      ],
      message: "Welcome to the Employee Tracker!  Choose an action",
      name: "action"
    })
    .then(function(result) {
      console.log("You entered: " + result.action);
      switch (result.action) {
        case "View employees":
          viewEmployees();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View a team by manager":
          managerSearch();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Search for an employee":
          employeeSearch();
          break;
        case "View department salary budget":
          viewDeptBudget();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
      }
    });
}

//viewing functions - results displayed to user in table format using console.table

function viewDepartment() {
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
    let query = "SELECT  role.title, emp.role_id, role.department_id, emp.manager_id, emp.last_name, emp.first_name, emp.id FROM emp INNER JOIN role ON role.id=emp.role_id ORDER BY emp.role_id";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      selectAction();
    });
  }

function employeeSearch() {
  inquirer
    .prompt({
      name: "lastName",
      type: "input",
      message: "Enter last name of employee you would like to view"
    })
    .then(function(answer) {
      var query = "SELECT last_name, first_name, role_id, manager_id FROM emp WHERE ?";
      connection.query(query, { last_name: answer.lastName }, function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
      });
    });
}

function managerSearch() {
  inquirer
    .prompt({
      name: "managerID",
      type: "input",
      message: "Enter ID of Manager of team you would like to see"
    })
    .then(function(answer) {
      var query = "SELECT last_name, first_name, role_id FROM emp WHERE manager_id = ?";
      connection.query(query, [answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
      });
    });
}

// function to show department salary budget

function viewDeptBudget(){

    inquirer
    .prompt({
      name: "deptID",
      type: "input",
      message: "Enter the department number you would like to see the total salary budget for"
    })
    .then(function(answer) {
      
// query joins three tables:  role, emp and dept 

      var query = "SELECT role.department_id, dept.deptName, SUM(salary) FROM emp INNER JOIN role ON role.id=emp.role_id JOIN dept ON role.department_id=dept.id WHERE ?";
      connection.query(query, { department_id: answer.deptID }, function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
      });
    });
  }

// functions to add employee, role and dept 

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
          // console.table(res);
          console.log("Here is the updated employee listing");         
          viewEmployees();       
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
          message: "Enter name of the new department",
          name: "deptName"
      }).then(function(answer){
          connection.query("INSERT INTO dept (deptName) VALUES (?)", [answer.deptName] , function(err, res) {
              if (err) throw err;
              viewDepartment();
         })
      })
  }

// function to update an employee role

  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter id of employee you want to update",
          name: "empID"
        },
        {
          type: "input",
          message: "Enter new role ID for the employee",
          name: "newRole"
        }
      ])
      .then(function(answer) {
        connection.query('UPDATE emp SET role_id=? WHERE id= ?',[answer.newRole, answer.empID],function(err, res) {
          if (err) throw err;
          viewEmployees();
        });
      });
  }


  // function to remove an employee

  function removeEmployee() {
    inquirer.prompt({
        type: "input",
        message: "Enter ID of employee to remove",
        name: "empID"
    }).then(function(answer){
      // let value = [answer.empID];
        connection.query("DELETE FROM emp WHERE id = ?", [answer.empID], function(err, res) {
            if (err) throw err;
            viewEmployees();
       })
    })
}

// function to remove a department 

function removeDept() {
  inquirer.prompt({
      type: "input",
      message: "Enter ID of department to remove",
      name: "deptID"
  }).then(function(answer){
    // let value = [answer.empID];
      connection.query("DELETE FROM dept WHERE id = ?", [answer.deptID], function(err, res) {
          if (err) throw err;
          viewDepartment();
     })
  })
}

selectAction();
