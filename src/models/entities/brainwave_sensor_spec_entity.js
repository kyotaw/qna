'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        channels_10_20: { type: db.Sequelize.ARRAY(db.Sequelize.STRING), allowNull: false, defaultValue: [] },
        channels: { type: db.Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    }
}

const BrainWaveSensorSpecEntity = db.define('brainwave_sensor_spec', schema);
BrainWaveSensorSpecEntity.belongsTo(DataSourceEntity);

module.exports = {
    BrainWaveSensorSpecEntity: BrainWaveSensorSpecEntity,
    schema: schema
}
