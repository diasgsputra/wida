const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Invoice = sequelize.define('invoice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceNo: { type: DataTypes.INTEGER, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        customerName: { type: DataTypes.STRING, allowNull: false },
        salespersonName: { type: DataTypes.STRING, allowNull: false },
        paymentType: { type: DataTypes.ENUM('CASH', 'CREDIT'), allowNull: false },
        notes: { type: DataTypes.STRING },
    });
    return Invoice;
};