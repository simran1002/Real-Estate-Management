'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.Locality, {
        foreignKey: 'localityId',
        as: 'locality'
      });
    }
  }
  Property.init({
    name: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    localityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};
