import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse, WarehouseService } from '../warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.html',
  standalone: false
})
export class WarehouseListComponent implements OnInit {
  list: Warehouse[] = [];

  constructor(private service: WarehouseService, private router: Router) {}

  ngOnInit(): void {
    this.service.getWarehouses().subscribe(d => this.list = d);
  }

  onNew() { this.router.navigate(['/master/warehouse/new']); }
  onEdit(id: number) { this.router.navigate(['/master/warehouse/edit', id]); }

  onDelete(id: number) {
    Swal.fire({ title: 'Hapus Gudang?', icon: 'warning', showCancelButton: true }).then(r => {
      if (r.isConfirmed) {
        this.service.deleteWarehouse(id).subscribe(() => {
          Swal.fire('Terhapus', '', 'success');
          this.service.getWarehouses().subscribe(d => this.list = d);
        });
      }
    });
  }
}
