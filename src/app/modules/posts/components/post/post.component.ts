// Core
import { Component, Input } from '@angular/core';

// Models
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input({
    required: true,
  })
  public post: Post = {} as Post;
}
