'use strict';

const Channel = require('../models/channel').Channel
    , ChannelHost = require('../models/channel_host').ChannelHost
    , ChannelPipelineBuilder = require('../models/channel_pipeline_builder').ChannelPipelineBuilder
    , ChannelStates = require('../models/channel_status').ChannelStates
    , channelRepository = require('../models/channel_repository')
    , GeoLocation = require('../models/geo_location').GeoLocation
    , dataSourceRepository = require('../models/data_source_repository')
    , Geo = require('../models/geo').Geo
    , errors = require('../errors');

const channelService = {
    
    async openChannel(conn) {
        const dataSource = await dataSourceRepository.getByHash(conn.query.dataSourceHash);
        if (!dataSource) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }
        if (conn.query.latitude && conn.query.longitude) {
            dataSource.location = new GeoLocation(conn.query.latitude, conn.query.longitude);
            await dataSourceRepository.update(dataSource);
        }

        let channel = await channelRepository.get(dataSource.productId.hash);
        if (channel && channel.status.isOffline) {
            await channelRepository.delete(channel);
            channel = null;
        }
        if (channel) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_ALREADY_OPEN);
        }

        let host = new ChannelHost(dataSource, conn);
        channel = new Channel(host);
        host.setChannel(channel);
        await channelRepository.create(channel);
        return channel;
    },

    async addDirectListener(conn) {
        const dataSource = await dataSourceRepository.getByHash(conn.query.dataSourceHash);
        if (!dataSource) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }

        let channel = await channelRepository.get(dataSource.productId.hash);
        if (channel && channel.status.isOffline) {
            await channelRepository.delete(channel);
            channel = null;
        }
        if (!channel) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_NOT_OPEN);
        }

        let builder = new ChannelPipelineBuilder();
        builder.addSources(channel);
        builder.setListener(conn);
        channel = builder.build();

        if (channel.status.isReady) {
            channel.start();
        }
        return channel;
    },

    async addAggregationListener(conn) {
        const dataSources = await Geo.getDataSourcesInside(conn.query.area, conn.query.dataSourceType);
        if (dataSources.lenght === 0) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }
        let channels = await channelRepository.get(dataSources.map(d => { return d.productId.hash }));
        channels = channels.filter(c => { return !c.status.isOffline });
        if (channels.length === 0) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_NOT_OPEN);
        }

        let builder = new ChannelPipelineBuilder();
        builder.addSources(channels);
        builder.setAggregation(true);
        builder.setListener(conn);
        builder.setMethod(conn.query.method);
        channels = builder.build();
        for (let channel of channels) {
            if (channel.status.isReady) {
                channel.start();
            }
        }
        return channels;
    },

    async getChannel(channelId) {
        return await channelRepository.get(channelId);
    },

}

module.exports = channelService;
