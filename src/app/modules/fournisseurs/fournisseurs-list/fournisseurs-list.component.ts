import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FournisseursService, Fournisseur } from '../fournisseurs.service';

@Component({
  selector: 'app-fournisseurs-list',
  templateUrl: './fournisseurs-list.component.html',  
  styleUrls: ['./fournisseurs-list.component.scss'],  
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FournisseursListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  selectedFournisseur: Fournisseur | null = null;
  newFournisseur: Fournisseur = { idFournisseur: 0, name: '', ice: '', tel: '', ville: '', adresse: '' };
  addError: string | null = null;

  constructor(private fournisseursService: FournisseursService) {}

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseursService.getFournisseurs().subscribe(data => this.fournisseurs = data);
  }

  addFournisseur() {
    this.addError = null;
    const { idFournisseur, ...payload } = this.newFournisseur;
    this.fournisseursService.addFournisseur(payload).subscribe({
      next : () => {
      this.loadFournisseurs();
      this.newFournisseur = { name:'', ice: '', tel: '', ville: '', adresse: '' };
      },
      error: (err) => {
        // Show error message
        if (err.status === 400) {
          this.addError = "Veuillez remplir tous les champs obligatoires.";
        } else {
          this.addError = "Erreur lors de l'ajout du fournisseur.";
        }
      }
    });
  }

  editFournisseur(fournisseur: Fournisseur) {
    this.selectedFournisseur = { ...fournisseur };
  }

  updateFournisseur() {
    if (this.selectedFournisseur) {
      this.fournisseursService.updateFournisseur(this.selectedFournisseur).subscribe(() => {
        this.loadFournisseurs();
        this.selectedFournisseur = null;
      });
    }
  }

  deleteFournisseur(id: number | undefined) {
    if (typeof id === 'number') {
      this.fournisseursService.deleteFournisseur(id).subscribe(() => {
        this.loadFournisseurs();
      });
    }
  }
  searchIce: string = '';
  searchTerm: string = '';

  triggerSearch() {
  // Save the search input to a term used for filtering
  this.searchTerm = this.searchIce;
}

filteredFournisseurs(): Fournisseur[] {
  if (!this.searchTerm || this.searchTerm.trim().length === 0) {
    return this.fournisseurs;
  }
  return this.fournisseurs.filter(f =>
    f.ice.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
  );
}
}
