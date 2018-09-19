'use strict';


const qnaMaker = require('../infrastructures/qna_maker')
    , QnA = require('./qna').QnA;


const qnaRepository = {

    async getQnAs(kbId, environment) {
        const data = await qnaMaker.downloadKnowledgebase(kbId, environment);
        let qnas = [];
        for (let d of data.qnaDocuments) {
            qnas.push(new QnA(d));
        }
        return qnas;
    }

}


module.exports = qnaRepository;
