const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('', invoiceController.readAllInvoices);
router.post('/', invoiceController.createInvoice);
router.get('/:invoiceNo', invoiceController.readInvoices);
router.put('/:id', invoiceController.updateInvoice);
router.put('/product/:id', invoiceController.updateProduct);
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
