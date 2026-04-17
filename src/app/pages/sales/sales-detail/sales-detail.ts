import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sales, SalesService } from '../sales.service';
import { ConfigService, ConfigDetail } from '../../utility/config-app/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.html',
  styleUrl: './sales-detail.css',
  standalone: false
})
export class SalesDetailComponent implements OnInit {
  current: Sales = { id: 0, code: 'AUTO', name: '', phone: '', email: '', gender: '', active: true };
  isEdit = false;
  
  genderOptions: ConfigDetail[] = [];

  constructor(
    private service: SalesService, 
    private configService: ConfigService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configService.getConfigDetails('gender').subscribe((d: ConfigDetail[]) => this.genderOptions = d);
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getSalesById(+id).subscribe((s: any) => s && (this.current = { ...s }));
    }
  }

  onSave() {
    if (!this.current.name) {
      Swal.fire('Error', 'Nama wajib diisi', 'error');
      return;
    }
    this.service.saveSales(this.current).subscribe(() => {
      Swal.fire({ icon: 'success', title: 'Berhasil', timer: 1000, showConfirmButton: false });
      this.router.navigate(['/master/sales']);
    });
  }

  onBack() { this.router.navigate(['/master/sales']); }
}
