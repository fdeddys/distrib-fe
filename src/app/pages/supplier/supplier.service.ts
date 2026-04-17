import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Supplier {
  id: number;
  code: string;
  nama: string;
  email: string;
  alamat: string;
  contact: string;
  hp: string;
  active: boolean;
  top: number; // Term of Payment
  contactPerson: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliers: Supplier[] = [
    { 
      id: 1, code: 'SUP-001', nama: 'PT. Pharos Indonesia', email: 'info@pharos.co.id', 
      alamat: 'Jakarta', contact: '021-123456', hp: '08123456789', 
      active: true, top: 30, contactPerson: 'Budi' 
    },
    { 
      id: 2, code: 'SUP-002', nama: 'Kimia Farma', email: 'sales@kimiafarma.co.id', 
      alamat: 'Bandung', contact: '022-654321', hp: '08198765432', 
      active: true, top: 45, contactPerson: 'Siti' 
    }
  ];

  getSuppliers(): Observable<Supplier[]> {
    return of(this.suppliers);
  }

  getSupplierById(id: number): Observable<Supplier | undefined> {
    return of(this.suppliers.find(s => s.id === id));
  }

  saveSupplier(supplier: Supplier): Observable<Supplier> {
    const index = this.suppliers.findIndex(s => s.id === supplier.id);
    if (index > -1) {
      this.suppliers[index] = supplier;
    } else {
      supplier.id = this.suppliers.length + 1;
      this.suppliers.push(supplier);
    }
    return of(supplier);
  }

  deleteSupplier(id: number): Observable<boolean> {
    this.suppliers = this.suppliers.filter(s => s.id !== id);
    return of(true);
  }
}
