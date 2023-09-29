// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PostsRoutingModule } from './posts-routing.module';
import { AngularMaterialModule } from 'src/app/shared';

// Components
import { PostsComponent } from './posts.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [CommonModule, PostsRoutingModule, AngularMaterialModule],
})
export class PostsModule {}
