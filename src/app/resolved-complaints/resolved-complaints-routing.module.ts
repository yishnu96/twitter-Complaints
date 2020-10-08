import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolvedComplaintsComponent } from './resolved-complaints.component';


const routes: Routes = [
  { path: 'resolved', component: ResolvedComplaintsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvedComplaintsRoutingModule { }
