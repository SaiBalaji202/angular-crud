import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

const routes = [
  { path: '', component: ListCompaniesComponent },
  {
    path: 'company',
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      {
        path: ':operation',
        children: [
          {
            path: '',
            component: CompanyDetailComponent,
            pathMatch: 'full',
          },
          {
            path: ':name',
            component: CompanyDetailComponent,
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
