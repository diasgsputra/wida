const { readFile, utils } = require('xlsx');
const { sequelize, Invoice, Product } = require("../models");

exports.uploadFile = async (req, res) => {
    try {
        const filePath = req.file.path; 
        const workbook = readFile(filePath);
        const invoiceSheet = utils.sheet_to_json(workbook.Sheets['invoice']);
        const productSheet = utils.sheet_to_json(workbook.Sheets['product sold']);

        const errors = []; 

        await sequelize.transaction(async (t) => {
            for (const row of invoiceSheet) {
                try {
                    const invoiceData = {
                        invoiceNo: row['invoice no'],
                        date: row['date'],
                        customerName: row['customer'],
                        salespersonName: row['salesperson'],
                        paymentType: row['payment type'],
                        notes: row['notes'],
                    };

                    const { invoiceNo, date, customerName, salespersonName, paymentType, notes } = invoiceData;

                    if (!invoiceNo || !date || !customerName || !salespersonName || !paymentType) {
                        throw new Error('Missing required fields');
                    }

                    await Invoice.create(invoiceData, { transaction: t });
                } catch (error) {
                    errors.push({ sheet: 'invoice', row: row['invoice no'], error: error.message });
                }
            }

            for (const row of productSheet) {
                try {
                    const productData = {
                        itemName: row['item'],
                        quantity: row['quantity'],
                        totalCost: row['total cogs'],
                        totalPrice: row['total price'],
                        invoiceNo: row['Invoice no'],
                    };

                    const { itemName, quantity, totalCost, totalPrice } = productData;

                    if (!itemName || !quantity || !totalCost || !totalPrice) {
                        throw new Error('Missing required fields');
                    }

                    await Product.create(productData, { transaction: t });
                } catch (error) {
                    errors.push({ sheet: 'product', row: row['item'], error: error.message });
                }
            }
        });

        res.json({
            message: "File uploaded successfully",
            errors,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
