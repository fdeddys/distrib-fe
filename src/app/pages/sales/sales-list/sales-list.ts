import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sales, SalesService } from '../sales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.html',
  styleUrl: './sales-list.css',
  standalone: false
})
export class SalesListComponent implements OnInit {
  list: Sales[] = [];
  filteredList: Sales[] = [];
  filterName = '';

  pageSize = 5;
  currentPage = 1;

  constructor(private service: SalesService, private router: Router) {}

  ngOnInit(): void { this.loadData(); }

  loadData() {
    this.service.getSales().subscribe(data => {
      this.list = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredList = this.list.filter(s => s.name.toLowerCase().includes(this.filterName.toLowerCase()));
    this.currentPage = 1;
  }

  get paginated() {
    return this.filteredList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  get totalPages() { return Math.ceil(this.filteredList.length / this.pageSize); }

  onNew() { this.router.navigate(['/master/sales/new']); }
  onEdit(id: number) { this.router.navigate(['/master/sales/edit', id]); }

  onDelete(id: number) {
    Swal.fire({
      title: 'Hapus Sales?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus'
    }).then(res => {
      if (res.isConfirmed) {
        this.service.deleteSales(id).subscribe(() => {
          Swal.fire('Berhasil', 'Sales dihapus', 'success');
          this.loadData();
        });
      }
    });
  }
}
