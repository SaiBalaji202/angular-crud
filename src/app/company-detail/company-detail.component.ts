import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CompaniesService } from './../companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  companyForm: FormGroup;
  includeSubBranch = false;
  params;

  constructor(private companyService: CompaniesService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      mainBranch: new FormControl(null, Validators.required),
      subBranches: new FormControl(null, this.validateSubBranches.bind(this)),
    });

    this.route.params.subscribe(params => {
      this.params = params;
      console.log(this.params);
      if (this.params.operation === 'view' || this.params.operation === 'edit') {
        this.loadDetail(this.params.name);
        this.companyForm.get('companyName').disable();
      }
    });
  }

  loadDetail(name: string) {
    const company = this.companyService.findCompany(name);
    console.log(company);
    this.companyForm.setValue({
      companyName: company.name,
      mainBranch: company.mainBranch,
      subBranches: company.subBranches ? company.subBranches.join(', ') : null
    });
    if (company.subBranches) {
      this.includeSubBranch = true;
    }
  }

  toggleSubBranchInclude() {
    this.includeSubBranch = !this.includeSubBranch;
  }

  resetForm() {
    if (this.params.operation === 'add') {
      this.companyForm.reset();
    } else {
      this.companyForm.reset({
        companyName: this.companyForm.get('companyName').value,
        mainBranch: '',
        subBranches: ''
      });
    }
  }

  validateSubBranches(ctrl: FormControl): { [msg: string]: boolean } {
    if (
      (this.includeSubBranch && !ctrl.value) ||
      (this.includeSubBranch && ctrl.value.trim() === '')
    ) {
      return { emptySubBranch: true };
    }
    return null;
  }

  onSubmit() {
    const { companyName, mainBranch, subBranches } = this.companyForm.value;
    if (this.params.operation === 'add') {
      this.companyService.addCompany(companyName,
        mainBranch,
        (subBranches && this.includeSubBranch) ? subBranches.split(', ') : null);
      this.toastr.success(companyName + ' Added Successfully');
    } else {
      this.companyService.updateCompany(this.params.name,
        mainBranch,
        (subBranches && this.includeSubBranch) ? subBranches.split(', ') : null);
      this.toastr.success(this.params.name + ' Updated Successfully');
    }
    console.log('Submitted');
  }
}
