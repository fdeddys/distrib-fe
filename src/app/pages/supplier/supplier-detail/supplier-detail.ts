import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier, SupplierService } from '../supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.html',
  styleUrl: './supplier-detail.css',
  standalone: false
})
export class SupplierDetailComponent implements OnInit {
  currentSupplier: Supplier = { 
    id: 0, code: 'AUTO', nama: '', email: '', alamat: '', 
    contact: '', hp: '', active: true, top: 0, contactPerson: '' 
  };
  isEdit: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.supplierService.getSupplierById(+id).subscribe(s => {
        if (s) {
          this.currentSupplier = { ...s };
        } else {
          this.router.navigate(['/master/supplier']);
        }
      });
    }
  }

  onSave() {
    if (!this.currentSupplier.nama) {
      Swal.fire('Error', 'Nama Supplier wajib diisi!', 'error');
      return;
    }

    this.supplierService.saveSupplier(this.currentSupplier).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data supplier disimpan!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/master/supplier']);
      });
    });
  }

  onNew() {
    this.router.navigate(['/master/supplier/new']).then(() => {
      this.currentSupplier = { 
        id: 0, code: 'AUTO', nama: '', email: '', alamat: '', 
        contact: '', hp: '', active: true, top: 0, contactPerson: '' 
      };
      this.isEdit = false;
    });
  }

  onBack() {
    this.router.navigate(['/master/supplier']);
  }
}
