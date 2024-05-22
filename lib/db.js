const mysql = require('mysql2')
const fs = require('fs')
require('dotenv').config()
const inquirer = require('inquirer')
//const { exit } = process



const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.user,
    password: process.env.db_password,
    database: process.env.db_name
})
console.log('Connected to MySQL database')

//displays message with all choices 
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
    ])
    //depending on choice run function
    switch (choice) {
        case "View all departments":
            viewAllDepartments()
            break;

        case "View all roles":
            viewAllRoles()
            break;
        case "View all employees":
            viewAllEmployees()
            break;
        case "Add a department":
            addDepartment()
            break;
        case "Add a role":
            addRole()
            break;
        case "Add an employee":
            addEmployee()
            break;
        case "Exit":
            process.exit()
            break;


    }



}
welcomeMessage()

async function viewAllDepartments() {
    try {
        connection.query('SELECT * FROM department', (err, rows) => {
            if (err) {
                console.error("couldnt reach database: ", err)
            }
            console.table(rows);
            welcomeMessage()
        });

    } catch (error) {
        console.error('Error viewing departments:', error);
        welcomeMessage()
    }

}


async function viewAllRoles() {
    try {
        connection.query('SELECT * FROM role', (err, rows) => {
            if (err) {
                console.error("couldnt reach database: ", err)
            }
            console.table(rows);
            welcomeMessage()
        });

    } catch (error) {
        console.error('Error viewing roles:', error);
        welcomeMessage()
    }
}
async function viewAllEmployees() {
    try {
        connection.query('SELECT * FROM employee', (err, rows) => {
            if (err) {
                console.error("couldnt reach database: ", err)
            }
            console.table(rows);
            welcomeMessage()
        });

    } catch (error) {
        console.error('Error viewing employees:', error);
        welcomeMessage()
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
            const sql = `INSERT INTO department (name)
    VALUES (?)`;
            const params = [department.department];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.error("CANT WRITE TO DATABASE: ", err)
                } else {
                    console.log("data successfully added: ", result)
                }
                viewAllDepartments()

            })
        })


    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}
async function addRole() {
    try {
        inquirer.prompt([
            {
                type: "input",
                name: "role",
                message: "enter a role name",
            }
        ]).then((role) => {
            const sql = `INSERT INTO role (name)
    VALUES (?)`;
            const params = [role.role];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.error("CANT WRITE TO DATABASE: ", err)
                } else {
                    console.log("data successfully added: ", result)
                }
                viewAllRoles()

            })
        })


    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}
async function addEmployee() {
    try {
        inquirer.prompt([
            {
                type: "input",
                name: "employee",
                message: "enter an employee name",
            }
        ]).then((employee) => {
            const sql = `INSERT INTO employee (name)
    VALUES (?)`;
            const params = [employee.employee];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.error("CANT WRITE TO DATABASE: ", err)
                } else {
                    console.log("data successfully added: ", result)
                }
                viewAllDepartments()

            })
        })


    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}

