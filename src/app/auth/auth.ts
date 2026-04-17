import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from '../pages/utility/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'apotik_auth_token';
  private readonly ROLE_KEY = 'apotik_user_role';
  private readonly USER_DISPLAY_KEY = 'apotik_user_display';

  private userService = inject(UserService);

  login(username: string, password: string): Observable<string> {
    // Simulasi login menggunakan data dari UserService
    return this.userService.getUsers().pipe(
      map(users => {
        const found = users.find(u => u.username === username);
        
        // Asumsi password semua user di mock adalah '123'
        if (found && password === '123') {
          if (!found.active) throw new Error('Akun Anda sedang dinonaktifkan!');

          const token = 'mock-jwt-' + found.username + '-' + Date.now();
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.ROLE_KEY, found.role);
          localStorage.setItem(this.USER_DISPLAY_KEY, found.fullName);
          return token;
        }
        
        throw new Error('Username atau Password salah!');
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_DISPLAY_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string {
    return localStorage.getItem(this.ROLE_KEY) || 'Guest';
  }

  getUserName(): string {
    return localStorage.getItem(this.USER_DISPLAY_KEY) || 'User';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
