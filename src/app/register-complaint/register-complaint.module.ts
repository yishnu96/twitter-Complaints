import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComplaintComponent } from './register-complaint.component';
import { RegisterComplaintRoutingModule } from './register-complaint-routing.module';


@NgModule({
  declarations: [RegisterComplaintComponent],
  imports: [
    CommonModule,
    RegisterComplaintRoutingModule
  ],
  exports : [ RegisterComplaintRoutingModule, RegisterComplaintComponent]
})
export class RegisterComplaintModule { }
