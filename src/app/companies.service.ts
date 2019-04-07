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
    this.companiesAltered.next();
  }

  addCompany(name: string, mainBranch: string, subBranches: string[]) {
    if (!this.findCompany(name)) {
      const companyToAdd = new Company(name, mainBranch, subBranches);
      this.companies.push(companyToAdd);
      this.companiesAltered.next();
      return true;
    }
    return false;
  }

  findCompany(name: string): Company {
    for (let index = 0; index < this.companies.length; index++) {
      const company = this.companies[index];
      if (company.name.trim().toLowerCase() === name.trim().toLowerCase()) {
        return new Company(company.name, company.mainBranch, company.subBranches);
      }
    }
    return null;
  }

  updateCompany(companyToUpdate: string, updatedMainBranch: string, updatedSubBranches: string[]) {
    for (let index = 0; index < this.companies.length; index++) {
      const company = this.companies[index];

      if (company.name === companyToUpdate) {
        company.mainBranch = updatedMainBranch;
        company.subBranches = updatedSubBranches;
        this.companiesAltered.next();
        return;
      }
    }
  }
}
