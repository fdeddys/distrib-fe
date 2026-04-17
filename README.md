# Pharmacy Management System (Retail Edition)

Sistem Informasi Farmasi dan Toko Retail yang dibangun menggunakan **Angular 21** dengan desain modern berbasis **Tailwind CSS**. Sistem ini dirancang untuk menangani operasional apotek dan toko retail dengan fitur manajemen data yang sangat fleksibel.

## 🚀 Fitur Utama

- **Role-Based Access Control (RBAC)**: Pembatasan menu berdasarkan role (Admin, Pharmacist, Cashier, dll).
- **Generic Configuration Hub**: Kelola puluhan data master (UOM, Gender, Payment Type) hanya melalui satu pintu konfigurasi.
- **Master Data Retail**:
  - **Group Product**: Manajemen kategori utama barang.
  - **Product Retail**: Dilengkapi dengan SKU, Artikel, Dual UOM (Kecil/Besar) dengan sistem Ratio, serta Selling Price.
  - **Customer Management**: Dilengkapi dengan fitur **Credit Eligibility** untuk kontrol piutang pelanggan.
  - **Sales & Supplier**: Manajemen agen penjualan dan pemasok barang.
- **Modern UI/UX**: Dashboard intuitif, Sidebar dinamis, dan form yang bersih.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Angular 21
- **Styling**: Tailwind CSS 4.x
- **Icons**: Heroicons / Inline SVG
- **Notifications**: SweetAlert2
- **State**: RxJS for Service-based data.

## ⚙️ Cara Menjalankan Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run start
   ```
   Akses di `http://localhost:4200/`

3. **Build Production**:
   ```bash
   npm run build
   ```

## 📦 Deployment ke GitHub

Gunakan perintah berikut untuk melakukan push kode ke repository:

```bash
git init
git add .
git commit -m "Initial commit: Master Customer & Credit Eligibility"
git remote add origin https://github.com/fdeddys/distrib-fe.git
git branch -M main
git push -u origin main
```

---
Dikembangkan oleh **Antigravity AI Assistant** & **USER**.
