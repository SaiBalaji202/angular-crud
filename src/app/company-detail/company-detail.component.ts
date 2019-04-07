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
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      mainBranch: new FormControl(null, Validators.required),
      subBranches: new FormControl(null, this.validateSubBranches.bind(this)),
    });

    this.route.params.subscribe(params => {
      this.params = params;
      if (this.params.operation === 'view' || this.params.operation === 'edit') {
        this.loadDetail(this.params.name);
        this.companyForm.get('companyName').disable();
      }
    });
  }

  loadDetail(name: string) {
    const company = this.companyService.findCompany(name);
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
    this.companyForm.get('subBranches').updateValueAndValidity();
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
    let msgToDisplay = '';
    if (this.params.operation === 'add') {
      if(this.companyService.addCompany(companyName,
        mainBranch,
        (subBranches && this.includeSubBranch) ? subBranches.split(', ') : null))
          msgToDisplay = `${companyName.toUpperCase()} Added Successfully`;
      else {
        msgToDisplay = `${companyName.toUpperCase()} Already Exists.  Try Updating its details`;
        this.toastr.warning(msgToDisplay);
        this.router.navigateByUrl(`/company/edit/${companyName}`);
        return;
      }
    } else {
      this.companyService.updateCompany(this.params.name,
        mainBranch,
        (subBranches && this.includeSubBranch) ? subBranches.split(', ') : null);
      msgToDisplay = `${this.params.name.toUpperCase()} Updated Successfully`;
    }
    this.toastr.success(msgToDisplay);
    this.router.navigateByUrl('/');
  }
}
