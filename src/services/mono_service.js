'use strict';

const monoRepository = require('../models/mono_repository')
    , userRepository = require('../models/user_repository')
    , dataSourceRepository = require('../models/data_source_repository')
    , ProductId = require('../models/product_id').ProductId
    , errors = require('../errors');

const monoService = {

    async createMono(params, user) {
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        let mono = await monoRepository.getByProductId(productId);
        if (mono) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_ALREADY_EXISTS);
        }
        params.ownerId = user.userId;
        return await monoRepository.create(params);
    },

    async getMonos(user, query) {
        if (query.monoHash) {
            const mono = await monoRepository.getByHash(query.monoHash, user.userId);
            return mono ? [mono] : [];
        } else if (query.modelNumber) {
            const productId = new ProductId(query.modelNumber, query.serialNumber, query.vendorName);
            const mono = await monoRepository.getByProductId(productId, user.userId);
            return mono ? [mono] : [];
        } else {
            return await monoRepository.getByUserId(user.userId);
        }
    },

    async addDataSource(monoHash, params) {
        if (!await monoRepository.getByHash(monoHash)) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        if (await dataSourceRepository.getByProductId(productId)) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_ALREADY_EXISTS); 
        }
        
        params['monoHash'] = monoHash;
        return await dataSourceRepository.create(params);
    },

    async getDataSources(monoHash) {
        let mono = await monoRepository.getByHash(monoHash);
        if (!mono) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        return mono.dataSources;
    }
}

module.exports = monoService;
