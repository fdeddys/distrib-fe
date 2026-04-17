import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService } from '../customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.html',
  standalone: false
})
export class CustomerDetailComponent implements OnInit {
  current: Customer = { id: 0, code: 'AUTO', name: '', address: '', phone: '', email: '', isCredit: false, active: true };
  isEdit = false;

  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getCustomerById(+id).subscribe((d: any) => d && (this.current = { ...d }));
    }
  }

  onSave() {
    if (!this.current.name) {
      Swal.fire('Error', 'Nama wajib diisi', 'error');
      return;
    }
    this.service.saveCustomer(this.current).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'Berhasil', timer: 1000, showConfirmButton: false });
      this.router.navigate(['/master/customer']);
    });
  }

  onBack() { this.router.navigate(['/master/customer']); }
}
