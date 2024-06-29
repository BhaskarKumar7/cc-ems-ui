import { Component, Inject, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { ApiService } from 'src/app/services/api.service';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Payroll } from 'src/app/types/Payroll';

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.css']
})
export class AddPayrollComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }
  empEmail: string = '';
  payroll: Payroll = new Payroll();
  payrollYear: number = 0;
  payrollMonth: number = 0;

  years: number[] = [];
  months: number[] = [];
  currentDate: Date = new Date();

  ngOnInit(): void {
    for(let month = 1 ; month <= 12 ; ++month)  {
      this.months.push(month);
    }
    for(let year = 2000 ; year <= this.currentDate.getFullYear() ; ++year)  {
      this.years.push(year);
    }
  }
  
  calculatePayroll()  {
    this.apiService.callCalculatePayrollApi(this.empEmail).subscribe({
      next: response => {
        console.log('payroll details---> ',response);
        this.payroll = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addPayroll()  {
    console.log('payroll year-----> ', this.payrollYear);
    console.log('payroll month----> ', this.payrollMonth);
    if(this.payrollYear > 0 && this.payrollMonth > 0) {
      this.payroll.payrollMonth = this.payrollMonth;
      this.payroll.payrollYear = this.payrollYear;
      this.apiService.callAddPayrollApi(this.payroll).subscribe({
        next: response => {
          console.log('add payroll response---> ' , response);
          this.notyf.success({
            message: response.message
          });
        },
        error: err => {
          console.log('error add payroll---> ', err);
          this.notyf.error({
            message: err.error.message
          });
        }
      });
    }
    else  {
      this.notyf.error({
        message: 'Please make sure payroll year and month are selected!'
      });
    }
  }
}
