import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComplaintsComponent } from './all-complaints.component';


const routes: Routes = [
  { path: 'allcomplaints', component: AllComplaintsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllComplaintsRoutingModule { }
