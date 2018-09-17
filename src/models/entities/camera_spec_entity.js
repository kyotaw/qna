'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        totalPixels: { type: db.Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        effectivePixels: { type: db.Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        colorSpaces: { type: db.Sequelize.ARRAY(db.Sequelize.TEXT), allowNull: false, defaultValue: [] },
    }
}

const CameraSpecEntity = db.define('camera_spec', schema);
CameraSpecEntity.belongsTo(DataSourceEntity);

module.exports = {
    CameraSpecEntity: CameraSpecEntity,
    schema: schema
}
