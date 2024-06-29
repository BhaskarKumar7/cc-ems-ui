import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddPayrollComponent } from './payroll/add-payroll/add-payroll.component';
import { ViewPayrollComponent } from './payroll/view-payroll/view-payroll.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'user/login', component: LoginComponent
  },
  {
    path : 'user/dashboard', component : DashboardComponent
  },
  {
    path : 'user/add-employee', component : AddEmployeeComponent
  },
  {
    path: 'user/edit-employee', component: EditEmployeeComponent
  },
  {
    path: 'user/delete-employee', component: DeleteEmployeeComponent
  },
  {
    path: 'user/list-employees', component: ListEmployeeComponent
  },
  {
    path: 'user/add-payroll', component: AddPayrollComponent
  },
  {
    path: 'user/view-payroll',component: ViewPayrollComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
