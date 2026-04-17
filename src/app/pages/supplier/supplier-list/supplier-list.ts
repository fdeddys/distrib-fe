import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier, SupplierService } from '../supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
  standalone: false
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  
  filterName: string = '';
  filterStatus: string = '';

  pageSize: number = 5;
  currentPage: number = 1;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredSuppliers = this.suppliers.filter(s => {
      const matchName = s.nama.toLowerCase().includes(this.filterName.toLowerCase());
      const matchStatus = this.filterStatus ? (s.active.toString() === this.filterStatus) : true;
      return matchName && matchStatus;
    });
    this.currentPage = 1;
  }

  get paginatedSuppliers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredSuppliers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredSuppliers.length / this.pageSize);
  }

  onNew() {
    this.router.navigate(['/master/supplier/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/master/supplier/edit', id]);
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data supplier ini akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0ea5e9',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(id).subscribe(() => {
          Swal.fire('Terhapus!', 'Data supplier berhasil dihapus.', 'success');
          this.loadData();
        });
      }
    });
  }

  onPrint() {
    window.print();
  }
}
