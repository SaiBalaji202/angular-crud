import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from './../company';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {

  companies: Company[];
  companySubscription: Subscription;

  constructor(private companyService: CompaniesService) {
    this.companies = this.companyService.getCompanies();
   }

  ngOnInit() {
    this.companySubscription = this.companyService.companiesAltered.subscribe(() => {
      this.companies = this.companyService.getCompanies();
    });
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }

}
