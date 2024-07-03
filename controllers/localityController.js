const { Locality } = require('../models');

const fetchAllLocalities = async (req, res) => {
  try {
    const localities = await Locality.findAll();
    res.status(200).json(localities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  fetchAllLocalities
};
