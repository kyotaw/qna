import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-qbot',
  templateUrl: './qbot.component.html',
  styleUrls: ['./qbot.component.css']
})
export class QbotComponent implements OnInit {
    
  botUrl: string = Settings.botUrl;

  constructor() { }

  ngOnInit() {
  }

}
