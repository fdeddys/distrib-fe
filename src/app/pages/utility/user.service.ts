import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'Admin' | 'Pharmacist' | 'Cashier';
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, username: 'admin', fullName: 'Administrator Utama', role: 'Admin', active: true },
    { id: 2, username: 'budi', fullName: 'Budi Apoteker', role: 'Pharmacist', active: true },
    { id: 3, username: 'siti', fullName: 'Siti Kasir', role: 'Cashier', active: true }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id));
  }

  saveUser(user: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.users[index] = user;
    } else {
      user.id = this.users.length + 1;
      this.users.push(user);
    }
    return of(user);
  }

  deleteUser(id: number): Observable<boolean> {
    this.users = this.users.filter(u => u.id !== id);
    return of(true);
  }
}
