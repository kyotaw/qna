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
    }

}


module.exports = qnaController;
