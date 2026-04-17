import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AccessMapping {
  role: string;
  menus: string[]; // List of menu codes
}

@Injectable({
  providedIn: 'root'
})
export class AccessMatrixService {
  private mappings: AccessMapping[] = [
    { role: 'Admin', menus: ['dashboard', 'product_group', 'product', 'supplier', 'customer', 'sales', 'po', 'order', 'report_master', 'report_sales', 'report_purchase', 'report_daily', 'users', 'matrix', 'config-list'] },
    { role: 'Pharmacist', menus: ['dashboard', 'product', 'order', 'report_master', 'report_sales'] },
    { role: 'Purchase', menus: ['dashboard', 'po', 'report_purchase'] },
    { role: 'Cashier', menus: ['dashboard', 'report_daily'] }
  ];

  getMappingByRole(role: string): Observable<AccessMapping | undefined> {
    return of(this.mappings.find(m => m.role === role));
  }

  saveMapping(mapping: AccessMapping): Observable<boolean> {
    const index = this.mappings.findIndex(m => m.role === mapping.role);
    if (index > -1) {
      this.mappings[index] = mapping;
    } else {
      this.mappings.push(mapping);
    }
    return of(true);
  }
}
