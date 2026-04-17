import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: false
})
export class Dashboard implements OnInit {
  
  // 1. Line Chart: Sales Trend
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 120, 140],
        label: 'Penjualan (Juta)',
        fill: true,
        tension: 0.4,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        pointBackgroundColor: '#0ea5e9'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  // 2. Bar Chart: Top 5 Products
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Paracetamol', 'Amoxicillin', 'Promag', 'Panadol', 'Insto'],
    datasets: [
      {
        data: [45, 37, 60, 33, 25],
        label: 'Unit Terjual',
        backgroundColor: '#10b981',
        borderRadius: 8
      }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  // 3. Doughnut Chart: Categories
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Obat Bebas', 'Obat Keras', 'Vitamin', 'Alkes'],
    datasets: [
      {
        data: [350, 450, 100, 150],
        backgroundColor: ['#0ea5e9', '#f43f5e', '#f59e0b', '#10b981'],
        hoverOffset: 4
      }
    ]
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%'
  };

  // 4. Polar Area Chart: Stock Status
  public polarChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: ['Aman', 'Stok Menipis', 'Kadaluwarsa', 'Kosong'],
    datasets: [
      {
        data: [80, 15, 5, 2],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(100, 116, 139, 0.7)'
        ]
      }
    ]
  };
  public polarChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit(): void { }
}
