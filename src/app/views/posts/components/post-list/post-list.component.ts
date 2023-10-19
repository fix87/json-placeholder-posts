// Core
import { Component } from '@angular/core';

// Libraries
import { Observable } from 'rxjs';

// Services
import { PostService } from 'src/app/services';

// Models
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  public posts$: Observable<Post[]>;

  public constructor(private postService: PostService) {
    this.posts$ = this.postService.getPosts();
  }
}
