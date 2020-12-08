import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllComplaintsRoutingModule } from './all-complaints-routing.module';
import { AllComplaintsComponent } from './all-complaints.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllComplaintsRoutingModule,
    AllComplaintsComponent
  ],
  exports: [AllComplaintsComponent, AllComplaintsRoutingModule ]
})
export class AllComplaintsModule { }
