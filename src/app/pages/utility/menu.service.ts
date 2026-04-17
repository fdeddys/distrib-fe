import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Menu {
  code: string;
  name: string;
  parent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus: Menu[] = [
    { code: 'dashboard', name: 'Dashboard' },
    { code: 'product', name: 'Product', parent: 'Master' },
    { code: 'supplier', name: 'Supplier', parent: 'Master' },
    { code: 'sales', name: 'Sales', parent: 'Master' },
    { code: 'po', name: 'Create PO', parent: 'Transaksi' },
    { code: 'order', name: 'Create Order', parent: 'Transaksi' },
    { code: 'report_master', name: 'Laporan Master', parent: 'Report' },
    { code: 'report_sales', name: 'Laporan Penjualan', parent: 'Report' },
    { code: 'report_purchase', name: 'Laporan Pembelian', parent: 'Report' },
    { code: 'report_daily', name: 'Laporan Harian', parent: 'Report' },
    { code: 'users', name: 'User Management', parent: 'Utility' },
    { code: 'matrix', name: 'Access Matrix', parent: 'Utility' },
    { code: 'config-list', name: 'Config List', parent: 'Utility' }
  ];

  getAllMenus(): Observable<Menu[]> {
    return of(this.menus);
  }
}
