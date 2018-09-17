'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        axis: { type: db.Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        gRanges: { type: db.Sequelize.ARRAY(db.Sequelize.FLOAT), allowNull: false, defaultValue: [] },
        sensitivities: { type: db.Sequelize.ARRAY(db.Sequelize.FLOAT), allowNull: false, defaultValue: [] },
        noiseRange: { type: db.Sequelize.ARRAY(db.Sequelize.FLOAT), allowNull: false, defaultValue: [] },
        resolutions: { type: db.Sequelize.ARRAY(db.Sequelize.INTEGER), allowNull: false, defaultValue: [] },
    }
}

const AccelerometerSpecEntity = db.define('accelerometer_spec', schema);
AccelerometerSpecEntity.belongsTo(DataSourceEntity);

module.exports = {
    AccelerometerSpecEntity: AccelerometerSpecEntity,
    schema: schema
}
