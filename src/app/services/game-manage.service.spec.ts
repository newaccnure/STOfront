import { TestBed } from '@angular/core/testing';

import { GameManageService } from './game-manage.service';

describe('GameManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameManageService = TestBed.get(GameManageService);
    expect(service).toBeTruthy();
  });
});
