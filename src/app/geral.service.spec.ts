/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeralService } from './geral.service';

describe('GeralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeralService]
    });
  });

  it('should ...', inject([GeralService], (service: GeralService) => {
    expect(service).toBeTruthy();
  }));
});
