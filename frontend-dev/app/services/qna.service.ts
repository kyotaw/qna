import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KairaiApiService } from './kairai-api.service';
import { QnA } from '../models/qna.model';

@Injectable()
export class QnAService {

    constructor(private kairaiApi: KairaiApiService) {}

    getQnAs(kbId: string, environment: string) {
        return this.kairaiApi.getQnAs(kbId, environment).map(json => {
            let data = json['data'];
            let qnas = []
            for (let d of data['qnas']) {
                const qna = new QnA(d);
                qnas.push(qna);
            }
            return qnas;
        });
    }
}
