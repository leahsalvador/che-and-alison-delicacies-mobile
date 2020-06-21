import { TestBed } from '@angular/core/testing';

import { SystemConfigService } from './system-config.service';

describe('SystemConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemConfigService = TestBed.get(SystemConfigService);
    expect(service).toBeTruthy();
  });
});
