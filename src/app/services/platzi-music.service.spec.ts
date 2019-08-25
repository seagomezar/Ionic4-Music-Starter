import { TestBed } from '@angular/core/testing';

import { PlatziMusicService } from './platzi-music.service';

describe('PlatziMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatziMusicService = TestBed.get(PlatziMusicService);
    expect(service).toBeTruthy();
  });
});
