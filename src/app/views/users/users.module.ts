// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { UsersRoutingModule } from './users-routing.module';
import { AngularMaterialModule } from 'src/app/shared';

// Components
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [UsersComponent, UserListComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule, AngularMaterialModule],
})
export class UsersModule {}
