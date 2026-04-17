import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Sales {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private salesList: Sales[] = [
    { id: 1, code: 'SLS-001', name: 'Andi Pratama', phone: '08123445566', email: 'andi@apotik.com', gender: 'L', active: true },
    { id: 2, code: 'SLS-002', name: 'Budi Santoso', phone: '08567788990', email: 'budi@apotik.com', gender: 'L', active: true },
    { id: 3, code: 'SLS-003', name: 'Citra Dewi', phone: '08190011223', email: 'citra@apotik.com', gender: 'P', active: false }
  ];

  getSales(): Observable<Sales[]> {
    return of(this.salesList);
  }

  getSalesById(id: number): Observable<Sales | undefined> {
    return of(this.salesList.find(s => s.id === id));
  }

  saveSales(sales: Sales): Observable<Sales> {
    const index = this.salesList.findIndex(s => s.id === sales.id);
    if (index > -1) {
      this.salesList[index] = sales;
    } else {
      sales.id = this.salesList.length + 1;
      this.salesList.push(sales);
    }
    return of(sales);
  }

  deleteSales(id: number): Observable<boolean> {
    this.salesList = this.salesList.filter(s => s.id !== id);
    return of(true);
  }
}
