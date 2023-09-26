// Core
import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from './services/user.service';

// Models
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public users: User[] = [];

  public constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
}
