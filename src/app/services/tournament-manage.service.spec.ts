import { TestBed } from '@angular/core/testing';

import { TournamentManageService } from './tournament-manage.service';

describe('TournamentManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentManageService = TestBed.get(TournamentManageService);
    expect(service).toBeTruthy();
  });
});
