// Core
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Libraries
import { Observable, forkJoin, map } from 'rxjs';

// Services
import { UserService } from 'src/app/services';

// Models
import { Post, User } from 'src/app/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public data$: Observable<{ user: User; posts: Post[] }>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    const userId = this.activatedRoute.snapshot.params['userId'];
    this.data$ = forkJoin([
      this.userService.getUser(userId),
      this.userService.getUserPosts(userId),
    ]).pipe(map(([user, posts]) => ({ user, posts })));
  }

  public getInitials(name: string): string {
    return name
      .split(' ')
      .map<string>((name) => name.charAt(0))
      .join('');
  }
}
