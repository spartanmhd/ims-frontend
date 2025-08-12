import { ApplicationModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fournisseur {
  idFournisseur?: number;
  name: string;
  ice: string;
  tel: string;
  ville: string;
  adresse: string;
}

@Injectable({ providedIn: 'root' })
export class FournisseursService {
  private apiUrl = 'http://localhost:8080/api/fournisseurs';

  constructor(private http: HttpClient) {}

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, fournisseur);
  }

  updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${fournisseur.idFournisseur}`, fournisseur);
  }
  
  deleteFournisseur(idFournisseur: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFournisseur}`);
  }
}