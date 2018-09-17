'use strict';

const db = require('../../infrastructures/sequelizedb');

const INVALID_LATITUDE = 181;
const INVALID_LONGITUDE = 91;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name: { type: db.Sequelize.STRING, allowNull: false, defaultValue: 'Unknown' },
        modelNumber: { type: db.Sequelize.STRING, allowNull: false },
        serialNumber: { type: db.Sequelize.STRING, allowNull: false },
        vendorName: { type: db.Sequelize.STRING, allowNull: false },
        hash: { type: db.Sequelize.STRING, allowNull: false, unique: true },
        sourceType: { type: db.Sequelize.STRING, allowNull: false }, 
        transferredBytes: { type: db.Sequelize.BIGINT, allowNull: false, defaultValue: 0 }, 
        monoHash: { type: db.Sequelize.STRING, allowNull: false }, 
        specId: { type: db.Sequelize.INTEGER, allowNull: false },
        latitude: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: INVALID_LATITUDE },
        longitude: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: INVALID_LONGITUDE },
    }
}

const DataSourceEntity = db.define('data_source', schema);
DataSourceEntity.INVALID_LATITUDE = INVALID_LATITUDE;
DataSourceEntity.INVALID_LONGITUDE = INVALID_LONGITUDE;

module.exports = {
    DataSourceEntity: DataSourceEntity,
    schema: schema
}
