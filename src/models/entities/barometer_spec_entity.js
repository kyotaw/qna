'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        linearity: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
        hysteresis: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
        repeatability: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
        calibrationUncertainty: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
        accuracy: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
    }
}

const BarometerSpecEntity = db.define('barometer_spec', schema);
BarometerSpecEntity.belongsTo(DataSourceEntity);

module.exports = {
    BarometerSpecEntity: BarometerSpecEntity,
    schema: schema
}
