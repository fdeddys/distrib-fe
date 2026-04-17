import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list';
import { UserDetailComponent } from './user-detail/user-detail';
import { AccessMatrixComponent } from './access-matrix/access-matrix';
import { ConfigListComponent } from './config-app/config-list/config-list';
import { ConfigDetailComponent } from './config-app/config-detail/config-detail';

const routes: Routes = [
  { 
    path: 'user', 
    children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: UserDetailComponent },
      { path: 'edit/:id', component: UserDetailComponent }
    ]
  },
  { path: 'matrix', component: AccessMatrixComponent },
  { 
    path: 'config-list', 
    children: [
      { path: '', component: ConfigListComponent },
      { path: ':type', component: ConfigDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
