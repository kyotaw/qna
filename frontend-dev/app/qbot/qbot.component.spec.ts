import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbotComponent } from './qbot.component';

describe('QbotComponent', () => {
  let component: QbotComponent;
  let fixture: ComponentFixture<QbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
