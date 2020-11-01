### Schema

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE dept
(
	id int NOT NULL AUTO_INCREMENT,
	deptName varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
	salary decimal NOT NULL,
	department_id int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE emp
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	manager_id int,
	PRIMARY KEY (id)
);
