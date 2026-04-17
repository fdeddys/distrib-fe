import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  standalone: false
})
export class CustomerListComponent implements OnInit {
  list: Customer[] = [];

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.service.getCustomers().subscribe(d => this.list = d);
  }

  onNew() { this.router.navigate(['/master/customer/new']); }
  onEdit(id: number) { this.router.navigate(['/master/customer/edit', id]); }

  onDelete(id: number) {
    Swal.fire({ title: 'Hapus Customer?', icon: 'warning', showCancelButton: true }).then(r => {
      if (r.isConfirmed) {
        this.service.deleteCustomer(id).subscribe(() => {
          Swal.fire('Terhapus', '', 'success');
          this.service.getCustomers().subscribe(d => this.list = d);
        });
      }
    });
  }
}
