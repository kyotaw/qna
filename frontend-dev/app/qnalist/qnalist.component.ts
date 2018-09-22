import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { QnAService } from '../services/qna.service';
import { QnA } from '../models/qna.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-qnalist',
  templateUrl: './qnalist.component.html',
  styleUrls: ['./qnalist.component.css']
})
export class QnAListComponent implements OnInit {
    currentKb: string;
    qnas: MatTableDataSource<QnA>;
    displayedColumns: string[] = ['No', 'Question', 'Answer', 'Metadata'];
    isLoaded: boolean;

    constructor(private qnaService: QnAService) {
        this.currentKb = environment.kbId;
        this.qnas = null;
        this.isLoaded = false;
    }

    ngOnInit() {
        this.qnaService.getQnAs(this.currentKb, 'Prod').subscribe(qnas => {
            this.qnas = new MatTableDataSource(qnas);
            this.isLoaded = true;
        });
    }

}
