import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoreMenuComponent } from './add-score-menu.component';

describe('AddScoreMenuComponent', () => {
  let component: AddScoreMenuComponent;
  let fixture: ComponentFixture<AddScoreMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScoreMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
