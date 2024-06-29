import { Component, Inject, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { ApiService } from 'src/app/services/api.service';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Payroll } from 'src/app/types/Payroll';

@Component({
  selector: 'app-view-payroll',
  templateUrl: './view-payroll.component.html',
  styleUrls: ['./view-payroll.component.css']
})
export class ViewPayrollComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }
  empId: number = 0;
  payrollYear: number = 0;
  years: number[] = [];
  currentDate: Date = new Date();
  payrollList: Payroll[] = [];

  ngOnInit(): void {
    for(let year = 2000 ; year <= this.currentDate.getFullYear() ; ++year)  {
      this.years.push(year);
    }
  }

  fetchEmployeePayroll()  {
    console.log('employee id---> ',this.empId);
    console.log('payroll year---> ',this.payrollYear);
    if(this.empId > 0  && this.payrollYear > 0) {
      this.apiService.callViewPayrollApi(this.empId,this.payrollYear).subscribe({
        next: response => {
          if(response.length > 0) {
            this.payrollList = response;
          }
        },
        error: err => {
          this.notyf.error({
            message: err.error.message
          });
        }
      });
    }
  }

}
