
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "manager",
    database: "library_application"
})

module.exports = pool.promise();
