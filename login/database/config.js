const Sequelize = require("sequelize");

// Recieving data from env (Defined at main.tf as SSM Instance)
var host = process.env.DB_HOST
var username = process.env.DB_USER
var password = process.env.DB_PASSWORD
var database = process.env.DB_DATABASE

// Creating and exporting new DB instance
module.exports = new Sequelize({ 
    database,
    username,
    password,
    host,
    dialect: "mysql",
    define: {
        timestamps: false, // I don't want timestamp fields by default
        freezeTableName: true
      },
      logging: false
}); 
