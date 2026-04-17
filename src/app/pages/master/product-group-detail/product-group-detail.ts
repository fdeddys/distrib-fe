import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroup, ProductGroupService } from '../product-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.html',
  standalone: false
})
export class ProductGroupDetailComponent implements OnInit {
  current: ProductGroup = { id: 0, code: '', name: '', description: '' };
  isEdit = false;

  constructor(
    private service: ProductGroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getGroupById(+id).subscribe((d: any) => d && (this.current = { ...d }));
    }
  }

  onSave() {
    if (!this.current.code || !this.current.name) {
      Swal.fire('Error', 'Code dan Nama wajib diisi', 'error');
      return;
    }
    this.service.saveGroup(this.current).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'Saved', timer: 1000, showConfirmButton: false });
      this.router.navigate(['/master/group']);
    });
  }

  onBack() {
    this.router.navigate(['/master/group']);
  }
}
