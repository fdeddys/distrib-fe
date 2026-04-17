import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing-module';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { MainLayout } from './main-layout/main-layout';

@NgModule({
  declarations: [
    Sidebar,
    Header,
    Footer,
    MainLayout
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [
    MainLayout
  ]
})
export class LayoutModule { }
