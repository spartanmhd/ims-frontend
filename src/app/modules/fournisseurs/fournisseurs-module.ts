import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseursListComponent } from './fournisseurs-list/fournisseurs-list.component';
import { FournisseursService } from './fournisseurs.service';

@NgModule({
  imports: [
    CommonModule,
    FournisseursListComponent
  ],
  providers: [FournisseursService]

})
export class FournisseursModule { }
  