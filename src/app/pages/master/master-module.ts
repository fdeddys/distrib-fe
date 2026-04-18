import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing-module';
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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    SalesListComponent,
    SalesDetailComponent,
    ProductGroupListComponent,
    ProductGroupDetailComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    WarehouseListComponent,
    WarehouseDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
