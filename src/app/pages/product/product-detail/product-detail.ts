import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { ProductGroupService, ProductGroup } from '../../master/product-group.service';
import { ConfigService, ConfigDetail } from '../../utility/config-app/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  standalone: false
})
export class ProductDetailComponent implements OnInit {
  currentProduct: Product = { 
    id: 0, code: '', name: '', sku: '', artikel: '', 
    status: 'Active', uomSmall: '', uomBig: '', 
    qtyRatio: 1, price: 0, category: '' 
  };
  
  isEdit: boolean = false;
  
  uomOptions: ConfigDetail[] = [];
  categoryOptions: ProductGroup[] = [];

  constructor(
    private productService: ProductService,
    private configService: ConfigService,
    private productGroupService: ProductGroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCombos();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.productService.getProductById(+id).subscribe(p => {
        if (p) {
          this.currentProduct = { ...p };
        } else {
          this.router.navigate(['/master/product']);
        }
      });
    }
  }

  loadCombos() {
    this.configService.getConfigDetails('uom').subscribe((d: ConfigDetail[]) => this.uomOptions = d);
    this.productGroupService.getGroups().subscribe((d: ProductGroup[]) => this.categoryOptions = d);
  }

  onSave() {
    if (!this.currentProduct.name || !this.currentProduct.code) {
      Swal.fire('Oops!', 'Code dan Nama produk wajib diisi.', 'error');
      return;
    }

    // Ensure price is numeric
    this.currentProduct.price = Number(this.currentProduct.price);

    this.productService.saveProduct(this.currentProduct).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data produk telah disimpan.',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/master/product']);
      });
    });
  }

  onBack() {
    this.router.navigate(['/master/product']);
  }
}
