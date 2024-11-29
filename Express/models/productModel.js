const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        itemName: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        totalCost: { type: DataTypes.FLOAT, allowNull: false },
        totalPrice: { type: DataTypes.FLOAT, allowNull: false },
        invoiceNo: { type: DataTypes.INTEGER, allowNull: false },
    });
    return Product;
};