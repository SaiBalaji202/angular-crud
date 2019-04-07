import { Injectable } from '@angular/core';
import { Company } from './company';
import { Subject } from 'rxjs';

@Injectable()
export class CompaniesService {
  companies = [
    new Company('Infy', 'Mysuru', ['MCity', 'SolingaNallur']),
    new Company('CTS', 'Chennai', ['Madurai', 'Chennai']),
  ];

  companiesAltered = new Subject<void>();

  constructor() {}

  getCompanies() : Company[] {
    return [...this.companies];
  }

  deleteCompany(companyToDelete: Company) {
    this.companies = this.companies.filter(company => company.name !== companyToDelete.name);
    console.log(this.companies.length);
    this.companiesAltered.next();
  }

  addCompany(name: string, mainBranch: string, subBranches: string[]) {
    const companyToAdd = new Company(name, mainBranch, subBranches);
    this.companies.push(companyToAdd);
    console.log(this.companies);
    this.companiesAltered.next();
  }

  findCompany(name: string): Company {
    for (let index = 0; index < this.companies.length; index++) {
      const company = this.companies[index];
      if (company.name === name) {
        return new Company(company.name, company.mainBranch, company.subBranches);
      }
    }
    return null;
  }

  updateCompany(companyToUpdate: string, updatedMainBranch: string, updatedSubBranches: string[]) {
    console.log(companyToUpdate);
    for (let index = 0; index < this.companies.length; index++) {
      const company = this.companies[index];

      if (company.name === companyToUpdate) {
        company.mainBranch = updatedMainBranch;
        company.subBranches = updatedSubBranches;
        console.log(this.companies);
        this.companiesAltered.next();
        return;
      }
    }
  }
}
