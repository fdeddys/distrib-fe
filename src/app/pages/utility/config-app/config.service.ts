import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ConfigHeader {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ConfigDetail {
  id: number;
  code: string;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // Simulasikan data Header dari Backend
  private headers: ConfigHeader[] = [
    { id: 'uom', name: 'Master UOM', description: 'Satuan Barang (pcs, kg, liter)', icon: 'box' },
    { id: 'gender', name: 'Master Gender', description: 'Jenis Kelamin (Laki-laki, Perempuan)', icon: 'users' },
    { id: 'payment_type', name: 'Metode Pembayaran', description: 'Cash, Transfer, Debit', icon: 'credit-card' }
  ];

  // Simulasikan Bank Data Detail untuk semua config
  private allDetails: { [key: string]: ConfigDetail[] } = {
    'uom': [
      { id: 1, code: 'PCS', name: 'Pieces' },
      { id: 2, code: 'KG', name: 'Kilogram' },
      { id: 3, code: 'LTR', name: 'Liter' },
      { id: 4, code: 'DUS', name: 'Dus' }
    ],
    'gender': [
      { id: 1, code: 'L', name: 'Laki-laki' },
      { id: 2, code: 'P', name: 'Perempuan' }
    ],
    'payment_type': [
      { id: 1, code: 'CASH', name: 'Tunai' },
      { id: 2, code: 'TRF', name: 'Transfer Bank' }
    ]
  };

  getConfigHeaders(): Observable<ConfigHeader[]> {
    return of(this.headers);
  }

  getConfigDetails(type: string): Observable<ConfigDetail[]> {
    return of(this.allDetails[type] || []);
  }

  saveConfigDetail(type: string, item: ConfigDetail): Observable<ConfigDetail> {
    if (!this.allDetails[type]) this.allDetails[type] = [];
    const list = this.allDetails[type];
    const idx = list.findIndex(i => i.id === item.id);
    
    if (idx > -1) {
      list[idx] = item;
    } else {
      item.id = list.length + 1;
      list.push(item);
    }
    return of(item);
  }

  deleteConfigDetail(type: string, id: number): Observable<boolean> {
    if (this.allDetails[type]) {
      this.allDetails[type] = this.allDetails[type].filter(i => i.id !== id);
    }
    return of(true);
  }
}
