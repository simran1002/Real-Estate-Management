const pool = require('../config/db');

// Add a new property
const addNewProperty = async (property_name, locality_id, owner_name) => {
    const query = 'INSERT INTO properties (property_name, locality_id, owner_name) VALUES ($1, $2, $3) RETURNING property_id';
    const values = [property_name, locality_id, owner_name];
    const result = await pool.query(query, values);
    return result.rows[0].property_id;
};

// Fetch all properties
const fetchAllProperties = async () => {
    const query = 'SELECT property_id, property_name, owner_name FROM properties';
    const result = await pool.query(query);
    return result.rows;
};

// Fetch all properties by locality ID
const fetchAllPropertiesByLocality = async (locality_id) => {
    const query = 'SELECT property_id, property_name, owner_name FROM properties WHERE locality_id = $1';
    const values = [locality_id];
    const result = await pool.query(query, values);
    return result.rows;
};

// Fetch locality ID by locality name
const getLocalityIdByName = async (locality_name) => {
    const query = 'SELECT locality_id FROM localities WHERE locality_name = $1';
    const values = [locality_name];
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0].locality_id : null;
};

// Update property details
const updatePropertyDetails = async (property_id, locality_id, owner_name) => {
    const query = 'UPDATE properties SET locality_id = $1, owner_name = $2 WHERE property_id = $3';
    const values = [locality_id, owner_name, property_id];
    await pool.query(query, values);
};

// Delete a property record
const deletePropertyRecord = async (property_id) => {
    const query = 'DELETE FROM properties WHERE property_id = $1';
    const values = [property_id];
    await pool.query(query, values);
};

// Fetch all localities
const getAllLocalities = async () => {
    const query = 'SELECT * FROM localities';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    addNewProperty,
    fetchAllProperties,
    fetchAllPropertiesByLocality,
    updatePropertyDetails,
    deletePropertyRecord,
    getLocalityIdByName,
    getAllLocalities
};
