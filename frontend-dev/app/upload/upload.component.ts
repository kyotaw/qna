import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';

import { UploadFile } from '../models/upload-file.model';
import { KairaiApiService } from '../services/kairai-api.service';


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
          const fd = new FormData();
          fd.append('qnaFile', file.data);

          file.inProgress = true;
          file.subscription = this.kairaiApi.uploadFile(fd, file.type).pipe(
              map(event => {
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
                  file.inProgress = false;
                  return of(`${file.data.name} upload failed.`);
              })
          ).subscribe(
              (event: any) => {
                  if (typeof (event) === 'object') {
                      this.complete.emit(event.body);
                  }
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
