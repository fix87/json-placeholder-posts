// Core
import { Component, OnInit } from '@angular/core';

// Services
import { PostService } from 'src/app/services';

// Models
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];

  public constructor(private postService: PostService) {}

  public ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
