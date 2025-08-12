import { NgModule } from '@angular/core';
import { OriginesListComponent } from './origines-list/origines-list.component';
import { OriginesService } from './origines.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
       CommonModule,
       OriginesListComponent
      ],
  exports: [OriginesListComponent],
  providers: [OriginesService]
})
export class OriginesModule {}