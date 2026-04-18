import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Warehouse {
  id: number;
  code: string;
  name: string;
  status: boolean;
  warehouse_in: boolean;
  warehouse_out: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private warehouses: Warehouse[] = [
    { id: 1, code: 'GUT', name: 'Gudang Utama', status: true, warehouse_in: true, warehouse_out: true },
    { id: 2, code: 'GDP', name: 'Gudang Depan', status: true, warehouse_in: false, warehouse_out: true },
    { id: 3, code: 'GDR', name: 'Gudang Retur', status: true, warehouse_in: true, warehouse_out: false }
  ];

  getWarehouses(): Observable<Warehouse[]> {
    return of(this.warehouses);
  }

  getWarehouseById(id: number): Observable<Warehouse | undefined> {
    return of(this.warehouses.find(w => w.id === id));
  }

  saveWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    const idx = this.warehouses.findIndex(w => w.id === warehouse.id);
    if (idx > -1) {
      this.warehouses[idx] = warehouse;
    } else {
      warehouse.id = this.warehouses.length + 1;
      this.warehouses.push(warehouse);
    }
    return of(warehouse);
  }

  deleteWarehouse(id: number): Observable<boolean> {
    this.warehouses = this.warehouses.filter(w => w.id !== id);
    return of(true);
  }
}
