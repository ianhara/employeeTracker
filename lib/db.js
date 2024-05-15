const mysql = require('mysql2/promise')
const fs = require('fs')
require('dotenv').config()
const inquirer = require('inquirer')



const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.user,
    password: process.env.db_password,
    database: process.env.db_name
})
console.log('Connected to MySQL database')

async function welcomeMessage() {
    const {choice} = await inquirer.prompt([
        {
            type: "list",
            name:"choice",
            message:"what would you like to do?",
            choices:[
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
    switch(choice){
        case "view all departments":
        viewAllDepartments()
            break;
    }

console.log("function is running")

}
welcomeMessage()

async function viewAllDepartments() {
    try {
        const [rows] = await connection.query('SELECT * FROM department');
        console.table(rows);
    } catch (error) {
        console.error('Error viewing departments:', error);
    }
}


