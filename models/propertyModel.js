const pool = require('../config/db');

// Function to add a new property
const addNewProperty = async (property_name, locality_id, owner_name) => {
    const query = 'INSERT INTO properties (property_name, locality_id, owner_name) VALUES ($1, $2, $3) RETURNING property_id';
    const values = [property_name, locality_id, owner_name];
    const result = await pool.query(query, values);
    return result.rows[0].property_id;
};

// Function to fetch all properties by locality_id
const fetchAllProperties = async (locality_id) => {
    const query = 'SELECT property_id, property_name, owner_name FROM properties WHERE locality_id = $1';
    const values = [locality_id];
    const result = await pool.query(query, values);
    return result.rows;
};

// Function to update property details
const updatePropertyDetails = async (property_id, locality_id, owner_name) => {
    const query = 'UPDATE properties SET locality_id = $1, owner_name = $2 WHERE property_id = $3';
    const values = [locality_id, owner_name, property_id];
    await pool.query(query, values);
};

// Function to delete a property
const deletePropertyRecord = async (property_id) => {
    const query = 'DELETE FROM properties WHERE property_id = $1';
    const values = [property_id];
    await pool.query(query, values);
};

// Function to fetch locality_id by locality_name
const getLocalityIdByName = async (locality_name) => {
    const query = 'SELECT locality_id FROM localities WHERE locality_name = $1';
    const values = [locality_name];
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0].locality_id : null;
};

module.exports = {
    addNewProperty,
    fetchAllProperties,
    updatePropertyDetails,
    deletePropertyRecord,
    getLocalityIdByName
};
