import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { ComingSoon } from '../pages/shared/coming-soon/coming-soon';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadChildren: () => import('../pages/dashboard/dashboard-module').then(m => m.DashboardModule) 
      },
      { 
        path: 'master', 
        loadChildren: () => import('../pages/master/master-module').then(m => m.MasterModule) 
      },
      { 
        path: 'utility', 
        loadChildren: () => import('../pages/utility/utility-module').then(m => m.UtilityModule) 
      },
      { 
        path: 'transaksi', 
        loadChildren: () => import('../pages/transaction/transaction-module').then(m => m.TransactionModule) 
      },
      { path: 'report/:any', component: ComingSoon }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
