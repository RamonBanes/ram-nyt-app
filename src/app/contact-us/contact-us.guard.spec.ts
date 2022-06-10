import { TestBed } from '@angular/core/testing';

import { ContactUsGuard } from './contact-us.guard';

describe('ContactUsGuard', () => {
  let guard: ContactUsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContactUsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
