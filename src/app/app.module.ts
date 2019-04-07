import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { ItemCompanyComponent } from './item-company/item-company.component';
import { NavComponent } from './nav/nav.component';
import { CompaniesService } from './companies.service';
@NgModule({
  declarations: [
    AppComponent,
    ListCompaniesComponent,
    CompanyDetailComponent,
    ItemCompanyComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [CompaniesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
