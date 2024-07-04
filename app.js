const express = require('express');
const app = express();
const port = 3000;
const propertyRoutes = require('./routes/propertyRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use property routes
app.use('/api/properties', propertyRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
