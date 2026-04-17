import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  code: string;
  name: string;
  sku: string;
  artikel: string;
  status: 'Active' | 'Inactive';
  uomSmall: string;
  uomBig: string;
  qtyRatio: number;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { 
      id: 1, code: 'RTL-001', name: 'Indomie Goreng', sku: '888123', artikel: 'IND-G1', status: 'Active', 
      uomSmall: 'PCS', uomBig: 'DUS', qtyRatio: 40, price: 3500, category: 'FNB' 
    },
    { 
      id: 2, code: 'RTL-002', name: 'Sabun Lifebuoy Red', sku: '777456', artikel: 'LB-R1', status: 'Active', 
      uomSmall: 'PCS', uomBig: 'LUSIN', qtyRatio: 12, price: 5000, category: 'CHM' 
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  saveProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    } else {
      product.id = this.products.length + 1;
      this.products.push(product);
    }
    return of(product);
  }

  deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter(p => p.id !== id);
    return of(true);
  }
}
