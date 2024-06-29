import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddPayrollComponent } from './payroll/add-payroll/add-payroll.component';
import { ViewPayrollComponent } from './payroll/view-payroll/view-payroll.component';
import { AddAttendanceComponent } from './attendance/add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from './attendance/view-attendance/view-attendance.component';
import { NOTYF, notyfFactory } from './shared/utils/notyf.token';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent,
    ListEmployeeComponent,
    AddPayrollComponent,
    ViewPayrollComponent,
    AddAttendanceComponent,
    ViewAttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
