DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;


USE employee_db;

CREATE TABLE department_table (
 dept_ID INT NOT NULL AUTO_INCREMENT,
 department VARCHAR(30),
 PRIMARY KEY (dept_ID)
 );
 

 CREATE TABLE employee_role_table (
  role_ID INT NOT NULL AUTO_INCREMENT,
  dept_ID INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  PRIMARY KEY (role_ID)
  );
 
 CREATE TABLE employee_table (
    employee_ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_ID INT,
    manager INT NULL,
    PRIMARY KEY (employee_ID)
    );














