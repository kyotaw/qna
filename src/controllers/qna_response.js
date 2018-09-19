'use strict';


function getQnAsResponse(qnas) {
    let list = []
    for (let qna of qnas) {
        list.push(
            {
                id: qna.id,
                answer: qna.answer,
                questions: qna.questions,
                metadata: qna.metadata,
                //source: qna.source,
            }
        );
    }
    let data = {
        qnas: list
    }
    return data;
}


module.exports = {
    getQnAsResponse: getQnAsResponse
}
