import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
  standalone: false
})
export class UserDetailComponent implements OnInit {
  current: User = { id: 0, username: '', fullName: '', role: 'Cashier', active: true };
  isEdit = false;

  constructor(private service: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getUserById(+id).subscribe(u => u && (this.current = { ...u }));
    }
  }

  onSave() {
    if (!this.current.username || !this.current.fullName) {
      Swal.fire('Error', 'Username dan Nama Lengkap wajib diisi!', 'error');
      return;
    }

    this.service.saveUser(this.current).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'User Berhasil Disimpan', timer: 1000, showConfirmButton: false });
      this.router.navigate(['/utility/user']);
    });
  }

  onBack() { this.router.navigate(['/utility/user']); }
}
