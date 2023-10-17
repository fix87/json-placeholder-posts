// Core
import { Component, Input } from '@angular/core';

// Models
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent {
  @Input({
    required: true,
  })
  public post = {} as Post;
}
