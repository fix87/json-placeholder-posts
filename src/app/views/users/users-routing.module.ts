// Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':userId',
        component: UserDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
