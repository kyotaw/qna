'use strict';


const QnA = require('./qna').QnA;


function createQnAFromAqcCsv(row) {
    
}

function createQnAFromQnAMakerCsv(row) {
    if (!('Answer' in row) || !('Question' in row) || !('Metadata' in row)) {
        return null;
    }

    let params = {
        id: 0,
        questions: [row['Question']],
        answer: row['Answer'],
        metadata: [row['Metadata']],
    }
    if ('Source' in row) {
        params.source = row['Source'];
    }

    return new QnA(params);
}


module.exports = {
    aqc: createQnAFromAqcCsv,
    qna: createQnAFromQnAMakerCsv,
}
