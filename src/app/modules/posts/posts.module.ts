// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PostsRoutingModule } from './posts-routing.module';

// Components
import { PostsComponent } from './posts.component';
import { AngularMaterialModule } from 'src/app/shared';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRoutingModule, AngularMaterialModule],
})
export class PostsModule {}
