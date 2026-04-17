import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilityRoutingModule } from './utility-routing-module';

import { UserListComponent } from './user-list/user-list';
import { UserDetailComponent } from './user-detail/user-detail';
import { AccessMatrixComponent } from './access-matrix/access-matrix';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    AccessMatrixComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilityRoutingModule
  ]
})
export class UtilityModule { }
