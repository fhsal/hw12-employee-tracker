# Unit 12 MySQL Homework: Employee Tracker

Link to a recording of the working application:   https://drive.google.com/file/d/1ack10yqcit2XtWt21D5swQxLVztbc0Aj/view


## Summary

This assignment involved building a node.js command line application to manage employee information.  The instructions specified creating three SQL tables for employee, department and role to allow a user to perform the functions of:

 (a) viewing employees/departments/roles 
 (b) adding employees/departments/roles
 (c) updating the role of a specified employee 
 
 and (optionally) supporting 
 
 (d) viewing of a department cumulative salary budget
 (e) viewing a team by manager
 (e) removing an employee
 
plus several delete functions which I did not attempt as doing so would require ensuring that subsequent updates be made across all the tables in the event that important keys for department, role and employee so that things didn't break after the deletion. 

The application uses inquirer for prompts and mySQL for storing information in the three tables. 

The functions summarized above are all contained within server.js.  The flow of the app is that all of the 'view' functions display and then call the inquirer 'selectActions' function to display user choices;   Each of the 'change' functions perform their specified task, then call an associated view function to display the result which in turn restarts the cycle. 

Several of the view and update functions involve joining the table information so that descriptive information such as department name can be brought together with information on roles and employees, which are kept in separate tables. 







****************************************  



## Instructions

Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

![Employee Tracker](Assets/employee-tracker.gif)

