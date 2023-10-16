// Core
import { Component, OnInit } from '@angular/core';

// Services
import { CommentService, PostService } from 'src/app/services';

// Models
import { Post } from 'src/app/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];

  public constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  public ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
