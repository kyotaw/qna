'use strict';


const qnaRepository = require('../models/qna_repository');


const qnaService = {

    async getQnAs(kbId, environment='Test') {
        return await qnaRepository.getQnAs(kbId, environment);
    }

}


module.exports = qnaService;
