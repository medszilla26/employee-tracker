ALTER TABLE employee_role_table 
    ADD FOREIGN KEY (dept_ID) 
    REFERENCES department_table(dept_ID);

ALTER TABLE employee_table 
    ADD FOREIGN KEY (role_ID)
    REFERENCES employee_role_table(role_ID);

ALTER TABLE employee_table
    ADD FOREIGN KEY (manager_ID)
    REFERENCES employee_role_table(title_ID)