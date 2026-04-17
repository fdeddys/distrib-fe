import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: false
})
export class Header {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onChangePassword() {
    Swal.fire({
      title: 'Ubah Password',
      html: `
        <div class="flex flex-col gap-4 text-left p-2">
          <div>
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Password Lama</label>
            <input type="password" id="oldPass" class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" placeholder="••••••••">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Password Baru</label>
            <input type="password" id="newPass" class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" placeholder="••••••••">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Konfirmasi Password Baru</label>
            <input type="password" id="confPass" class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" placeholder="••••••••">
          </div>
          <p class="text-[10px] text-slate-400 italic font-medium mt-1">* Min 8 karakter, mengandung angka & huruf.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Simpan Password',
      confirmButtonColor: '#0ea5e9',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const oldP = (Swal.getPopup()?.querySelector('#oldPass') as HTMLInputElement).value;
        const newP = (Swal.getPopup()?.querySelector('#newPass') as HTMLInputElement).value;
        const confP = (Swal.getPopup()?.querySelector('#confPass') as HTMLInputElement).value;

        if (!oldP || !newP || !confP) {
          Swal.showValidationMessage('Semua field wajib diisi!');
          return false;
        }
        if (newP !== confP) {
          Swal.showValidationMessage('Konfirmasi password tidak cocok!');
          return false;
        }
        if (newP.length < 8) {
          Swal.showValidationMessage('Password minimal 8 karakter!');
          return false;
        }
        
        // Regex: Huruf dan Angka
        const hasLetter = /[a-zA-Z]/.test(newP);
        const hasNumber = /[0-9]/.test(newP);
        if (!hasLetter || !hasNumber) {
          Swal.showValidationMessage('Password harus mengandung huruf dan angka!');
          return false;
        }

        return { oldP, newP };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil', 'Password Anda telah diperbarui.', 'success');
      }
    });
  }

  onLogout() {
    Swal.fire({
      title: 'Logout?',
      text: 'Apakah Anda yakin ingin keluar dari sistem?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar',
      confirmButtonColor: '#f43f5e',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
