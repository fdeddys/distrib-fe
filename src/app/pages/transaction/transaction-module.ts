import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing-module';
import { PoListComponent } from './po-list/po-list';
import { PoDetailComponent } from './po-detail/po-detail';

@NgModule({
  declarations: [
    PoListComponent,
    PoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
