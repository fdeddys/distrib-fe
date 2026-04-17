import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  filterName: string = '';
  filterStatus: string = '';

  pageSize: number = 5;
  currentPage: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(p => {
      const matchName = p.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchStatus = this.filterStatus ? p.status === this.filterStatus : true;
      return matchName && matchStatus;
    });
    this.currentPage = 1;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  onNew() {
    this.router.navigate(['/master/product/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/master/product/edit', id]);
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0ea5e9',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire(
            'Terhapus!',
            'Data produk telah berhasil dihapus.',
            'success'
          );
          this.loadData();
        });
      }
    });
  }

  onPrint() {
    window.print();
  }
}
