import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse, WarehouseService } from '../warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.html',
  standalone: false
})
export class WarehouseDetailComponent implements OnInit {
  current: Warehouse = { id: 0, code: '', name: '', status: true, warehouse_in: true, warehouse_out: true };
  isEdit = false;

  constructor(
    private service: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getWarehouseById(+id).subscribe((d: any) => d && (this.current = { ...d }));
    }
  }

  onSave() {
    if (!this.current.code || !this.current.name) {
      Swal.fire('Error', 'Code dan Nama wajib diisi', 'error');
      return;
    }
    this.service.saveWarehouse(this.current).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'Berhasil', timer: 1000, showConfirmButton: false });
      this.router.navigate(['/master/warehouse']);
    });
  }

  onBack() { this.router.navigate(['/master/warehouse']); }
}
