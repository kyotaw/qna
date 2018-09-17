'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        methods: { type: db.Sequelize.ARRAY(db.Sequelize.TEXT), allowNull: false, defaultValue: [] },
        maxAccuracy: { type: db.Sequelize.FLOAT, allowNull: false, defaultValue: -1 },
    }
}

const PositioningSystemSpecEntity = db.define('positioning_system_entity', schema);
PositioningSystemSpecEntity.belongsTo(DataSourceEntity);

module.exports = {
    PositioningSystemSpecEntity: PositioningSystemSpecEntity,
    schema: schema
}
