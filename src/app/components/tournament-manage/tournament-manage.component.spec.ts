import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentManageComponent } from './tournament-manage.component';

describe('TournamentManageComponent', () => {
  let component: TournamentManageComponent;
  let fixture: ComponentFixture<TournamentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
