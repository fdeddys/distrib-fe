import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoHeader, PoService, PoDetail } from '../po.service';
import { SupplierService, Supplier } from '../../supplier/supplier.service';
import { WarehouseService, Warehouse } from '../../master/warehouse.service';
import { ProductService, Product } from '../../product/product.service';
import Swal from 'sweetalert2';

// Extend interface for UI state
interface PoDetailUi extends PoDetail {
  isSaved?: boolean;
}

@Component({
  selector: 'app-po-detail',
  templateUrl: './po-detail.html',
  standalone: false
})
export class PoDetailComponent implements OnInit {
  header: PoHeader = this.getDefaultHeader();
  detailsUi: PoDetailUi[] = [];
  isEdit = false;

  // Master Data
  suppliers: Supplier[] = [];
  warehouses: Warehouse[] = [];
  products: Product[] = [];

  // Date Range Config
  minDate: string = '';
  maxDate: string = '';
  poDateStr: string = '';

  // Toast Config
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  constructor(
    private service: PoService,
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMasterData();
    this.initDateConfig();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getPoById(+id).subscribe((d: any) => {
        if (d) {
          this.header = JSON.parse(JSON.stringify(d));
          this.detailsUi = (this.header.details as PoDetailUi[]).map(x => ({ ...x, isSaved: true }));
          this.poDateStr = this.formatDate(new Date(this.header.poCreated));
        }
      });
    } else {
      this.addRow();
    }
  }

  initDateConfig() {
    const now = new Date();
    this.poDateStr = this.formatDate(now);
    const min = new Date(); min.setMonth(min.getMonth() - 1);
    this.minDate = this.formatDate(min);
    const max = new Date(); max.setMonth(max.getMonth() + 1);
    this.maxDate = this.formatDate(max);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateChange() {
    this.header.poCreated = new Date(this.poDateStr);
  }

  getDefaultHeader(): PoHeader {
    return {
      id: 0, poNumber: 'AUTO', supplierId: 0, supplierName: '',
      warehouseId: 0, warehouseName: '', type: 'CASH', status: 'NEW',
      isTax: true, notes: '', poCreated: new Date(), userCreated: 'Admin', userUpdated: 'Admin',
      subTotal: 0, discHeader: 0, tax: 0, grandTotal: 0,
      details: []
    };
  }

  loadMasterData() {
    this.supplierService.getSuppliers().subscribe((d: Supplier[]) => this.suppliers = d);
    this.warehouseService.getWarehouses().subscribe((d: Warehouse[]) => this.warehouses = d.filter(w => w.warehouse_in));
    this.productService.getProducts().subscribe((d: Product[]) => this.products = d);
  }

  onNew() {
    this.header = this.getDefaultHeader();
    this.detailsUi = [];
    this.initDateConfig();
    this.isEdit = false;
    this.addRow();
    this.Toast.fire({ icon: 'info', title: 'Form dikosongkan (New PO)', background: '#EEF2FF' });
  }

  addRow() {
    this.detailsUi.push({
      id: Date.now(), productId: 0, productName: '',
      qty: 0, uomSmall: '', uomBig: '', qtyRatio: 1,
      price: 0, discAmount: 0, total: 0, isSaved: false
    });
  }

  onSaveRow(item: PoDetailUi) {
    if (item.productId === 0 || item.qty === 0) {
      Swal.fire('Error', 'Pilih produk dan qty dulu', 'error');
      return;
    }
    item.isSaved = true;
    this.calculateTotals();
    this.Toast.fire({ icon: 'success', title: `Item ${item.productName} tersimpan`, background: '#ECFDF5' });
  }

  onEditRow(item: PoDetailUi) {
    if (this.header.status !== 'NEW') {
       Swal.fire('Halted', 'PO yang sudah Approved/Canceled tidak bisa diedit barisnya.', 'warning');
       return;
    }
    item.isSaved = false;
  }

  removeRow(index: number) {
    if (this.header.status !== 'NEW') {
        Swal.fire('Halted', 'PO yang sudah Approved/Canceled tidak bisa dihapus.', 'warning');
        return;
    }
    
    const item = this.detailsUi[index];
    const nama = item.productName || 'Item ini';

    Swal.fire({
      title: 'Hapus Item?',
      text: `Apakah ${nama} akan dihapus dari daftar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EF4444'
    }).then(r => {
      if (r.isConfirmed) {
        this.detailsUi.splice(index, 1);
        if (this.detailsUi.length === 0) this.addRow();
        this.calculateTotals();
        this.Toast.fire({ icon: 'success', title: 'Item berhasil dihapus', background: '#F8FAFC' });
      }
    });
  }

  onProductChange(item: PoDetailUi) {
    const p = this.products.find(x => x.id === +item.productId);
    if (p) {
      item.productName = p.name;
      item.price = p.price;
      item.uomSmall = p.uomSmall;
      item.uomBig = p.uomBig;
      item.qtyRatio = p.qtyRatio;
      this.calculateRow(item);
    }
  }

  calculateRow(item: PoDetailUi) {
    item.total = (item.price - item.discAmount) * item.qty;
  }

  calculateTotals() {
    const savedRows = this.detailsUi.filter(x => x.isSaved);
    this.header.subTotal = savedRows.reduce((sum, item) => sum + item.total, 0);
    this.header.tax = this.header.isTax ? (this.header.subTotal - this.header.discHeader) * 0.11 : 0;
    this.header.grandTotal = (this.header.subTotal - this.header.discHeader) + this.header.tax;
  }

  getQtyLabel(item: PoDetailUi): string {
    if (!item.qty || item.qtyRatio <= 1) return '';
    const big = Math.floor(item.qty / item.qtyRatio);
    const small = item.qty % item.qtyRatio;
    let label = '';
    if (big > 0) label += `${big} ${item.uomBig} `;
    if (small > 0) label += `${small} ${item.uomSmall}`;
    return label ? `(${label.trim()})` : '';
  }

  onSave() {
    if (this.header.status !== 'NEW') {
       Swal.fire('Halted', 'PO yang sudah Approved/Canceled tidak bisa diupdate.', 'warning');
       return;
    }

    if (this.header.supplierId === 0) {
       Swal.fire('Error', 'Pilih Supplier dulu', 'error');
       return;
    }

    if (this.detailsUi.some(x => !x.isSaved && x.productId !== 0)) {
       Swal.fire('Warning', 'Ada baris item yang belum di-SAVE (klik icon disket di baris tersebut)', 'warning');
       return;
    }

    this.onDateChange();
    this.header.details = this.detailsUi.filter(x => x.isSaved);

    const s = this.suppliers.find(x => x.id === +this.header.supplierId);
    if (s) this.header.supplierName = s.nama;

    const w = this.warehouses.find(x => x.id === +this.header.warehouseId);
    if (w) this.header.warehouseName = w.name;

    this.service.savePo(this.header).subscribe((savedHeader) => {
      this.header = JSON.parse(JSON.stringify(savedHeader));
      this.isEdit = true;
      this.Toast.fire({ icon: 'warning', title: 'Purchase Order tersimpan sebagai Draft', background: '#FFFBEB' });
    });
  }

  onApprove() {
    if (this.header.status === 'CANCELED') {
       Swal.fire({ title: 'Aksi Ditolak!', text: 'PO yang sudah CANCELED tidak bisa di-Approve.', icon: 'error' });
       return;
    }
    if (this.header.status === 'APPROVED') {
       Swal.fire({ title: 'Aksi Ditolak!', text: 'PO ini sudah berstatus APPROVED.', icon: 'info' });
       return;
    }

    const savedItems = this.detailsUi.filter(x => x.isSaved && x.productId !== 0);
    if (savedItems.length === 0) {
       Swal.fire({ title: 'Item Kosong!', text: 'Gagal Approve. Belum ada item yang diisi atau di-Save di grid.', icon: 'warning' });
       return;
    }

    if (this.header.id === 0) {
       Swal.fire({ title: 'Simpan Dulu!', text: 'Silakan klik Save Draft sebelum melakukan Approval.', icon: 'warning' });
       return;
    }

    this.service.approvePo(this.header.id).subscribe(() => {
      this.header.status = 'APPROVED';
      this.Toast.fire({ icon: 'success', title: 'Purchase Order APPROVED!', background: '#ECFDF5' });
    });
  }

  onCancel() {
    if (this.header.status === 'APPROVED') {
        Swal.fire({ title: 'Aksi Ditolak!', text: 'PO yang sudah APPROVED tidak bisa di-Cancel.', icon: 'error' });
        return;
    }
    if (this.header.status === 'CANCELED') {
        Swal.fire({ title: 'Aksi Ditolak!', text: 'PO ini sudah berstatus CANCELED.', icon: 'info' });
        return;
    }

    if (this.header.id === 0) {
       this.onBack();
       return;
    }

    Swal.fire({
      title: 'Cancel PO?',
      text: 'Anda yakin ingin membatalkan Purchase Order ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Cancel!',
      confirmButtonColor: '#E11D48'
    }).then(r => {
      if (r.isConfirmed) {
        this.service.cancelPo(this.header.id).subscribe(() => {
          this.Toast.fire({ icon: 'error', title: 'Purchase Order CANCELED', background: '#FEF2F2' });
          this.onBack(); // Redirect to grid as requested
        });
      }
    });
  }

  onPreview() {
    Swal.fire('Preview Mode', 'Generasi Document PO dalam pengembangan.', 'info');
  }

  onBack() { this.router.navigate(['/transaksi/po']); }
}
