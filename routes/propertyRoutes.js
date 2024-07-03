const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/add_new_property', propertyController.addNewProperty);
router.get('/fetch_all_properties', propertyController.fetchAllProperties);
router.put('/update_property_details', propertyController.updatePropertyDetails);
router.delete('/delete_property_record', propertyController.deletePropertyRecord);

module.exports = router;
