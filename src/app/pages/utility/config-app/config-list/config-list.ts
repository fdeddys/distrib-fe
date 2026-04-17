import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfigService, ConfigHeader } from '../config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './config-list.html'
})
export class ConfigListComponent implements OnInit {
  list: ConfigHeader[] = [];
  filtered: ConfigHeader[] = [];
  search = '';

  constructor(private service: ConfigService, private router: Router) {}

  ngOnInit(): void {
    this.service.getConfigHeaders().subscribe(d => {
      this.list = d;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filtered = this.list.filter(c => 
      c.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  onSelect(type: string) {
    this.router.navigate(['/utility/config-list', type]);
  }
}
