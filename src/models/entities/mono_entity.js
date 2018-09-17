'use strict';

const db = require('../../infrastructures/sequelizedb')
    , DataSourceEntity = require('./data_source_entity').DataSourceEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name: { type: db.Sequelize.STRING, allowNull: false },
        modelNumber: { type: db.Sequelize.STRING, allowNull: false },
        serialNumber: { type: db.Sequelize.STRING, allowNull: false },
        vendorName: { type: db.Sequelize.STRING, allowNull: false },
        hash: { type: db.Sequelize.STRING, allowNull: false },
        ownerId: { type: db.Sequelize.STRING, allowNull: false },
    }
}

const MonoEntity = db.define('mono', schema);

MonoEntity.hasMany(DataSourceEntity);

module.exports = {
    MonoEntity: MonoEntity,
    schema: schema
}
