import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OriginesService, Origine } from '../origines.service';
import { FournisseursService, Fournisseur } from '../../fournisseurs/fournisseurs.service';

@Component({
  selector: 'app-origines-list',
  templateUrl: './origines-list.component.html',
  styleUrls: ['./origines-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class OriginesListComponent implements OnInit {
  origines: Origine[] = [];
  selectedOrigine: Origine | null = null;
  newOrigine: Origine = {
    idOrigine: 0,
    nom: '',
    fournisseur: {
      idFournisseur: 0,
      name: '',        
      ice: '',
      tel: '',
      ville: '',
      adresse: ''
    },
    prixAchat: 0,
    quantite: 0
  };

  searchNom: string = '';
  searchTerm: string = '';
  fournisseurs: Fournisseur[] = [];

  constructor(
    private originesService: OriginesService,
    private fournisseurService: FournisseursService
  ) {}

  ngOnInit() {
    this.loadOrigines();
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe(data => this.fournisseurs = data);
  }

  loadOrigines() {
    this.originesService.getOrigines().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.origines = data;
        } else if (data && Array.isArray((data as any).content)) {
          this.origines = (data as any).content;
        } else {
          this.origines = [];
        }
      },
      error: (err) => {
        console.error('Failed to load origines:', err);
        this.origines = [];
      }
    });
  }

  addOrigine() {
    const payload = {
      nom: this.newOrigine.nom,
      fournisseur: { idFournisseur: this.newOrigine.fournisseur.idFournisseur },
      prixAchat: this.newOrigine.prixAchat,
      quantite: this.newOrigine.quantite
    };
    this.originesService.addOrigine(payload).subscribe({
      next: () => {
        this.loadOrigines();
        this.newOrigine = {
          nom: '',
          fournisseur: { idFournisseur: 0, name: '', ice: '', tel: '', ville: '', adresse: '' },
          prixAchat: 0,
          quantite: 0
        };
      }
    });
  }

  editOrigine(origine: Origine) {
    this.selectedOrigine = {
      ...origine,
      fournisseur: { ...origine.fournisseur }
    };
  }

  updateOrigine() {
    if (this.selectedOrigine) {
      const payload = {
        idOrigine: this.selectedOrigine.idOrigine!,
        nom: this.selectedOrigine.nom,
        fournisseur: { idFournisseur: this.selectedOrigine.fournisseur.idFournisseur },
        prixAchat: this.selectedOrigine.prixAchat,
        quantite: this.selectedOrigine.quantite
      };
      this.originesService.updateOrigine(payload).subscribe({
        next: () => {
          this.loadOrigines();
          this.selectedOrigine = null;
        }
      });
    }
  }

  deleteOrigine(id: number | undefined) {
    if (typeof id === 'number') {
      this.originesService.deleteOrigine(id).subscribe({
        next: () => this.loadOrigines()
      });
    }
  }

  triggerSearch() {
    this.searchTerm = this.searchNom;
  }

  filteredOrigines(): Origine[] {
    if (!Array.isArray(this.origines)) return [];
    if (!this.searchTerm || this.searchTerm.trim().length === 0) {
      return this.origines;
    }
    return this.origines.filter(o =>
      o.nom.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
    );
  }

  // Display fournisseur name from the new column
  getFournisseurName(id: number): string {
    const fournisseur = this.fournisseurs.find(f => f.idFournisseur === id);
    return fournisseur ? fournisseur.name : '';
  }
}