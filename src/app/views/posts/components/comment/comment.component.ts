// Core
import { Component, Input } from '@angular/core';

// Modules
import { Comment } from 'src/app/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input({
    required: true,
  })
  public comment = {} as Comment;
}
