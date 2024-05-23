const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.user,
    password: process.env.db_password,
    database: process.env.db_name
});
console.log('Connected to MySQL database');

async function welcomeMessage() {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "what would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case "View all departments":
            viewAllDepartments();
            break;

        case "View all roles":
            viewAllRoles();
            break;

        case "View all employees":
            viewAllEmployees();
            break;

        case "Add a department":
            addDepartment();
            break;

        case "Add a role":
            addRole();
            break;

        case "Add an employee":
            addEmployee();
            break;

        case "Update an employee role":
            updateEmployee();
            break;    

        case "Exit":
            process.exit();
            break;
    }
}

welcomeMessage();

async function viewAllDepartments() {
    try {
        connection.query('SELECT * FROM department', (err, rows) => {
            if (err) {
                console.error("couldnt reach database: ", err);
            }
            console.table(rows);
            welcomeMessage();
        });

    } catch (error) {
        console.error('Error viewing departments:', error);
        welcomeMessage();
    }
}

async function viewAllRoles() {
    try {
        connection.query('SELECT * FROM role', (err, rows) => {
            if (err) {
                console.error("couldnt reach database: ", err);
            }
            console.table(rows);
            welcomeMessage();
        });

    } catch (error) {
        console.error('Error viewing roles:', error);
        welcomeMessage();
    }
}

async function viewAllEmployees() {
    try {
        connection.query('SELECT * FROM employee', (err, rows) => {
            if (err) {
                console.error("couldn't reach database: ", err);
            } else {
                console.table(rows);
            }
            welcomeMessage();
        });
    } catch (error) {
        console.error('Error viewing employees:', error);
        welcomeMessage();
    }
}


async function addDepartment() {
    try {
        inquirer.prompt([
            {
                type: "input",
                name: "department",
                message: "enter a department name",
            }
        ]).then((department) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [department.department];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.error("CANT WRITE TO DATABASE: ", err);
                } else {
                    console.log("data successfully added: ", result);
                }
                viewAllDepartments();
            });
        });
    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}

async function addRole() {
    try {
        const role = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter a role title",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter a role salary",
            },
            {
                type: "input",
                name: "department_id",
                message: "Enter the department ID",
            }
        ]);

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [role.title, role.salary, role.department_id];
        connection.query(sql, params, (err, result) => {
            if (err) {
                console.error("CANT WRITE TO DATABASE: ", err);
            } else {
                console.log("data successfully added: ", result);
            }
            viewAllRoles();
        });
    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}

async function addEmployee() {
    try {
        const employee = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the employee's first name",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the employee's last name",
            },
            {
                type: "input",
                name: "role_id",
                message: "Enter the role ID",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Enter the manager ID",
            }
        ]);

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [employee.first_name, employee.last_name, employee.role_id, employee.manager_id];
        connection.query(sql, params, (err, result) => {
            if (err) {
                console.error("CANT WRITE TO DATABASE: ", err);
            } else {
                console.log("data successfully added: ", result);
            }
            viewAllDepartments();
        });
    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}
async function updateEmployee(){
    
}
