USE employee_db;

INSERT INTO department_table (department)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");



INSERT INTO employee_role_table (dept_ID, title, salary)
VALUES 
(1, "Sales Lead", 100000.00),
(1, "Salesperson", 80000.00), 
(2, "Lead Engineer", 150000.00), 
(2, "Software Engineer", 120000.00), 
(3, "Accountant", 125000.00), 
(4, "Legal Team Lead", 250000.00),
(4, "Lawyer", 190000.00);

INSERT INTO employee_table (first_name, last_name, role_ID, manager)
VALUES 
("Pablo", "Hernandez", 4),
("Jose", "Medrano", 3),
("Mary", "Poppins", 6),
("Juanita", "Banks",5);



SELECT * FROM department_table;
SELECT * FROM employee_role_table;
SELECT * FROM employee_table;

