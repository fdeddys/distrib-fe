import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductGroup, ProductGroupService } from '../product-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-group-list',
  templateUrl: './product-group-list.html',
  standalone: false
})
export class ProductGroupListComponent implements OnInit {
  list: ProductGroup[] = [];
  search = '';

  constructor(private service: ProductGroupService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getGroups().subscribe(d => this.list = d);
  }

  onNew() {
    this.router.navigate(['/master/group/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/master/group/edit', id]);
  }

  onDelete(id: number) {
    Swal.fire({ title: 'Hapus Group?', icon: 'warning', showCancelButton: true }).then(r => {
      if (r.isConfirmed) {
        this.service.deleteGroup(id).subscribe(() => {
          Swal.fire('Terhapus', '', 'success');
          this.load();
        });
      }
    });
  }
}
