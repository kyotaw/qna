'use strict';

const Client = new require('node-rest-client').Client
    , qnaMakerEnv = require('../env').qnaMaker;

const url = qnaMakerEnv.baseUrl + '/' + qnaMakerEnv.version;
const client = new Client();

function getHeaders() {
    return {
        'Ocp-Apim-Subscription-Key': qnaMakerEnv.subscriptionKey,
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
    }

}


module.exports = qnaMaker;
