const propertyModel = require('../models/propertyModel');

// Controller to handle adding a new property
const addNewProperty = async (req, res) => {
    const { property_name, locality, owner_name } = req.body;
    try {
        const locality_id = await propertyModel.getLocalityIdByName(locality);
        if (!locality_id) {
            return res.status(404).json({ error: 'Locality not found' });
        }
        const property_id = await propertyModel.addNewProperty(property_name, locality_id, owner_name);
        res.status(201).json({ message: 'Property added successfully', property_id });
    } catch (err) {
        console.error('Error adding property:', err);
        res.status(500).json({ error: 'Failed to add property' });
    }
};

// Controller to handle fetching all properties by locality
const fetchAllProperties = async (req, res) => {
    const { locality_name } = req.query;
    try {
        const locality_id = await propertyModel.getLocalityIdByName(locality_name);
        if (!locality_id) {
            return res.status(404).json({ error: 'Locality not found' });
        }
        const properties = await propertyModel.fetchAllProperties(locality_id);
        res.status(200).json(properties);
    } catch (err) {
        console.error('Error fetching properties:', err);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};

// Controller to handle updating property details
const updatePropertyDetails = async (req, res) => {
    const { property_id, locality_id, owner_name } = req.body;
    try {
        await propertyModel.updatePropertyDetails(property_id, locality_id, owner_name);
        res.status(200).json({ message: 'Property details updated successfully' });
    } catch (err) {
        console.error('Error updating property details:', err);
        res.status(500).json({ error: 'Failed to update property details' });
    }
};

// Controller to handle deleting a property
const deletePropertyRecord = async (req, res) => {
    const { property_id } = req.params;
    try {
        await propertyModel.deletePropertyRecord(property_id);
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error('Error deleting property:', err);
        res.status(500).json({ error: 'Failed to delete property' });
    }
};

module.exports = {
    addNewProperty,
    fetchAllProperties,
    updatePropertyDetails,
    deletePropertyRecord
};
