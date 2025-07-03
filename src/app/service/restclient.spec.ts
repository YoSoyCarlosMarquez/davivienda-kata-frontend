import { TestBed } from '@angular/core/testing';

import { Restclient } from './restclient';

describe('Restclient', () => {
  let service: Restclient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Restclient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
