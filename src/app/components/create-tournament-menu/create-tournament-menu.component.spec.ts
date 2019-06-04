import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentMenuComponent } from './create-tournament-menu.component';

describe('CreateTournamentMenuComponent', () => {
  let component: CreateTournamentMenuComponent;
  let fixture: ComponentFixture<CreateTournamentMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTournamentMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournamentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
