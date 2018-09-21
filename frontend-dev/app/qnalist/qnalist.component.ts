import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { QnAService } from '../services/qna.service';
import { QnA } from '../models/qna.model';

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
        this.currentKb =  '51cf11c3-891e-4d42-a7b6-b2b9f5af92f5';
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
