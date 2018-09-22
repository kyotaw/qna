'use strict';


const qnaService = require('../services/qna_service')
    , qnaResponse = require('./qna_response')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors');


const qnaController = {

    getQnAs(req, res) {
        qnaService.getQnAs(req.query.kbId, req.query.environment).then(qnas => {
            shortcut.successResponse(res, qnaResponse.getQnAsResponse(qnas)); 
        
        }).catch (err => {
            shortcut.error500Response(res, err);
        });
    },

    importQnAs(req, res) {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            qnaService.importQnAsFromFile(file, req.query.fileType, req.query.kbId).then(() => {
                shortcut.successResponse(res); 
            }).catch (err => {
                shortcut.error500Response(res, err);
            });
        });
    }
}


module.exports = qnaController;
