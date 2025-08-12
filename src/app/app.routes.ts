import { Routes } from '@angular/router';
import { FournisseursListComponent } from './modules/fournisseurs/fournisseurs-list/fournisseurs-list.component';
import { OriginesListComponent } from './modules/origines/origines-list/origines-list.component';


export const routes: Routes = [
    { path: '', redirectTo: 'fournisseurs', pathMatch: 'full' },
    {
      path: 'fournisseurs',
      loadComponent: () =>
        import('./modules/fournisseurs/fournisseurs-list/fournisseurs-list.component').then(m => m.FournisseursListComponent)
    },
    {
      path: 'origines',
      loadComponent: () =>
        import('./modules/origines/origines-list/origines-list.component').then(m => m.OriginesListComponent)
    }
  ];
