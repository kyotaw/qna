import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { settings } from '../settings';

@Component({
  selector: 'app-qbot',
  templateUrl: './qbot.component.html',
  styleUrls: ['./qbot.component.css']
})
export class QbotComponent implements OnInit {
    
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
    }

    get botUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(settings.botUrl); 
    }
}
