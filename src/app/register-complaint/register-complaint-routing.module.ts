import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComplaintComponent } from './register-complaint.component';


const routes: Routes = [
  { path: 'complaints', component: RegisterComplaintComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterComplaintRoutingModule { }
