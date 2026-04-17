import { Component, OnInit } from '@angular/core';
import { Menu, MenuService } from '../menu.service';
import { AccessMatrixService } from '../access-matrix.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-matrix',
  templateUrl: './access-matrix.html',
  styleUrl: './access-matrix.css',
  standalone: false
})
export class AccessMatrixComponent implements OnInit {
  roles: string[] = ['Admin', 'Pharmacist', 'Purchase', 'Cashier'];
  selectedRole: string = 'Admin';
  
  menus: Menu[] = [];
  selectedMenus: string[] = [];

  constructor(
    private menuService: MenuService,
    private accessService: AccessMatrixService
  ) {}

  ngOnInit(): void {
    this.menuService.getAllMenus().subscribe(data => this.menus = data);
    this.loadMapping();
  }

  loadMapping() {
    this.accessService.getMappingByRole(this.selectedRole).subscribe(m => {
      this.selectedMenus = m ? [...m.menus] : [];
    });
  }

  onRoleChange() {
    this.loadMapping();
  }

  isMenuSelected(code: string): boolean {
    return this.selectedMenus.includes(code);
  }

  toggleMenu(code: string) {
    const index = this.selectedMenus.indexOf(code);
    if (index > -1) {
      this.selectedMenus.splice(index, 1);
    } else {
      this.selectedMenus.push(code);
    }
  }

  save() {
    this.accessService.saveMapping({
      role: this.selectedRole,
      menus: this.selectedMenus
    }).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Mapping Saved',
        text: `Hak akses untuk role ${this.selectedRole} telah diperbarui.`,
        timer: 1500,
        showConfirmButton: false
      });
    });
  }
}
