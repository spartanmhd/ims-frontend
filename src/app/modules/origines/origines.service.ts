import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Fournisseur {
  idFournisseur: number;
  name: string;
  ice: string;
  tel: string;
  ville: string;
  adresse: string;
}

export interface Origine {
  idOrigine?: number;
  nom: string;
  fournisseur: Fournisseur;
  prixAchat: number;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class OriginesService {
  private apiUrl = 'http://localhost:8080/api/origines';

  constructor(private http: HttpClient) {}

  getOrigines(): Observable<Origine[]> {
    return this.http.get<{ content: Origine[] }>(this.apiUrl)
      .pipe(
        map(response => response.content)
      );
  }

  // Accept the backend payload shape using 'any' or an inline type
  addOrigine(origine: { nom: string; fournisseur: { idFournisseur: number }; prixAchat: number; quantite: number }): Observable<Origine> {
    return this.http.post<Origine>(this.apiUrl, origine);
  }

  updateOrigine(origine: { idOrigine: number; nom: string; fournisseur: { idFournisseur: number }; prixAchat: number; quantite: number }): Observable<Origine> {
    return this.http.put<Origine>(`${this.apiUrl}/${origine.idOrigine}`, origine);
  }

  deleteOrigine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchOrigines(nom: string = '', ice: string = ''): Observable<Origine[]> {
    const params: string[] = [];
    if (nom) params.push(`nom=${encodeURIComponent(nom)}`);
    if (ice) params.push(`ice=${encodeURIComponent(ice)}`);
    return this.http.get<Origine[]>(`${this.apiUrl}/search?${params.join('&')}`);
  }
}