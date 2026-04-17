import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { AccessMatrixService } from '../../pages/utility/access-matrix.service';

interface MenuItem {
  code: string;
  name: string;
  icon: string;
  route?: string;
  isOpen?: boolean;
  subMenus?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: false
})
export class Sidebar implements OnInit {
  
  public menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private accessService: AccessMatrixService
  ) {}

  ngOnInit(): void {
    this.filterMenu();
  }

  // Gunakan fungsi untuk mendapatkan struktur menu "bersih" setiap saat
  private getInitialMenuStructure(): MenuItem[] {
    return [
      {
        code: 'dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        code: 'master',
        name: 'Master',
        icon: 'database',
        isOpen: false,
        subMenus: [
          { code: 'product_group', name: 'Group Product', icon: 'dot', route: '/master/group' },
          { code: 'product', name: 'Product', icon: 'dot', route: '/master/product' },
          { code: 'supplier', name: 'Supplier', icon: 'dot', route: '/master/supplier' },
          { code: 'customer', name: 'Customer', icon: 'dot', route: '/master/customer' },
          { code: 'sales', name: 'Sales', icon: 'dot', route: '/master/sales' }
        ]
      },
      {
        code: 'transaksi',
        name: 'Transaksi',
        icon: 'shopping-cart',
        isOpen: false,
        subMenus: [
          { code: 'po', name: 'Create PO', icon: 'dot', route: '/transaksi/po' },
          { code: 'order', name: 'Create Order', icon: 'dot', route: '/transaksi/order' }
        ]
      },
      {
        code: 'report',
        name: 'Report',
        icon: 'bar-chart',
        isOpen: false,
        subMenus: [
          { code: 'report_master', name: 'Laporan Master', icon: 'dot', route: '/report/master' },
          { code: 'report_sales', name: 'Laporan Penjualan', icon: 'dot', route: '/report/sales' },
          { code: 'report_purchase', name: 'Laporan Pembelian', icon: 'dot', route: '/report/purchase' },
          { code: 'report_daily', name: 'Laporan Harian', icon: 'dot', route: '/report/daily' }
        ]
      },
      {
        code: 'utility',
        name: 'Utility',
        icon: 'settings',
        isOpen: false,
        subMenus: [
          { code: 'users', name: 'User Management', icon: 'dot', route: '/utility/user' },
          { code: 'matrix', name: 'Access Matrix', icon: 'dot', route: '/utility/matrix' },
          { code: 'config-list', name: 'Config List', icon: 'dot', route: '/utility/config-list' }
        ]
      }
    ];
  }

  filterMenu() {
    const role = this.authService.getRole();
    this.accessService.getMappingByRole(role).subscribe(mapping => {
      const allowedCodes = mapping ? mapping.menus : [];
      
      // Ambil struktur full yang baru ( fresh copy )
      const fullMenu = this.getInitialMenuStructure();

      this.menuItems = fullMenu.filter(item => {
        // Jika top level menu punya submenu, cek apakah ada minimal satu submenu yang boleh
        if (item.subMenus) {
          const filteredSub = item.subMenus.filter(sub => allowedCodes.includes(sub.code));
          if (filteredSub.length > 0) {
            item.subMenus = filteredSub; // Modifikasi copy, bukan aslinya
            return true;
          }
          return false;
        }
        // Jika menu tunggal (seperti dashboard), cek langsung
        return allowedCodes.includes(item.code);
      });
    });
  }

  toggleMenu(item: MenuItem) {
    if (item.subMenus) {
      item.isOpen = !item.isOpen;
    }
  }
}
