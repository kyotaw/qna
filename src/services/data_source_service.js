'use strict';

const dataSourceRepository = require('../models/data_source_repository')
    , channelRepository = require('../models/channel_repository')
    , errors = require('../errors');

const dataSourceService = {

    async get(params) {
        if (params.hash) {
            return [await dataSourceRepository.getByHash(params.hash)];
        } else {
            return [];
        }
    },

    async getAll() {
        return await dataSourceRepository.getAll();
    },

    async delete(params) {
        if (params.hash) {
            if (!await dataSourceRepository.deleteByHash(params.hash)) {
                throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
            }
        }
        return;
    }

}

module.exports = dataSourceService;
