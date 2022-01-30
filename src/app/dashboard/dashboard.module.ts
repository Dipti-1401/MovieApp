import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxShimmeringLoaderModule } from 'ngx-shimmering-loader';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxShimmerLoadingModule,
    NgxSpinnerModule,
    NgxShimmeringLoaderModule
  ]
})
export class DashboardModule { }
