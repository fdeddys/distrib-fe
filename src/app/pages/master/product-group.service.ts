import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProductGroup {
  id: number;
  code: string;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  private groups: ProductGroup[] = [
    { id: 1, code: 'FNB', name: 'Food & Beverage', description: 'Makanan dan Minuman' },
    { id: 2, code: 'CHM', name: 'Chemical', description: 'Sabun, Pembersih, dll' },
    { id: 3, code: 'ETC', name: 'Others', description: 'Lain-lain' }
  ];

  getGroups(): Observable<ProductGroup[]> {
    return of(this.groups);
  }

  getGroupById(id: number): Observable<ProductGroup | undefined> {
    return of(this.groups.find(g => g.id === id));
  }

  saveGroup(group: ProductGroup): Observable<ProductGroup> {
    const idx = this.groups.findIndex(g => g.id === group.id);
    if (idx > -1) {
      this.groups[idx] = group;
    } else {
      group.id = this.groups.length + 1;
      this.groups.push(group);
    }
    return of(group);
  }

  deleteGroup(id: number): Observable<boolean> {
    this.groups = this.groups.filter(g => g.id !== id);
    return of(true);
  }
}
