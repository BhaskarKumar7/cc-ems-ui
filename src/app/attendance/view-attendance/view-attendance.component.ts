import { Component, Inject, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { ApiService } from 'src/app/services/api.service';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Month } from 'src/app/types/Month';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(private apiService: ApiService,@Inject(NOTYF) private notyf : Notyf) { }
  
  months: Month[] = [];
  selectedMonth: number = 0;
  enteredEmpId: number = 0;
  date: Date = new Date();

  ngOnInit(): void {
    this.months = this.months.concat(new Month(0,'--- SELECT NUMBER ---')).concat(new Month(1,'JANUARY'))
    .concat(new Month(2,'FEBRAURY')).concat(new Month(3,'MARCH')).concat(new Month(4,'APRIL'))
    .concat(new Month(5,'MAY')).concat(new Month(6,'JUNE')).concat(new Month(7,'JULY'))
    .concat(new Month(8,'AUGUST')).concat(new Month(9,'SEPTEMBER')).concat(new Month(10,'OCTOBER'))
    .concat(new Month(11,'NOVEMBER')).concat(new Month(12,'DECEMBER'));
  }

  populateAttendance(): void{
    console.log(this.enteredEmpId,this.selectedMonth);
    if(this.enteredEmpId === 0 || this.selectedMonth === 0) {
      this.notyf.error({
        message: 'Please make sure employee id and month are selected!'
      });
    }
    else {
      
    }
  }

}
