INSERT INTO department (name)
VALUES ("Information Technology"), ("Finance"), ("Sales"), ("Marketing"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUE ("engineer", 50000.00, 1), ("accountant", 40000, 2), ("manager", 62500, 5), ("recruiter", 35500, 5), ("analyst", 35650, 4), ("account executive", 55000, 3);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUE ("James", "John", 1, 2), ("Smith", "Susan", 3, null), ("Giovanni", "Vincent", 4, 1), ("O'Keefe", "Sarah", 5, 4);