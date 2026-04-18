import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoHeader, PoService } from '../po.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.html',
  standalone: false
})
export class PoListComponent implements OnInit {
  poList: PoHeader[] = [];
  filteredList: PoHeader[] = [];

  // Filter models
  startDate: string = '';
  endDate: string = '';
  supplierSearch: string = '';
  statusSearch: string = '';

  statusOptions = ['NEW', 'APPROVED', 'RECEIVED', 'CANCELED', 'PAID'];

  constructor(private service: PoService, private router: Router) {}

  ngOnInit(): void {
    this.initDefaultDates();
    this.onSearch();
  }

  initDefaultDates() {
    const today = new Date();
    this.startDate = this.formatDate(today);
    this.endDate = this.formatDate(today);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSearch(): void {
    this.service.getPos().subscribe((data: PoHeader[]) => {
      this.poList = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredList = this.poList.filter(po => {
      const poDate = new Date(po.poCreated);
      poDate.setHours(0, 0, 0, 0);
      
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;
      if (start) start.setHours(0,0,0,0);
      if (end) end.setHours(0,0,0,0);

      const matchDate = (!start || poDate >= start) && (!end || poDate <= end);
      const matchSupplier = !this.supplierSearch || po.supplierName.toLowerCase().includes(this.supplierSearch.toLowerCase());
      const matchStatus = !this.statusSearch || po.status === this.statusSearch;

      return matchDate && matchSupplier && matchStatus;
    });
  }

  resetFilter(): void {
    this.initDefaultDates();
    this.supplierSearch = '';
    this.statusSearch = '';
    this.onSearch();
  }

  onNew(): void {
    this.router.navigate(['/transaksi/po/new']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/transaksi/po/edit', id]);
  }

  onPreview(id: number): void {
     Swal.fire('Preview Mode', 'Generasi Document PO dalam pengembangan.', 'info');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'NEW': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'APPROVED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'CANCELED': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'RECEIVED': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'PAID': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  }
}
