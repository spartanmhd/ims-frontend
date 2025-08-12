import { TestBed } from '@angular/core/testing';
import { OriginesService } from './origines.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OriginesService', () => {
  let service: OriginesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OriginesService]
    });
    service = TestBed.inject(OriginesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch origines', () => {
    const mockOrigines = [
      {
        idOrigine: 1,
        nom: 'Origine A',
        fournisseur: {
          idFournisseur: 1,
          ice: '12345',
          tel: '0612345678',
          ville: 'Casablanca',
          adresse: 'Rue 1'
        },
        prixAchat: 100,
        quantite: 10
      }
    ];

    service.getOrigines().subscribe(origines => {
      expect(origines).toEqual(mockOrigines);
    });

    const req = httpMock.expectOne('/api/origines');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrigines);
  });
});