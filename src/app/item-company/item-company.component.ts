import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from './../company';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.css']
})
export class ItemCompanyComponent implements OnInit {
  @Input() company: Company;
  constructor(private companyService: CompaniesService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
  }

  onDelete() {
    this.companyService.deleteCompany(this.company);
    this.toastr.success(this.company.name + ' Deleted Successfully');
  }

  onEdit() {
    this.router.navigateByUrl('/company/edit/' + this.company.name);
  }
}
