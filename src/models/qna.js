'use strict';


class QnA {

    constructor(params) {
        params = params || {};
        this.id = params.id;
        this.answer = params.answer || '';
        this.questions = params.questions || [];
        this.metadata = params.metadata || [];
        this.source = params.source || '';
    }

}


module.exports.QnA = QnA;
