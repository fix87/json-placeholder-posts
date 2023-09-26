// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CommentsRoutingModule } from './comments-routing.module';

// Components
import { CommentsComponent } from './comments.component';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, CommentsRoutingModule],
})
export class CommentsModule {}
