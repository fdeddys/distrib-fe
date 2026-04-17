import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  search = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(u => 
      u.username.toLowerCase().includes(this.search.toLowerCase()) || 
      u.fullName.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  onNew() { this.router.navigate(['/utility/user/new']); }
  onEdit(id: number) { this.router.navigate(['/utility/user/edit', id]); }

  onDelete(id: number) {
    Swal.fire({
      title: 'Hapus User?',
      text: 'User ini tidak akan bisa login lagi.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus'
    }).then(r => {
      if (r.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          Swal.fire('Terhapus', 'User berhasil dihapus', 'success');
          this.load();
        });
      }
    });
  }
}
