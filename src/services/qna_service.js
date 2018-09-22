'use strict';


const qnaRepository = require('../models/qna_repository')
    , CsvStream = require('../helpers/csv_stream').CsvStream
    , qnaCretor = require('../models/csv')
    , qnaMaker = require('../infrastructures/qna_maker')
    , errors = require('../errors');


const qnaService = {

    async getQnAs(kbId, environment='Test') {
        return await qnaRepository.getQnAs(kbId, environment);
    },

    async importQnAsFromFile(file, fileType, kbId) {
        return new Promise((resolve, reject) => {
            let csv = new CsvStream(file, 'dict');
            const create = qnaCretor[fileType];

            let qnas = [];
            csv.onRow((row) => {
                const qna = create(row);
                if (!qna) {
                    reject(new errors.KairaiError(errors.ErrorTypes.INVALID_IMPORTED_CSV));
                }
                qnas.push(qna);
            });

            csv.onEnd(async () => {
                qnaRepository.addQnAs(qnas, kbId).then(() => {
                    qnaMaker.publishKnowledgebase(kbId);
                    resolve();
                }).catch (err => {
                    reject(err);
                });
            });

            csv.start();
        });
    }
}


module.exports = qnaService;
