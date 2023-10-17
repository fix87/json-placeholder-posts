// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PostsRoutingModule } from './posts-routing.module';
import { AngularMaterialModule } from 'src/app/shared';

// Components
import { PostsComponent } from './posts.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [PostsComponent, PostPreviewComponent, PostListComponent, PostDetailComponent, CommentComponent],
  imports: [CommonModule, PostsRoutingModule, AngularMaterialModule],
})
export class PostsModule {}
