'use strict';

const Client = new require('node-rest-client').Client
    , qnaMakerEnv = require('../env').qnaMaker;

const url = qnaMakerEnv.baseUrl + '/' + qnaMakerEnv.version;
const client = new Client();

function getHeaders(contentType='application/json') {
    return {
        'Ocp-Apim-Subscription-Key': qnaMakerEnv.subscriptionKey,
        'Content-Type': contentType,
    }
}

const qnaMaker = {
   
    downloadKnowledgebase(kbId, environment) {
        return new Promise((resolve, reject) => {
            const endPoint = [url, 'knowledgebases', kbId, environment, 'qna'].join('/');
            client.get(endPoint, { headers: getHeaders() }, (data, res) => {
                resolve(data);
            });
        });
    },

    updateKnowledgebase(kbId, addedQnas) {
        return new Promise((resolve, reject) => {
            const endPoint = [url, 'knowledgebases', kbId].join('/');
            client.patch(
                endPoint,
                {
                    data: { 'add': { 'qnaList': addedQnas } },
                    headers: getHeaders(),
                },
                (data, res) => {
                    resolve(data, res);
                });
        });
    },

    publishKnowledgebase(kbId) {
        return new Promise((resolve, reject) => {
            const endPoint = [url, 'knowledgebases', kbId].join('/');
            client.post(
                endPoint,
                { headers: getHeaders() },
                (data, res) => {
                    resolve(data, res);
                });
        });
    },
}


module.exports = qnaMaker;
