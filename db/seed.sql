-- Seed data for departments
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Finance');

-- Seed data for roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1); -- Engineering department
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 70000, 2); -- Marketing department
INSERT INTO role (title, salary, department_id) VALUES ('Financial Analyst', 75000, 3); -- Finance department

-- Seed data for employees
-- Seed data for employees\-- No manager
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 3, 1);  -- John Doe is the manager
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Davis', 3, 2);   -- Jane Smith is the manager
