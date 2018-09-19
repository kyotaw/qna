export class QnA {
    id: number;
    answer: string;
    questions: string[];
    metadata: string[];
    source: string;

    constructor(params: Object) {
        this.id = params['id'];
        this.answer = params['answer'];
        this.questions = params['questions'];
        this.metadata = params['metadata'];
        this.source = params['source'];
    }
}
