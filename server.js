const express = require('express');
const app = express();
const port = 3000;
const propertyRoutes = require('./routes/propertyRoutes');
const localityRoutes = require('./routes/localityRoutes');
const { sequelize } = require('./models');

app.use(express.json());
app.use('/property', propertyRoutes);
app.use('/locality', localityRoutes);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
