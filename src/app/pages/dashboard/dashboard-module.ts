import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: Dashboard }
];

import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [Dashboard],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BaseChartDirective
  ]
})
export class DashboardModule { }
