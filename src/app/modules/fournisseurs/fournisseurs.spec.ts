import { TestBed } from '@angular/core/testing';
import { FournisseursService } from './fournisseurs.service';

describe('FournisseursService', () => {
  let service: FournisseursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FournisseursService]
    });
    service = TestBed.inject(FournisseursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});