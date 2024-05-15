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

function welcomeMessage() {

console.log("function is running")

}
welcomeMessage()




