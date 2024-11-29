const express = require('express');
const { sequelize } = require('./models');
const invoiceRoutes = require('./routes/invoiceRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 9002;

// Middleware
app.use(express.json());
app.use('/invoices', invoiceRoutes);
app.use('/upload', uploadRoutes);

// Start the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
