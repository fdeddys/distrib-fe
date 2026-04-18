import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product/product-list/product-list';
import { ProductDetailComponent } from '../product/product-detail/product-detail';
import { SupplierListComponent } from '../supplier/supplier-list/supplier-list';
import { SupplierDetailComponent } from '../supplier/supplier-detail/supplier-detail';
import { SalesListComponent } from '../sales/sales-list/sales-list';
import { SalesDetailComponent } from '../sales/sales-detail/sales-detail';
import { ProductGroupListComponent } from './product-group-list/product-group-list';
import { ProductGroupDetailComponent } from './product-group-detail/product-group-detail';
import { CustomerListComponent } from './customer-list/customer-list';
import { CustomerDetailComponent } from './customer-detail/customer-detail';
import { WarehouseListComponent } from './warehouse-list/warehouse-list';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail';

const routes: Routes = [
  { 
    path: 'warehouse', 
    children: [
      { path: '', component: WarehouseListComponent },
      { path: 'new', component: WarehouseDetailComponent },
      { path: 'edit/:id', component: WarehouseDetailComponent }
    ]
  },
  { 
    path: 'customer', 
    children: [
      { path: '', component: CustomerListComponent },
      { path: 'new', component: CustomerDetailComponent },
      { path: 'edit/:id', component: CustomerDetailComponent }
    ]
  },
  { 
    path: 'group', 
    children: [
      { path: '', component: ProductGroupListComponent },
      { path: 'new', component: ProductGroupDetailComponent },
      { path: 'edit/:id', component: ProductGroupDetailComponent }
    ]
  },
  { 
    path: 'product', 
    children: [
      { path: '', component: ProductListComponent },
      { path: 'new', component: ProductDetailComponent },
      { path: 'edit/:id', component: ProductDetailComponent }
    ]
  },
  { 
    path: 'sales', 
    children: [
      { path: '', component: SalesListComponent },
      { path: 'new', component: SalesDetailComponent },
      { path: 'edit/:id', component: SalesDetailComponent }
    ]
  },
  { 
    path: 'supplier', 
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
export class MasterRoutingModule { }
