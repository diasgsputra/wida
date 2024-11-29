const { now } = require("sequelize/lib/utils");
const { sequelize, Invoice, Product } = require("../models");

exports.readAllInvoices = async (req, res) => {
    try {
        const invoiceQuery = `
            SELECT id, invoiceNo, customerName, salespersonName
            FROM Invoices
        `;

        const productQuery = `
            SELECT id, itemName, totalPrice, invoiceNo
            FROM Products
        `;

        const invoices = await sequelize.query(invoiceQuery, {
            type: sequelize.QueryTypes.SELECT,
        });

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No invoices found' });
        }

        const products = await sequelize.query(productQuery, {
            type: sequelize.QueryTypes.SELECT,
        });
        const response = invoices.map(invoice => {
            const relatedProducts = products.filter(product => product.invoiceNo === invoice.invoiceNo);
            return {
                id: invoice.id,
                invoiceNo: invoice.invoiceNo,
                customerName: invoice.customerName,
                salesPersonName: invoice.salespersonName,
                product: relatedProducts.map(product => ({
                    id: product.id,
                    itemName: product.itemName,
                    totalPrice: product.totalPrice,
                })),
            };
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInvoice = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { invoiceNo, customerName, salesPersonName, paymentType, product } = req.body;
        if (!invoiceNo || !customerName || !salesPersonName || !product || product.length === 0) {
            return res.status(400).json({ error: 'Invalid input: Missing required fields' });
        }
        const invoice = await Invoice.create({
            invoiceNo,
            customerName,
            paymentType,
            date: now,
            salespersonName: salesPersonName
        }, { transaction });

        // Insert the products using Sequelize
        for (const item of product) {
            const { itemName, totalPrice, quantity, totalCost } = item;

            // Validate product input
            if (!itemName || totalPrice === undefined) {
                throw new Error('Invalid product input: Missing required fields');
            }

            await Product.create({
                itemName,
                totalPrice,
                quantity,
                totalCost,
                invoiceNo: invoice.invoiceNo
            }, { transaction });
        }

        await transaction.commit(); 
        res.status(201).json({ message: 'Invoice and products created successfully' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

// Read Invoices
exports.readInvoices = async (req, res) => {
    try {
        const { invoiceNo } = req.params;

        if (!invoiceNo) {
            return res.status(400).json({ error: 'invoiceNo is required' });
        }
        const invoiceQuery = `
            SELECT id, invoiceNo, customerName, salespersonName
            FROM Invoices
            WHERE invoiceNo = :invoiceNo
        `;

        const productQuery = `
            SELECT id, itemName, totalPrice
            FROM Products
            WHERE invoiceNo = :invoiceNo
        `;

        const [invoiceResult] = await sequelize.query(invoiceQuery, {
            replacements: { invoiceNo },
            type: sequelize.QueryTypes.SELECT,
        });

        if (!invoiceResult) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        const productResult = await sequelize.query(productQuery, {
            replacements: { invoiceNo },
            type: sequelize.QueryTypes.SELECT,
        });

        const response = {
            id: invoiceResult.id,
            invoiceNo: invoiceResult.invoiceNo,
            customerName: invoiceResult.customerName,
            salesPersonName: invoiceResult.salespersonName,
            product: productResult.map(product => ({
                id: product.id,
                itemName: product.itemName,
                totalPrice: product.totalPrice,
            })),
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
    const { id } = req.params; 
    const { invoiceNo, customerName, salesPersonName, paymentType } = req.body;

    try {
        // Find the invoice by ID
        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        invoice.invoiceNo = invoiceNo || invoice.invoiceNo;
        invoice.customerName = customerName || invoice.customerName;
        invoice.salespersonName = salesPersonName || invoice.salespersonName;
        invoice.paymentType = paymentType || invoice.paymentType;

        await invoice.save();

        res.status(200).json({ message: 'Invoice updated successfully', invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params; 
    const { itemName, totalPrice, totalCost, quantity, invoiceNo } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.itemName = itemName || product.itemName;
        product.totalPrice = totalPrice || product.totalPrice;
        product.totalCost = totalCost || product.totalCost;
        product.quantity = quantity || product.quantity;
        product.invoiceNo = invoiceNo || product.invoiceNo;

        await product.save(); 

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Invoice
exports.deleteInvoice = async (req, res) => {
    const { id } = req.params; 

    //Use transaction to rollback if error
    const transaction = await sequelize.transaction();
    try {
        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        await Product.destroy({
            where: { invoiceNo: invoice.invoiceNo },
            transaction,
        });

        await invoice.destroy({ transaction });
        await transaction.commit();

        res.status(200).json({ message: 'Invoice and associated products deleted successfully' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};
