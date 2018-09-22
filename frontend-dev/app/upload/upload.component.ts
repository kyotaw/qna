import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEvent,
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';

import { UploadFile } from '../models/upload-file.model';
import { KairaiApiService } from '../services/kairai-api.service';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({ opacity: 100 })),
            transition('* => void', [
                animate(300, style({ opacity: 0 }))
            ])
       ])
  ]
})
export class UploadComponent implements OnInit {

    accept = 'text/csv';
    @Output() complete = new EventEmitter<string>();

    private files: Array<UploadFile> = [];
    private completedFiles: Array<UploadFile> = [];

    constructor(private kairaiApi: KairaiApiService) {}

    ngOnInit() {}

    selectFiles(fileType) {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
        for (let i = 0; i < fileUpload.files.length; ++i) {
                this.files.push(new UploadFile(fileUpload.files[i], fileType));
            }
            this.uploadFiles(fileType);
        };
        fileUpload.click();
      }

      cancelFile(file: UploadFile) {
          file.subscription.unsubscribe();
          this.removeFileFromArray(file);
      }

      setAccept(accept) {
          this.accept = accept;
      }

    private uploadFile(file: UploadFile) {
        if (file.state != 'ready') {
            return;
        }
        file.state = 'uploading';
        const fd = new FormData();
        fd.append('file', file.data);

        file.subscription = this.kairaiApi.uploadFile(fd, file.fileType, environment.kbId).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        file.progress = Math.round(event.loaded * 100 / event.total);
                        break;
                    case HttpEventType.Response:
                        return event;
                }
            }),
            tap(message => { }),
            last(),
            catchError((error: HttpErrorResponse) => {
                file.state = 'error';
                file.errorMessage = 'upload failed. reason: ' + error.error.message;
                return of(`${file.data.name} upload failed.`);
            })
        ).subscribe(
            (event: any) => {
                file.state = 'completed';
                this.completedFiles.push(file);
                this.removeFileFromArray(file);
            }
        );
    }

    private uploadFiles(fileType: string) {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.value = '';

        this.files.forEach(file => {
            this.uploadFile(file);
        });
    }

    private removeFileFromArray(file: UploadFile) {
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    }
}
