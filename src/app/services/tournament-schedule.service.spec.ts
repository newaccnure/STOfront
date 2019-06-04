import { TestBed } from '@angular/core/testing';

import { TournamentScheduleService } from './tournament-schedule.service';

describe('TournamentScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentScheduleService = TestBed.get(TournamentScheduleService);
    expect(service).toBeTruthy();
  });
});
