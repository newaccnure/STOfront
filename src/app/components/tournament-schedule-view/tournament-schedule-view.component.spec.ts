import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentScheduleViewComponent } from './tournament-schedule-view.component';

describe('TournamentScheduleViewComponent', () => {
  let component: TournamentScheduleViewComponent;
  let fixture: ComponentFixture<TournamentScheduleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentScheduleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
