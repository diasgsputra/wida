const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const InvoiceModel = require('./invoiceModel');
const ProductModel = require('./productModel');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'wida',
    username: 'root',
    password: ''
});

const Invoice = InvoiceModel(sequelize);
const Product = ProductModel(sequelize);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

module.exports = {
    sequelize,
    Invoice,
    Product
};
