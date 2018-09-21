import { Subscription } from 'rxjs';


export class UploadFile {
    data: File;
    type: string;
    state: string;
    inProgress: boolean;
    progress: number;
    canCancel: boolean;
    subscription: Subscription;


    constructor(data: File, type: string) {
        this.data = data;
        this.type = type;
        this.state = 'in';
        this.inProgress = false;
        this.progress = 0;
        this.canCancel = true;
    }

}
