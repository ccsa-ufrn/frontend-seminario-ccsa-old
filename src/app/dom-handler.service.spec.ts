/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DomHandlerService } from './dom-handler.service';

describe('DomHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomHandlerService]
    });
  });

  it('should ...', inject([DomHandlerService], (service: DomHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
