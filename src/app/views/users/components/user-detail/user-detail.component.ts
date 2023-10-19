// Core
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Libraries
import { Observable } from 'rxjs';

// Services
import { UserService } from 'src/app/services';

// Models
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public user$: Observable<User>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    const userId = this.activatedRoute.snapshot.params['userId'];
    this.user$ = this.userService.getUser(userId);
  }

  public getInitials(name: string): string {
    return name
      .split(' ')
      .map<string>((name) => name.charAt(0))
      .join('');
  }
}
