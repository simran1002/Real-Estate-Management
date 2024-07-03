const { Property, Locality } = require('../models');

const addNewProperty = async (req, res) => {
  const { property_name, locality, owner_name } = req.body;
  try {
    const localityInstance = await Locality.findOrCreate({ where: { name: locality } });
    const property = await Property.create({
      name: property_name,
      owner_name,
      localityId: localityInstance[0].id
    });
    res.status(201).json({ message: 'Property added', property_id: property.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchAllProperties = async (req, res) => {
  const { locality_name, locality_id } = req.query;
  try {
    const whereClause = locality_name ? { name: locality_name } : { id: locality_id };
    const locality = await Locality.findOne({ where: whereClause, include: Property });
    if (!locality) {
      return res.status(404).json({ message: 'Locality not found' });
    }
    res.status(200).json(locality.Properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePropertyDetails = async (req, res) => {
  const { property_id, locality_id, owner_name } = req.body;
  try {
    const property = await Property.findByPk(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    property.localityId = locality_id;
    property.owner_name = owner_name;
    await property.save();
    res.status(200).json({ message: 'Property updated', property });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePropertyRecord = async (req, res) => {
  const { property_id } = req.body;
  try {
    const property = await Property.findByPk(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.destroy();
    res.status(200).json({ message: 'Property deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addNewProperty,
  fetchAllProperties,
  updatePropertyDetails,
  deletePropertyRecord
};
