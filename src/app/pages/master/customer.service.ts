import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Customer {
  id: number;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isCredit: boolean;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
    { id: 1, code: 'CUST-001', name: 'Bpk. Rahmad', address: 'Jl. Melati No. 5', phone: '0811223344', email: 'rahmad@mail.com', isCredit: true, active: true },
    { id: 2, code: 'CUST-002', name: 'Ibu Siska', address: 'Perum Gading Indah B3', phone: '0855667788', email: 'siska@mail.com', isCredit: false, active: true }
  ];

  getCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }

  getCustomerById(id: number): Observable<Customer | undefined> {
    return of(this.customers.find(c => c.id === id));
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    const idx = this.customers.findIndex(c => c.id === customer.id);
    if (idx > -1) {
      this.customers[idx] = customer;
    } else {
      customer.id = this.customers.length + 1;
      this.customers.push(customer);
    }
    return of(customer);
  }

  deleteCustomer(id: number): Observable<boolean> {
    this.customers = this.customers.filter(c => c.id !== id);
    return of(true);
  }
}
