'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locality extends Model {
    static associate(models) {
      Locality.hasMany(models.Property, {
        foreignKey: 'localityId',
        as: 'properties'
      });
    }
  }
  Locality.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Locality',
  });
  return Locality;
};
