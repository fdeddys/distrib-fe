import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierListComponent } from '../supplier/supplier-list/supplier-list';
import { SupplierDetailComponent } from '../supplier/supplier-detail/supplier-detail';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: SupplierListComponent },
      { path: 'new', component: SupplierDetailComponent },
      { path: 'edit/:id', component: SupplierDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
