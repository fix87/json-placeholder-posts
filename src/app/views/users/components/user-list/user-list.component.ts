// Core
import { Component } from '@angular/core';

// Libraries
import { Observable } from 'rxjs';

// Services
import { UserService } from 'src/app/services';

// Models
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public users$: Observable<User[]>;

  public constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }
}
