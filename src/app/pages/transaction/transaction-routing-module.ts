import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoListComponent } from './po-list/po-list';
import { PoDetailComponent } from './po-detail/po-detail';

const routes: Routes = [
  {
    path: 'po',
    children: [
      { path: '', component: PoListComponent },
      { path: 'new', component: PoDetailComponent },
      { path: 'edit/:id', component: PoDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
