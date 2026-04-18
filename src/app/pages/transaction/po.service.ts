import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PoDetail {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  uomSmall: string;
  uomBig: string;
  qtyRatio: number;
  price: number;
  discAmount: number;
  total: number;
}

export interface PoHeader {
  id: number;
  poNumber: string;
  supplierId: number;
  supplierName: string;
  warehouseId: number;
  warehouseName: string;
  type: 'CASH' | 'CREDIT';
  status: 'NEW' | 'APPROVED' | 'RECEIVED' | 'CANCELED' | 'PAID';
  notes: string;
  poCreated: Date;
  poApproval?: Date;
  userCreated: string;
  userUpdated: string;
  isTax: boolean;
  subTotal: number;
  discHeader: number;
  tax: number;
  grandTotal: number;
  details: PoDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class PoService {
  private poList: PoHeader[] = [
    {
      id: 1, poNumber: 'PO/2026/04/0001', supplierId: 1, supplierName: 'PT. Farmasi Jaya',
      warehouseId: 1, warehouseName: 'Gudang Utama', type: 'CREDIT', status: 'NEW',
      notes: 'Urgent stok lebaran', poCreated: new Date(), userCreated: 'Admin', userUpdated: 'Admin',
      isTax: true, subTotal: 500000, discHeader: 0, tax: 55000, grandTotal: 555000,
      details: []
    }
  ];

  getPos(): Observable<PoHeader[]> {
    return of(this.poList);
  }

  getPoById(id: number): Observable<PoHeader | undefined> {
    return of(this.poList.find(p => p.id === id));
  }

  savePo(po: PoHeader): Observable<PoHeader> {
    const idx = this.poList.findIndex(p => p.id === po.id);
    if (idx > -1) {
      this.poList[idx] = po;
    } else {
      po.id = this.poList.length + 1;
      po.poNumber = `PO/2026/04/000${po.id}`;
      this.poList.push(po);
    }
    return of(po);
  }

  approvePo(id: number): Observable<boolean> {
    const po = this.poList.find(p => p.id === id);
    if (po) po.status = 'APPROVED';
    return of(true);
  }

  cancelPo(id: number): Observable<boolean> {
    const po = this.poList.find(p => p.id === id);
    if (po) po.status = 'CANCELED';
    return of(true);
  }

  deletePo(id: number): Observable<boolean> {
    this.poList = this.poList.filter(p => p.id !== id);
    return of(true);
  }
}
