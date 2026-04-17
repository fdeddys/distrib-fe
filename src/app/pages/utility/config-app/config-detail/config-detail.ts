import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfigService, ConfigDetail } from '../config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './config-detail.html'
})
export class ConfigDetailComponent implements OnInit {
  type: string = '';
  typeName: string = '';
  
  items: ConfigDetail[] = [];
  currentItem: ConfigDetail = { id: 0, code: '', name: '', description: '' };
  isFormOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadHeaderAndData();
    });
  }

  loadHeaderAndData() {
    this.configService.getConfigHeaders().subscribe(headers => {
      const h = headers.find(x => x.id === this.type);
      if (h) {
        this.typeName = h.name;
        this.loadDetails();
      }
    });
  }

  loadDetails() {
    this.configService.getConfigDetails(this.type).subscribe(d => this.items = d);
  }

  onNew() {
    this.currentItem = { id: 0, code: '', name: '', description: '' };
    this.isFormOpen = true;
  }

  onEdit(item: ConfigDetail) {
    this.currentItem = { ...item };
    this.isFormOpen = true;
  }

  onDelete(id: number) {
    Swal.fire({ 
      title: 'Hapus data?', 
      text: 'Data ini akan dihapus permanen.',
      icon: 'warning', 
      showCancelButton: true,
      confirmButtonColor: '#ef4444'
    }).then(r => {
      if (r.isConfirmed) {
        this.configService.deleteConfigDetail(this.type, id).subscribe(() => {
          Swal.fire('Terhapus!', '', 'success');
          this.loadDetails();
        });
      }
    });
  }

  onSave() {
    if (!this.currentItem.code || !this.currentItem.name) {
      Swal.fire('Error', 'Code dan Nama wajib diisi!', 'error');
      return;
    }
    
    this.configService.saveConfigDetail(this.type, this.currentItem).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'Berhasil Disimpan', timer: 1000, showConfirmButton: false });
      this.isFormOpen = false;
      this.loadDetails();
    });
  }

  onBack() {
    this.router.navigate(['/utility/config-list']);
  }
}
