DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE Department (
    ID INT NOT NULL AUTO_INCREMENT,
    Department Name VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE Employee Role (
    PRIMARY KEY (ID),
    Title VARCHAR(30),
    Salary DECIMAL(10,2),

);

CREATE TABLE Employee (
    ID PRIMARY KEY,
    First_Name VARCHAR(30),
    Last_Name VARCHAR(30),
    Role_ID INT  
    Manager_ID


  

);












