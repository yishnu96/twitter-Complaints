import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBoxRoutingModule } from './chat-box-routing.module';
import { ChatBoxComponent } from './chat-box.component';


@NgModule({
  declarations: [ ChatBoxComponent ],
  imports: [
    CommonModule,
    ChatBoxRoutingModule
  ],
  exports: [ChatBoxComponent, ChatBoxRoutingModule]
})
export class ChatBoxModule { }
