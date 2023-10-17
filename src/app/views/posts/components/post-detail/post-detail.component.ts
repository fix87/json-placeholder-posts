// Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Libraries
import { finalize, forkJoin, switchMap, tap } from 'rxjs';

// Services
import { PostService, UserService } from 'src/app/services';

// Models
import { Comment, Post, User } from 'src/app/models';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  public post = {} as Post;
  public comments: Comment[] = [];
  public user = {} as User;
  public postId: string;
  public isLoading = true;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  public ngOnInit(): void {
    forkJoin([
      this.postService.getPost(this.postId).pipe(
        switchMap((post) => {
          this.post = post;
          return this.userService.getUser(this.post.userId);
        })
      ),
      this.postService.getPostComments(this.postId),
    ])
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.user = data[0];
        this.comments = data[1];
      });
  }
}
