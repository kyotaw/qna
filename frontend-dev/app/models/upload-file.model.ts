import { Subscription } from 'rxjs';


export class UploadFile {
    data: File;
    fileType: string;
    state: string;
    progress: number;
    canCancel: boolean;
    errorMessage: string;
    subscription: Subscription;


    constructor(data: File, fileType: string) {
        this.data = data;
        this.fileType = fileType;
        this.state = 'ready';
        this.progress = 0;
        this.canCancel = true;
        this.errorMessage = '';
        this.subscription = null;
    }

}
